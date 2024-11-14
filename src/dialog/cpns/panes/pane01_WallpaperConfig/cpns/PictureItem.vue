<script setup>
import { ref, watch } from 'vue'
import { useMainStore } from '@/store/main.mjs';
import { storeToRefs } from 'pinia';
import {ElInput, ElMessageBox, ElNotification} from "element-plus";

const props = defineProps({
  imgName:{
    type: String,
    default: "",
  },
  imgSrc: {
    type: String,
    default: "",
  },
  deletable: {
    type: Boolean,
    default: false,
  },
  lazy: {
    type: Boolean,
    default: false,
  }
});

const mainStore = useMainStore();

function applyWallpaper() {
  mainStore.applyWallpaper(props.imgName);
}


function renameWallpaper() {
  ElMessageBox.prompt('', '修改壁纸名', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(({ value: newName }) => {
      mainStore.renameWallpaper(props.imgName, newName);
      ElNotification({
        title: '消息',
        message: '已修改',
        type: 'success',
      });
  }).catch(() => {
  });


  //mainStore.renameWallpaper(props.imgName, newName.value);
}

function deleteWallpaper() {
  mainStore.deleteWallpaper(props.imgName);
}

const loading = ref(true);

function onLoadSuccess() {
  loading.value = false;
}

</script>

<template>
  <div class="PictureItem">
    <el-card class="card" shadow="hover">

      <template #header>
        <div class="card-header">
          <span>{{ imgName }}</span>

          <el-button v-if="deletable" type="primary" @click="renameWallpaper" class="header-btn" plain>修改</el-button>
        </div>
      </template>

      <el-image v-loading="loading" class="img" :preview-src-list="[imgSrc]" :src="imgSrc" fit="cover" :lazy="lazy" @load="onLoadSuccess" />
      <template #footer>
        <div class="card-footer">
          <el-button type="primary" @click="applyWallpaper" plain>应用壁纸</el-button>
          <template v-if="deletable">
            <el-button type="danger"  @click="deleteWallpaper" plain>删除</el-button>
          </template>
        </div>
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.PictureItem {
  width: 50%;

  .card {
    margin: 3px;

    .card-header, .card-footer {
      display: flex;
      justify-content: space-between;

    }

    .header-btn {
      margin-left: 10px;
    }

    &:nth-child(odd) {
      margin-right: 0;
    }

    .img {
      height: 100px;
    }
  }
}
</style>