<script setup lang="ts">
import { defineEmits } from 'vue'

/** 定义事件 */
defineEmits(['uploadJson', 'clearable', 'preview', 'generateJson', 'generateCode'])
</script>

<template>
  <el-header class="btn-bar">
    <slot />
    <el-button
      v-if="$attrs.uploadJson"
      type="text"
      @click="$emit('uploadJson')"
    >
      <template #icon>
        <svg-icon name="upload" />
      </template>
      导入JSON
    </el-button>
    <el-button
      v-if="$attrs.clearable"
      type="text"
      @click="$emit('clearable')"
    >
      <template #icon>
        <svg-icon name="clearable" />
      </template>
      清空
    </el-button>
    <el-button
      v-if="$attrs.preview"
      type="text"
      @click="$emit('preview')"
    >
      <template #icon>
        <svg-icon name="preview" />
      </template>
      预览
    </el-button>
    <el-button
      v-if="$attrs.generateJson"
      type="text"
      @click="$emit('generateJson')"
    >
      <template #icon>
        <svg-icon name="generate-json" />
      </template>
      生成JSON
    </el-button>
    <el-button
      v-if="$attrs.generateCode"
      type="text"
      @click="$emit('generateCode')"
    >
      <template #icon>
        <svg-icon name="generate-code" />
      </template>
      生成代码
    </el-button>
  </el-header>
</template>

<style lang="scss" scoped>
:deep(.el-icon) {
  width: 20px;
  height: 20px;
}
</style>
