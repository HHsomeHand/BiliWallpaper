<script setup>
import { onActivated, ref } from 'vue'
import { useMainStore } from '@/store/main.mjs';
import { storeToRefs } from 'pinia';
import Compressor from 'compressorjs';
import { useConfig } from '@/Hooks/useConfig.mjs';

const mainStore = useMainStore();
const {extendWallpaperBase64Obj} = storeToRefs(mainStore);

const wallpaperName = ref(generateUniqueDefaultName());

const isCompressor = useConfig('isCompressor', false);

const rate = useConfig('compressorRate', 0.8);


function storeFile(rawFile) {
  const reader = new FileReader();
  reader.readAsDataURL(rawFile);
  reader.onloadend = () => {
    mainStore.appendWallpaper(wallpaperName.value, reader.result);

    mainStore.applyWallpaper(wallpaperName.value);

    wallpaperName.value = generateUniqueDefaultName();
  }
}

function storeFileCompressor(rawFile) {
  new Compressor(rawFile, {
      quality: rate.value, // 压缩质量，0.8 代表 80% 的质量
      success(compressedFile) {
        storeFile(compressedFile);
      }
    });
}

function onBeforeUpload(rawFile) {

  // // 将文件（file）转换成base64字符串
  if (isCompressor.value) {
    storeFileCompressor(rawFile);
  } else {
    storeFile(rawFile);
  }
    
  return false;
}

function generateUniqueDefaultName() {
  const defaultWallpaperName = "默认壁纸名";
  let counter = 0;

  while ((defaultWallpaperName + counter) in extendWallpaperBase64Obj.value) {
    counter++;
  }

  return (defaultWallpaperName + counter);
}

</script>

<template>
  <div class="upload-item">
    <div class="cell">
      <span class="label"> 壁纸名: </span>
      <el-input v-model="wallpaperName" class="input" placeholder="请给壁纸取个名字" />
      
    </div>
    <div class="cell">
      <el-checkbox class="checkbox" v-model="isCompressor" label="是否压缩"/>
        <div class="right">
          <el-tooltip
          class="box-item"
          effect="light"
          content="压缩比越接近1, 越是无损压缩, 但存储时, 图片体积会更大"
          placement="bottom"
        >
          <span class="label"> 压缩比: </span>
        </el-tooltip>
        
        <el-input-number v-model="rate" :min="0.5" :max="1" :step="0.1"/>
      </div>
    </div>
      <el-upload multiple drag :before-upload="onBeforeUpload" >
        <el-icon class="el-icon--upload"><i-ep-upload-filled /></el-icon>
        <div class="el-upload__text">
          将图片拖入框内, 或者<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            正常不需要压缩图片, 支持点击上传多张图片
          </div>
        </template>
      </el-upload>
  </div>
</template>

<style lang="less" scoped>
.upload-item {
  .cell {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;


    .right {
      display: flex;
      align-items: center;
    }
  }

  .label {
      margin-right: 10px;
  }

  .input {
    flex: 1;
  }
}
</style>