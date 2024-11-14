<script setup>
import { ref } from 'vue'
import TabsItem from './cpns/TabsItem.vue';
import { useMainStore } from '../store/main.mjs';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const {isShowDialog} = storeToRefs(mainStore);

</script>

<template>
  <div class="upload-dialog">
    <el-dialog v-model="isShowDialog" width="500" align-center>
      <tabs-item />
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.upload-dialog {
  --el-message-close-size: 20px;
}

:deep(.el-dialog__headerbtn) {
  z-index: 300;
}

:deep(.el-dialog__headerbtn::after) {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  transform: scale(1.5);
}
</style>