<script setup>
import { ref } from 'vue'
import { useMainStore } from '@/store/main.mjs';
import { storeToRefs } from 'pinia';
import { wallpaperBase64 as defaultWallpaperBase64Obj} from '@/constants/wallpaperBase64.mjs'
import CollapseItem from './cpns/CollapseItem.vue';
import { useConfig } from '@/Hooks/useConfig.mjs';




const mainStore = useMainStore();

const {extendWallpaperBase64Obj, collapseCurrSel} = storeToRefs(mainStore);

</script>

<template>
  <div class="wallpaper-config">
    <el-collapse v-model="collapseCurrSel" accordion>
      <collapse-item name="1" title="默认壁纸" :imgObj="defaultWallpaperBase64Obj"/>
      <collapse-item name="2" title="自定义壁纸" :imgObj="extendWallpaperBase64Obj" :deletable="true"/>
    </el-collapse>
    
    
  </div>
</template>

<style scoped>
</style>