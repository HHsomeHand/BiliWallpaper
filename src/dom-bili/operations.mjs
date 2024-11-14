import { $Q } from "./utils.mjs";
import {useConfig} from "@/hooks/useConfig.mjs";

export function applyOriginalShowState(isShow) {
  if (isShow) {
    // 让内容(视频推送)升上来
    $Q('.bili-header__banner').style.translate = '0 0';
    $Q('.bili-header__channel').style.translate = '0 0';
    $Q('.bili-feed4-layout').style.translate = '0 0';
    // 搜索栏
    $Q('.center-search__bar').style.translate = '0 0';
    $Q('.center-search__bar').style.transition = 'var(--scroll-duration)  var(--scroll-timing-function)';
    // 让浮动频道条出现(见src/asserts/css/bilibili.css浮动频道条注释)
    $Q('.header-channel').id = 'header-channel-show';
  }
  else {
    
    // 清除行内style, 让bilibili.css设置的样式起作用
    $Q('.bili-header__banner').style.translate = '';
    $Q('.bili-header__channel').style.translate = '';
    $Q('.bili-feed4-layout').style.translate = '';
    $Q('.center-search__bar').style.translate = '';
    $Q('.header-channel').id = '';
  }
}

