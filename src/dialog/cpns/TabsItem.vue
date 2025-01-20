<script setup>
import { ref, watch, onMounted } from 'vue'
import UploadPane from './panes/pane00_UploadPane/UploadPane.vue'
import WallpaperConfig from './panes/pane01_WallpaperConfig/WallpaperConfig.vue';
import BiliConfig from './panes/pane02_BiliConfig/BiliConfig.vue';
import ContactSupport from "./panes/pane03_ContactSupport/ContactSupport.vue";
import { useConfig } from '@/Hooks/useConfig.mjs';
import { useMainStore } from '@/store/main.mjs';
import { storeToRefs } from 'pinia';
import PaneItem from "@/dialog/cpns/panes/PaneItem.vue";

const mainStore = useMainStore();

const {tabsCurrSel} = storeToRefs(mainStore);

const panes = [
  {
    label: '上传壁纸',
    component: UploadPane,
    name: '0',
  },
  {
    label: '管理壁纸',
    component: WallpaperConfig,
    name: '1',
  },
  {
    label: '屏蔽设置',
    component: BiliConfig,
    name: '2',
  },
  {
    label: '联系作者',
    component: ContactSupport,
    name: '3',
  }

]
</script>

<template>
<div class="tabs-item">
  <el-tabs v-model="tabsCurrSel">
    <template v-for="pane in panes">
      <PaneItem
          :label="pane.label"
          :name="pane.name"
      >
        <component :is="pane.component" />
      </PaneItem>
    </template>
  </el-tabs>
</div>
</template>

<style scoped>
.tabs-item {
  /* margin-left: calc(var(--el-dialog-padding-primary) * -1); */
  /* 往上移 */
  margin-top: calc(var(--el-dialog-padding-primary) * -2 + 8px) ;

  
}

:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
</style>