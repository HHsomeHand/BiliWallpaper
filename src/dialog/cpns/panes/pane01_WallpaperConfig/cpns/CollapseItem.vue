<script setup>
import { ref, computed, watch, onMounted} from 'vue'
import PictureItem from './PictureItem.vue';
import { isObjEmpty } from '@/utils/index.mjs';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store/main.mjs';

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "40vh"
  },
  imgObj: {
    type: Object,
    default: () => ({})
  },
  deletable: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ""
  }
});

const mainStore = useMainStore();

const {tabsCurrSel} = storeToRefs(mainStore);

// 跳转到导入页面
function toImportPane() {
  tabsCurrSel.value = "0";
}

function clearAll(event) {
  event.stopPropagation();

  ElMessageBox.confirm('是否要清除所有自定义背景图?',"", {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    // 确定
    mainStore.emptyWallpaper();
  }).catch(() => {
    // 取消
  });
}   

const { collapseCurrSel } = storeToRefs(mainStore);





</script>

<template>
  <el-collapse-item class="collapse-item" :title="title" :name="name">
      <template #title v-if="deletable">
        {{ title }} <el-button class="clear-all-btn" @click="clearAll" text type="danger" >删除全部</el-button>
      </template>
    <template v-if="isObjEmpty(imgObj)">
      <el-empty description="没有自定义壁纸, 请导入壁纸">
        <el-button type="primary" @click="toImportPane">导入壁纸</el-button>
      </el-empty>
    </template>
    <template v-else>
      <el-scrollbar ref="scrollRef" class="scroll" :max-height="height">
        <template v-for="(imgSrc, imgName, index) of imgObj" >
          <PictureItem :imgSrc="imgSrc" :imgName="imgName" :deletable="deletable" :lazy="index > 1"/>
        </template>
      </el-scrollbar>
    </template>
  </el-collapse-item>
</template>

<style scoped>
.collapse-item {
  .clear-all-btn {
    margin-left: 10px;
  }
}

:deep(.el-scrollbar__view) {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>