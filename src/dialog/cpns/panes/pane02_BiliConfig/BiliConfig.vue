<script setup>
import { ref, watch} from 'vue'
import {storeToRefs} from "pinia";
import {useBiliStore} from "@/store/bilibili.mjs";
import {useMainStore} from "@/store/main.mjs";
import CssVarConfig from "@/dialog/cpns/panes/pane02_BiliConfig/cpns/CssVarConfig.vue";
import {useConfig} from "@/hooks/useConfig.mjs";
import {SEARCH_BAR_TOP_GAP, SEARCH_BAR_WIDTH, SEARCH_BAR_X_OFFSET} from "@/const/search-bar-const.js";
import NumRowConfig from "@/dialog/cpns/panes/pane02_BiliConfig/cpns/NumRowConfig.vue";
const biliStore = useBiliStore();

const {
  displayConfigObj,
  displayConfigDescs,
  displayConfigCount,
  searchBarTopGap,
  searchBarWidth,
  searchBarXOffset,
  wallpaperPosX,
  wallpaperPosY,
  wallpaperSize,
  wallpaperBgColor,
} = storeToRefs(biliStore);

watch(wallpaperBgColor, () => {
  console.log(wallpaperBgColor.value)
})

let COL_COUNT = 4;

const rowCount = computed(() => {
  // 向上取整
  return Math.ceil(displayConfigCount.value / COL_COUNT);
})

const mainStore = useMainStore();

const {isShowContact} = storeToRefs(mainStore);

let optionsX = [
  {
    value: 'left',
    label: '左',
  },
  {
    value: 'center',
    label: '中',
  },
  {
    value: 'right',
    label: '右',
  }
]

let optionsY = [
  {
    value: 'top',
    label: '上',
  },
  {
    value: 'center',
    label: '中',
  },
  {
    value: 'bottom',
    label: '下',
  }
]

let optionsSize = [
  {
    value: 'contain',
    label: '包含',
  },
  {
    value: 'cover',
    label: '覆盖',
  },
]

const posTipX = ref("壁纸如果很长, 设置效果就会很明显");
const posTipY = ref("壁纸如果很高, 设置效果就会很明显");


const posNumTip = ref("可以输入负值")

const activeName = useConfig('bili-config-active-name', false);

</script>

<template>
  <el-scrollbar max-height="60vh" class="bili-config">
    <el-row>
      <el-col :span="24">
        <el-text size="large">自定义导航条</el-text>
      </el-col>
    </el-row>

<!--    取索引, 写在第一位是从0开始 语法无误-->
    <template v-for="(_rowIndex, rowIndex) of rowCount">
      <el-row class="wide-row">
        <template v-for="(_colIndex, colIndex) of COL_COUNT ">
          <el-col class="checkbox-wrapper" :span="24 / COL_COUNT">
            <template v-if="rowIndex * COL_COUNT + colIndex < displayConfigCount">
              <el-checkbox :label="displayConfigDescs[rowIndex * COL_COUNT + colIndex]"
                v-model="displayConfigObj[displayConfigDescs[rowIndex * COL_COUNT + colIndex]]"/>
            </template>
          </el-col>
        </template>
      </el-row>
    </template>

    <NumRowConfig
        v-model="searchBarTopGap"
        desc="搜索框离顶部高度, 单位vh:"
        :min="0"
        :max="100"
        default-btn-desc="距顶设为默认值"
        :default-value="SEARCH_BAR_TOP_GAP"
    />

    <NumRowConfig
        v-model="searchBarWidth"
        desc="搜索框宽度, 单位vw:"
        :min="0"
        :max="100"
        default-btn-desc="宽度设为默认值"
        :default-value="SEARCH_BAR_WIDTH"
    />

    <NumRowConfig
        v-model="searchBarXOffset"
        desc="搜索框X轴偏移, 单位vw:"
        default-btn-desc="偏移设为默认值"
        :default-value="SEARCH_BAR_X_OFFSET"
        tip="正数往右偏, 负数往左偏"
    />

    <css-var-config :tip="posTipX" v-model="wallpaperPosX" default="center" mode="string" :options="optionsX" >
      壁纸X轴显示位置
    </css-var-config>

    <css-var-config :tip="posTipY"  v-model="wallpaperPosY" default="center" mode="string" :options="optionsY">
      壁纸Y轴显示位置
    </css-var-config>

    <css-var-config   v-model="wallpaperSize" default="cover" mode="string" :options="optionsSize">
      壁纸显示模式
    </css-var-config>

    <el-row class="gap-setting-row">
      <el-col class="gap-setting-container" :span="24">
        <el-text style="margin-right: 20px">壁纸背景颜色:</el-text>
        <el-color-picker v-model="wallpaperBgColor" show-alpha />
      </el-col>
    </el-row>

    <el-row class="gap-setting-row">
      <el-col class="gap-setting-container" :span="24">
        <el-checkbox label="是否显示联系面板" v-model="isShowContact" />
      </el-col>
    </el-row>

    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="高级壁纸设置" name="1">
        <css-var-config :tip="posNumTip" v-model="wallpaperPosX" :default="0" mode="number" suffix="px">
          壁纸X轴显示位置(px)
        </css-var-config>

        <css-var-config :tip="posNumTip" v-model="wallpaperPosY" :default="0" mode="number" suffix="px">
          壁纸Y轴显示位置(px)
        </css-var-config>

        <css-var-config  v-model="wallpaperSize" :default="100" mode="number" suffix="%">
          壁纸显示大小
        </css-var-config>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}

.bili-config {

  .wide-row {
    margin-right: calc(var(--el-dialog-padding-primary) * -2) ;
  }


  .setting-row {
    /* margin-right: calc(var(--el-dialog-padding-primary) * 2) ; */
    .setting-container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-label {
        margin-right: 10px;
      }

      .default-btn {
        margin-left: 10px;
      }
    }
  }
}

:deep(.is-vertical) {
  display: none !important;
}

:deep(.is-horizontal) {
  display: none !important;
}
</style>