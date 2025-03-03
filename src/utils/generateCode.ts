import { CodeType } from '@/types'
import { WidgetForm } from '@/config/component'

export default function (widgetForm: WidgetForm, codeType: string) {
  if (codeType === CodeType.Vue) {
    return `<template>
      <el-generate-form ref="generateFormRef" :data="widgetForm">
      </el-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'

    /** constant 定义 */
    const generateFormRef = ref<HTMLElement | null>(null)
    const widgetForm = ref(${JSON.stringify(widgetForm)})

    /** methods 定义 */
    async function handleSubmit() {
      try {
        const res = await generateFormRef.value?.getData()
        // success to do something
      } catch (error) {
        console.error(error)
        // failed to do something
      }
    }`
  }
  if (codeType === CodeType.Html) {
    return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://unpkg.com/element-plus/lib/theme-chalk/index.css" />
  </head>
  <body>
    <div id="app">
      <el-generate-form ref="generateFormRef" :data="widgetForm"></el-generate-form>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
    <script src="https://unpkg.com/vue@next/dist/vue.global.prod.js"></script>
    <script src="https://unpkg.com/vue-form-create/dist/formCreate.umd.min.js"></script>
    <script src="https://unpkg.com/ace-builds/src-noconflict/ace.js"></script>
    <script src="https://unpkg.com/element-plus/lib/index.full.js"></script>
    <script>
      const { createApp, reactive, toRefs } = Vue

      createApp({
        setup() {
          const state = reactive({
            generateFormRef: null,
            widgetForm: ${JSON.stringify(widgetForm)}
          })
      
          const handleSubmit = () => {
            state.generateFormRef.getData().then(data => {
              console.log(data)
              // data success
              // data 表单数据
            }).catch(error => {
              // data failed
            })
          }
      
          return {
            ...toRefs(state),
            handleSubmit
          }
        }
      })
      .use(ElementPlus)
      .use(formCreate)
      .mount('#app')
    </script>
  </body>
</html>
    `
  }
}
