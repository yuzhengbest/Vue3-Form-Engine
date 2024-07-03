<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, onBeforeUnmount } from 'vue'
import WangEditor from 'wangeditor'

/** props 定义 */
const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

/** event 定义 */
const $emits = defineEmits(['update:value'])

/** constant 定义 */
let instance: WangEditor | null
const editorRef = ref<HTMLElement | null>(null)

/** watch computed 定义 */
const content = computed({
  get: () => props.value,
  set: val => $emits('update:value', val)
})

/** hooks 定义 */
onMounted(() => {
  instance = new WangEditor(editorRef.value as HTMLElement)
  Object.assign(instance.config, {
    ZIndex: 9,
    onChange: (html: string) => (content.value = html)
  })
  instance.create()

  watchEffect(() => instance && props.disabled ? instance?.disable() : instance?.enable())
})
onBeforeUnmount(() => {
  instance && instance.destroy()
  instance = null
})

</script>

<template>
  <div ref="editorRef" />
</template>
