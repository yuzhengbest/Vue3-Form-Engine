<script setup lang="ts">
import ace, { Ace } from 'ace-builds'
import { ref, onMounted, watch } from 'vue'

/** 属性定义 */
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'javascript'
  },
  theme: {
    type: String,
    default: 'github'
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

/** 事件定义 */
const $emits = defineEmits(['update:value'])

/** 常量定义 */
const aceRef = ref<HTMLElement | null>(null)
const codeEditor = ref<Ace.Editor | null>(null)

/** 监听 */
watch(() => props.value, (val) => {
  if (codeEditor.value) {
    const currentPosition = codeEditor.value?.selection?.getCursor()
    codeEditor.value?.setValue(val)
    codeEditor.value?.clearSelection()
    codeEditor.value?.gotoLine(currentPosition.row + 1, currentPosition.column, true)
  }
})

/** 钩子 */
onMounted(() => {
  codeEditor.value = ace.edit(aceRef.value as HTMLElement, {
    mode: `ace/mode/${props.language}`,
    theme: `ace/theme/${props.theme}`,
    value: props.value,
    readOnly: props.readonly,
    fontSize: 12,
    tabSize: 2
  })

  codeEditor.value.on('change', () => {
    $emits('update:value', codeEditor.value?.getValue())
  })
})
</script>

<template>
  <div
    ref="aceRef"
    class="ace-wrapper"
  />
</template>

<style lang="scss" scoped>
  .ace-wrapper {
    width: 100%;
    height: 350px
  }
</style>
