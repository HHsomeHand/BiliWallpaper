<script setup>
import { ref } from 'vue'
import WallpaperItem from './components/WallpaperItem.vue';
import DialogItem from './dialog/DialogItem.vue';
</script>

<template>
  <div class="app">
    <wallpaper-item />
    <teleport to='body' >
      <dialog-item />
    </teleport>
    
    
  </div>
</template>

<style lang="less" scoped>

</style>