<script setup>
function onMouseDown(event) {
  event.stopPropagation();
}

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <el-collapse-transition>
    <el-tab-pane ref="uploadPaneRef"  :label="label" :name="name">
      <div @mousedown="onMouseDown" class="pane">
        <slot>

        </slot>
      </div>
    </el-tab-pane>
  </el-collapse-transition>
</template>

<style scoped>
.pane {
  cursor: default;
}
</style>