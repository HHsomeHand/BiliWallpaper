import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";
import { applyOriginalShowState } from "../dom-bili/operations.mjs";
import {useDisplayConfig} from "@/hooks/useDisplayConfig.mjs";
import {useCssVar} from "@/hooks/useCssVar.mjs";
import {useCssVarFormat} from "../hooks/useCssVarFormat.mjs";
import {useIsShowPlaceholder} from "@/hooks/useIsShowPlaceholder.mjs";
import {useStyleConfig} from "@/hooks/useStyleConfig.mjs";


// 管理BiliBili状态的
export const useBiliStore = defineStore('bilibili', () => {
  const isShowOriginal = ref(false);

  watch(isShowOriginal, () => {
    applyOriginalShowState(isShowOriginal.value);
  });

  const displayConfigObj = ref({
    "下载客户端": useDisplayConfig('display-status-download', false, 'div.bili-header__bar > ul.left-entry > li:nth-child(8)'),
    "会员购": useDisplayConfig('display-status-huiyuangou', true, 'div.bili-header__bar > ul.left-entry > li:nth-child(5)'),
    "游戏中心": useDisplayConfig('display-status-game-center', true, ' div.bili-header__bar > ul.left-entry > li:nth-child(4)'),
    "上传按钮": useDisplayConfig('display-status-upload-video', false, '.right-entry-item--upload'),
    "隐藏热搜": useStyleConfig('hot-search-recommend', true,
    `
      .search-panel .trending {
        display: none !important;
      }
    `),
    "热门搜索词": useIsShowPlaceholder(),
    "活动(动画)": useDisplayConfig('display-dynamic-icon', false, '#i_cecream > div.bili-feed4 > div.bili-header.large-header > div.bili-header__bar > ul.left-entry > li.v-popover-wrap.left-loc-entry')
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