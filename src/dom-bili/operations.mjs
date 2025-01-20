import { $Q } from "./utils.mjs";
import {SCROLL_DURATION} from "@/const/search-bar-const.js";

let timeHandle = null;

function testTimeout () {
  if (timeHandle !== null) {
    // 调用之前，先清理，防止一直生成对象
    clearTimeout(timeHandle);
    timeHandle = null;
  }
}

function mySetTimout(handle, timeout) {
  testTimeout();
  timeHandle = setTimeout(handle, timeout);
}


export async function applyOriginalShowState(isShow) {
  if (isShow) {
    // 让内容(视频推送)升上来
    $Q('.bili-header__banner').style.translate = '0 0';
    $Q('.bili-header__channel').style.translate = '0 0';
    $Q('.bili-feed4-layout').style.translate = '0 0';
    // 搜索栏
    // $Q('.center-search__bar').style.

    $Q('.center-search-container').style.opacity = '0';

    mySetTimout(() => {
      $Q('.center-search-container').style.position = 'static';
      $Q('.center-search-container').style.translate = '0 0';
      $Q('.center-search-container').style.opacity = '1';
    }, SCROLL_DURATION * 1000);


    // 让浮动频道条出现(见src/asserts/css/bilibili.css浮动频道条注释)
    $Q('.header-channel').id = 'header-channel-show';
  }
  else {
    
    // 清除行内style, 让bilibili.css设置的样式起作用
    $Q('.bili-header__banner').style.translate = '';
    $Q('.bili-header__channel').style.translate = '';
    $Q('.bili-feed4-layout').style.translate = '';

    $Q('.center-search-container').style.opacity = '0';
    mySetTimout(() => {
      $Q('.center-search-container').style.translate = '';
      $Q('.center-search-container').style.position = '';
      $Q('.center-search-container').style.opacity = '1';
    }, SCROLL_DURATION * 1000);

    $Q('.header-channel').id = '';
  }
}

