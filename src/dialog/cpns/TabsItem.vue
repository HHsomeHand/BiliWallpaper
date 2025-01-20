<script setup>
import { ref, watch, onMounted } from 'vue'
import UploadPane from './panes/pane00_UploadPane/UploadPane.vue'
import WallpaperConfig from './panes/pane01_WallpaperConfig/WallpaperConfig.vue';
import BiliConfig from './panes/pane02_BiliConfig/BiliConfig.vue';
import ContactSupport from "./panes/pane03_ContactSupport/ContactSupport.vue";
import { useConfig } from '@/Hooks/useConfig.mjs';
import { useMainStore } from '@/store/main.mjs';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();

const {tabsCurrSel} = storeToRefs(mainStore);

const uploadPaneRef = ref();
onMounted(() => {
  // 必须设置行内高度, 不然transition会弹跳
  uploadPaneRef.value.$el.style.height = '300px';
});

const {isShowContact} = storeToRefs(mainStore);

function onMouseDown(event) {
  event.stopPropagation();
}
</script>

<template>
<div class="tabs-item">
  <el-tabs @mousedown="onMouseDown" v-model="tabsCurrSel">
    <el-collapse-transition>
      <el-tab-pane ref="uploadPaneRef"  label="上传壁纸" name="0">
        <upload-pane />
      </el-tab-pane>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-tab-pane label="管理壁纸" name="1">
        <wallpaper-config />
      </el-tab-pane>
    </el-collapse-transition>
    <el-collapse-transition>
      <el-tab-pane label="屏蔽设置" name="2">
        <bili-config />
      </el-tab-pane>
    </el-collapse-transition>
    <template v-if="isShowContact">
      <el-collapse-transition>
        <el-tab-pane label="联系作者" name="3">
          <contact-support />
        </el-tab-pane>
      </el-collapse-transition>
    </template>

  </el-tabs>
</div>
</template>

<style scoped>
.tabs-item {
  /* margin-left: calc(var(--el-dialog-padding-primary) * -1); */
  /* 往上移 */
  margin-top: calc(var(--el-dialog-padding-primary) * -2 + 8px) ;
  cursor: default;
  
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
</style>