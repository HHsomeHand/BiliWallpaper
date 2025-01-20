<script setup>
import { ref } from 'vue'
import TabsItem from './cpns/TabsItem.vue';
import { useMainStore } from '../store/main.mjs';
import { storeToRefs } from 'pinia';
import {setMovable} from "@/dom-bili/setMovable.mjs";
import {queryAsync} from "@/dom-bili/queryAsync.mjs";

const mainStore = useMainStore();
const {isShowDialog} = storeToRefs(mainStore);

const dialogRef = ref(null);

async function onDialogOpen() {
  let dialogEl = dialogRef.value;

  let targetEl = await queryAsync(".el-dialog", dialogEl);

  setMovable(targetEl);
}
</script>

<template>
  <div ref="dialogRef" class="upload-dialog">
    <el-dialog @opened="onDialogOpen" v-model="isShowDialog" width="500" align-center>
      <tabs-item />
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.upload-dialog {
  --el-overlay-color-lighter: rgba(0, 0, 0, 0.3);
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