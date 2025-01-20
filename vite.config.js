import path from 'path'
import {defineConfig, loadEnv} from 'vite'
import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import monkey from 'vite-plugin-monkey'
import { cdn } from 'vite-plugin-monkey'
import fs from 'fs';
import Markdown from 'unplugin-vue-markdown/vite'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
    extensions: ['.js', '.ts', '.mjs', '.json', '.jsx', '.tsx'], 
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <-- allows Vue to compile Markdown files
    }),

    Markdown(),

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
      buildEnd() {
        const imgDir = path.resolve(__dirname, 'src/assets/img');
        const images = fs.readdirSync(imgDir);

        // 判断是否是 最小化构建
        const env = loadEnv("mode", process.cwd());
        const isSmallBuild = env.VITE_SMALL_BUILD === 'true';
        const targetImage = '蓝山.jpg'; // 最小打包时, 打包的图片

        const filteredImages = isSmallBuild
            ? images.filter(image => image === targetImage)
            : images;

        const base64Images = filteredImages.reduce((acc, image) => {
          const imgPath = path.join(imgDir, image);
          const imgData = fs.readFileSync(imgPath);
          const base64 = `data:image/${path.extname(image).slice(1)};base64,${imgData.toString('base64')}`;
          const filename = path.parse(image).name;
          acc[filename] = base64;
          return acc;
        }, {});

        const comment = '// 此文件由vite自动读取 @/assets/img 生成, 请不要人为修改 \n';

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
        author: 'QQ2402398917',
        version: '2.1.1',
        icon: 'https://i0.hdslb.com/bfs/static/jinkela/long/images/favicon.ico',
        namespace: 'npm/vite-plugin-monkey',
        match: ['https://www.bilibili.com/*'],
        exclude: ['https://www.bilibili.com/*/*', 'https://www.bilibili.com/history*'],
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
})