<script setup lang="ts">
import { WidgetForm } from '@/config/component'
import { PropType, ref, watch } from 'vue'

/** 属性定义 */
const props = defineProps({
  config: {
    type: Object as PropType<WidgetForm['config']>,
    required: true
  }
})

/** 事件定义 */
const $emits = defineEmits(['update:config'])

/** 常量定义 */
const data = ref(props.config)

/** 监听 */

watch(data, (val) => {
  $emits('update:config', val)
}, { deep: true })
</script>

<template>
  <div class="form-config-container">
    <el-form
      size="default"
      :label-width="100"
      label-position="right"
      label-suffix=":"
    >
      <el-form-item label="标签对齐">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">
            左对齐
          </el-radio-button>
          <el-radio-button label="right">
            右对齐
          </el-radio-button>
          <el-radio-button label="top">
            顶部对齐
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="标签宽度">
        <el-input-number
          v-model.number="data.labelWidth"
          :min="0"
        />
      </el-form-item>

      <el-form-item label="组件尺寸">
        <el-radio-group v-model="data.size">
          <el-radio-button label="large">
            大
          </el-radio-button>
          <el-radio-button label="default">
            默认
          </el-radio-button>
          <el-radio-button label="small">
            小
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="隐藏必选标记">
        <el-switch v-model="data.hideRequiredAsterisk" />
      </el-form-item>
    </el-form>
  </div>
</template>
