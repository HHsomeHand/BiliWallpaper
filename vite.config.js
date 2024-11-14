import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import monkey from 'vite-plugin-monkey'
import { cdn } from 'vite-plugin-monkey'
import fs from 'fs';


const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
    extensions: ['.js', '.ts', '.mjs', '.json', '.jsx', '.tsx'], 
  },
  plugins: [
    Vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],

      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
      ],
    }),

    Components({
      resolvers: [
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
      ],

    }),

    {
      name: 'generate-base64-constants',
      // 使用 build.end 钩子，这样会确保它在打包时触发
      buildEnd() {
        const imgDir = path.resolve(__dirname, 'src/assets/img');
        const images = fs.readdirSync(imgDir);
        const base64Images = images.reduce((acc, image) => {
          const imgPath = path.join(imgDir, image);
          const imgData = fs.readFileSync(imgPath);
          // 获取扩展名, 并去掉.
          const base64 = `data:image/${path.extname(image).slice(1)};base64,${imgData.toString('base64')}`;
          const filename = path.parse(image).name  
          acc[filename] = base64;
          return acc;
        }, {});

        const comment = '// 此文件由vite自动读取 @/assets/img 生成, 请不要人为修改 \n'

        // 生成常量文件并写入
        const constants = comment + `export const wallpaperBase64 = ${JSON.stringify(base64Images, null, 2)};`;

        const outputDir = path.resolve(__dirname, 'src/constants');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true }); // 确保目录存在
        }

        // 写入到常量文件
        fs.writeFileSync(path.resolve(outputDir, 'wallpaperBase64.mjs'), constants);
      }
    },

    Icons({
      autoInstall: true,
    }),

    

    monkey({
      entry: 'src/main.js',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.bilibili.com/*'],
        exclude: ['https://www.bilibili.com/*/*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})