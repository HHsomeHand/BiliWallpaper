import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { applyOriginalShowState } from "../dom-bili/operations.mjs";
import {useCssVar} from "@/hooks/useCssVar.mjs";
import {useCssVarFormat} from "../hooks/useCssVarFormat.mjs";
import {useSearchBar} from "@/hooks/useSearchBar.mjs";
import {useStyleElement} from "@/hooks/useStyleElement.mjs";
import {useDisplayNone} from "@/hooks/useDisplayNone.mjs";
import {useBooleanReverse} from "@/hooks/useBooleanReverse.mjs";
import {SCROLL_DURATION, SEARCH_BAR_TOP_GAP, SEARCH_BAR_WIDTH, SEARCH_BAR_X_OFFSET} from "@/const/search-bar-const.js";


// 管理BiliBili状态的
export const useBiliStore = defineStore('bilibili', () => {
  const isShowOriginal = ref(false);

  watch(isShowOriginal, () => {
    applyOriginalShowState(isShowOriginal.value);
  });

  function useHiddenState(key, defaultValue, selector) {
    return useBooleanReverse(useDisplayNone(key, defaultValue, selector));
  }

  let {isShowPlaceHolder, isAutoFocus} = useSearchBar('.nav-search-content > input');

  const displayConfigObj = ref({
    "下载客户端": useHiddenState('display-status-download', false, '.left-entry li:nth-last-child(1)'),
    "会员购": useHiddenState('display-status-huiyuangou', true, 'div.bili-header__bar > ul.left-entry > li:nth-child(5)'),
    "游戏中心": useHiddenState('display-status-game-center', true, ' div.bili-header__bar > ul.left-entry > li:nth-child(4)'),
    "上传按钮": useHiddenState('display-status-upload-video', false, '.right-entry-item--upload'),
    "隐藏热搜": useStyleElement('hot-search-recommend', true,
    `
      .search-panel .trending {
        display: none !important;
      }
    `),
    "动图菜单项": useHiddenState('display-status-gif', false, '.left-entry li:nth-last-child(2)'),
    "热门搜索词": isShowPlaceHolder,
    "自动聚焦": isAutoFocus
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

  // const scrollDuration= useCssVarFormat('--scroll-duration', SCROLL_DURATION + 's', 's');


  const searchBarTopGap= useCssVarFormat('--search-bar-top-gap', SEARCH_BAR_TOP_GAP + 'vh', 'vh');
  const searchBarWidth = useCssVarFormat('--search-bar-width', SEARCH_BAR_WIDTH +'vw', 'vw');
  const searchBarXOffset = useCssVarFormat('--search-bar-x-offset', SEARCH_BAR_X_OFFSET +'px', 'px');


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
    searchBarXOffset,
    // displayConfigs,
    // scrollDuration,
    searchBarTopGap,
    searchBarWidth,
    wallpaperPosX,
    wallpaperPosY,
    wallpaperSize,
    wallpaperBgColor
  };
})