<script setup>
import { computed, onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { useBiliStore } from '../store/bilibili.mjs';
import { useMainStore } from '../store/main.mjs';
import { storeToRefs } from 'pinia';
import { useScroll } from '@vueuse/core';
import { throttle } from 'underscore';


const wallpaperRef = ref();

const biliStore = useBiliStore();

const { isShowOriginal } = storeToRefs(biliStore);

// 向下滚, 显示原内容
function onWallpaperMheelScroll(event) {
  if (event.deltaY > 0) {
    // 滚轮向下滚
    isShowOriginal.value = true;
  }
  event.preventDefault();
}

const { arrivedState, y: topOffset } = useScroll(window);

// 避免向下滚, 显示内容不完全
watch(topOffset, () => {
  if (topOffset.value > 3 && !isShowOriginal.value) {
    isShowOriginal.value = true;
  }
})

const { top: isTop} = toRefs(arrivedState);

// 向上滚显示Cover
const onWindowMhellScroll = throttle((event) => {
  if (event.deltaY > 0) {
    // 滚轮向下滚, 这里要向上才显示cover
    return;
  }

  // 如果不在顶部, 就不做处理
  if (!isTop.value) {
    return;
  }

  isShowOriginal.value = false;
}, 100);

onMounted(() => {
  
  wallpaperRef.value.addEventListener('wheel', onWallpaperMheelScroll);

  window.addEventListener('wheel', onWindowMhellScroll, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener('wheel', onWindowMhellScroll);
})

const mainStore = useMainStore();

const {currWallpaperBase64Url} = storeToRefs(mainStore);



onMounted(() => {
  watch(currWallpaperBase64Url, () => {
    // 不要在下面的style块中使用v-bind, 不稳定, 有时候无法正确设置图片
    wallpaperRef.value.style.backgroundImage = `${currWallpaperBase64Url.value} `
  }, { immediate: true })
});
</script>

<template>
  <div class="wallpaper-item" :class="{ hidden: isShowOriginal }" ref="wallpaperRef">

  </div>
</template>

<style lang="less" scoped>
.wallpaper-item {
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 23;

  background-repeat: no-repeat;

  background-color: var(--wallpaper-bg-color);

  background-size: var(--wallpaper-size) ;

  background-position: var(--wallpaper-pos-x) var(--wallpaper-pos-y);

  transition: translate var(--scroll-duration) var(--scroll-timing-function);

  &.hidden {
    translate: 0 -100vh;
  }
}
</style>