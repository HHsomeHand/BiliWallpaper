<script setup>
const props = defineProps({
  min: {
    type: [String, Boolean],
    default: false,
  },
  max: {
    type: [String, Boolean],
    default: false,
  },
  desc: {
    type: String,
    default: "",
  },
  defaultValue: {
    type: Number,
    default: 0,
  },
  defaultBtnDesc: {
    type: String,
    default: "设为默认值",
  },
  tip: {
    type: [String, Boolean],
    default: false,
  }
});

const cssVar = defineModel();

function setCssVarDefault() {
  cssVar.value = props.defaultValue;
}
</script>

<template>
  <el-row class="setting-row">
    <el-col class="setting-container" :span="24">
      <el-tooltip
          :disabled="!tip"
          :content="tip"
          placement="bottom"
      >
        <el-text class="input-label">{{desc}}</el-text>
      </el-tooltip>

      <el-input-number v-model="cssVar" :min="min" :max="max"/>
      <el-button class="default-btn" type="primary" plain @click="setCssVarDefault">{{defaultBtnDesc}}</el-button>
    </el-col>
  </el-row>
</template>

<style scoped>
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
</style>