import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { applyOriginalShowState } from "../dom-bili/operations.mjs";
import {useCssVar} from "@/hooks/useCssVar.mjs";
import {useCssVarFormat} from "../hooks/useCssVarFormat.mjs";
import {usePlaceHolderShowSate} from "@/hooks/usePlaceHolderShowState.mjs";
import {useStyleElement} from "@/hooks/useStyleElement.mjs";
import {useDisplayNone} from "@/hooks/useDisplayNone.mjs";
import {useBooleanReverse} from "@/hooks/useBooleanReverse.mjs";


// 管理BiliBili状态的
export const useBiliStore = defineStore('bilibili', () => {
  const isShowOriginal = ref(false);

  watch(isShowOriginal, () => {
    applyOriginalShowState(isShowOriginal.value);
  });

  function useHiddenState(key, defaultValue, selector) {
    return useBooleanReverse(useDisplayNone(key, defaultValue, selector));
  }

  const displayConfigObj = ref({
    "下载客户端": useHiddenState('display-status-download', false, 'div.bili-header__bar > ul.left-entry > li:nth-child(8)'),
    "会员购": useHiddenState('display-status-huiyuangou', true, 'div.bili-header__bar > ul.left-entry > li:nth-child(5)'),
    "游戏中心": useHiddenState('display-status-game-center', true, ' div.bili-header__bar > ul.left-entry > li:nth-child(4)'),
    "上传按钮": useHiddenState('display-status-upload-video', false, '.right-entry-item--upload'),
    "隐藏热搜": useStyleElement('hot-search-recommend', true,
    `
      .search-panel .trending {
        display: none !important;
      }
    `),
    "热门搜索词": usePlaceHolderShowSate('.nav-search-content > input'),
  });

  const displayConfigCount = computed(() => {
    return Object.values(displayConfigObj.value).length;
  });

  // Descs -> 描述
  const displayConfigDescs = computed(() => {
    return Object.keys(displayConfigObj.value);
  });

  // 这样取到的是非ref对象
  // const displayConfigs = computed(() => {
  //   return Object.values(displayConfigObj.value);
  // })

  const searchBarTopGap= useCssVarFormat('--search-bar-top-gap', '35vh', 'vh');

  const wallpaperPosX= useCssVarFormat('--wallpaper-pos-x', 'center', 'px');
  const wallpaperPosY= useCssVarFormat('--wallpaper-pos-y', 'center', 'px');
  const wallpaperSize= useCssVarFormat('--wallpaper-size', 'cover', '%');
  const wallpaperBgColor = useCssVar('--wallpaper-bg-color', '#fff');
  // console.log(wallpaperPosX.value);
  // console.log(wallpaperPosY.value);
  // wallpaperPosX.value.cssVarWithoutFormat = 'center';
  // wallpaperPosY.value.cssVarWithoutFormat = 'center';
  // wallpaperSize.value  = 'cover';

  // wallpaperBgColor.value = '#fff';
  return {
    isShowOriginal,
    displayConfigObj,
    displayConfigCount,
    displayConfigDescs,
    // displayConfigs,
    searchBarTopGap,
    wallpaperPosX,
    wallpaperPosY,
    wallpaperSize,
    wallpaperBgColor
  };
})