<script setup>
const props = defineProps({
  default: {
    type: [String, Number],
    default: 0,
  },
  options: {
    type: Array,
    default: () => [],
  },
  tip: {
    type: String,
    default: "",
  },
  mode: {
    type: String,
    default: "number",
  },
  suffix: {
    type: String,
    default: "",
  }
})

const cssVar = defineModel();

function setPosDefault() {
  cssVar.value = props.default;
}
</script>

<template>
  <el-row class="setting-row">
  <el-col class="setting-container" :span="24">
    <el-tooltip
        effect="light"
        :content="tip"
        placement="bottom"
        :disabled="tip.length === 0"
    >
      <el-text class="input-label"><slot></slot></el-text>
    </el-tooltip>

    <template v-if="typeof cssVar === mode || (cssVar === null && mode === 'number') ">
      <template v-if="mode === 'string'">
        <!--        文字设置模式-->
        <el-select
            v-model="cssVar"
            placeholder="Select"
            style="width: 220px"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </template>
      <template v-else>
        <el-input-number v-model="cssVar" :step="10" style="width: 200px">
          <template v-if="suffix.length !== 0" #suffix>
            <span>{{suffix}}</span>
          </template>
        </el-input-number>
      </template>
    </template>
    <template v-else>
      <el-button type="primary" plain @click="setPosDefault">切换设置方式</el-button>
    </template>

    <el-button  class="default-btn"  type="primary" plain @click="setPosDefault">设为默认值</el-button>
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