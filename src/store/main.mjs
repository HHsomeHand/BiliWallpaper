import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useConfig } from "@/hooks/useConfig.mjs";
import { wallpaperBase64 as defaultWallpaperBase64Obj} from '@/constants/wallpaperBase64.mjs'

// 管理脚本状态的
export const useMainStore = defineStore('main', () => {
  const extendWallpaperBase64Obj = useConfig('extendWallpaperBase64Obj', {});

  

  const wallpaperBase64Obj = computed(() => ({
    ...defaultWallpaperBase64Obj,
    ...extendWallpaperBase64Obj.value
  }));

  // extendWallpaperBase64Obj.value = {};

  const currWallpaperName = useConfig("currWallpaperName", "蓝山");

  function deleteWallpaper(name) {
    if (currWallpaperName.value == name) {
      currWallpaperName.value = "蓝山";
    }
  
    delete extendWallpaperBase64Obj.value[name];
  }

  function renameWallpaper(oldName, newName) {

    let wallpaperBase64 = extendWallpaperBase64Obj.value[oldName];

    extendWallpaperBase64Obj.value[newName] = wallpaperBase64;

    if (currWallpaperName.value == oldName) {
      currWallpaperName.value = newName;
    }

    delete extendWallpaperBase64Obj.value[oldName];
  }

  function applyWallpaper(name) {
    if (!(name in wallpaperBase64Obj.value)) {
      return false;
    }
    currWallpaperName.value = name;
    return true;
  }

  function appendWallpaper(name, base64) {
    extendWallpaperBase64Obj.value[name] = base64;
  }

  function emptyWallpaper() {
    extendWallpaperBase64Obj.value = {};
    currWallpaperName.value = "蓝山";
  }

  if (!(currWallpaperName.value in wallpaperBase64Obj.value)) {
    currWallpaperName.value = "蓝山";
  }

  const isShowDialog = useConfig('isShowDialog', false);

  const tabsCurrSel = useConfig("tabs-item-currSel", "0");

  const collapseCurrSel = useConfig("wallpaper-config-currSel", "1");

  const currWallpaperBase64Url = computed(() => {
    return `url(${wallpaperBase64Obj.value[currWallpaperName.value]})`
  });

  const isShowContact = useConfig('isShowContact', true);


  return {
    deleteWallpaper,
    renameWallpaper,
    applyWallpaper,
    appendWallpaper,
    emptyWallpaper,
    currWallpaperName, 
    extendWallpaperBase64Obj, 
    wallpaperBase64Obj, 
    isShowDialog,
    tabsCurrSel,
    collapseCurrSel,
    currWallpaperBase64Url,
    isShowContact
  };
})