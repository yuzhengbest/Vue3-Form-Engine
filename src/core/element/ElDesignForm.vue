<script setup lang="ts">
import { ref, PropType, reactive, watch } from 'vue'
import { defaultsDeep } from 'lodash'
import { copy } from '@/utils/common'
import { basicComponents, advanceComponents, layoutComponents, widgetForm, WidgetForm } from '@/config/component'
import FormGroup from '@/components/FormGroup/index.vue'
import ElCustomHeader from './ElCustomHeader.vue'
import ElWidgetForm from './ElWidgetForm.vue'
import ElFormConfig from './ElFormConfig.vue'
import ElWidgetConfig from './ElWidgetConfig.vue'
// import { ElMessage } from 'element-plus'

/** 属性定义 */
const props = defineProps({
  basicFields: {
    type: Array as PropType<Array<string>>,
    default: () => ([
      'input',
      'password',
      'textarea',
      'number',
      'radio',
      'checkbox',
      'time',
      'date',
      'rate',
      'select',
      'switch',
      'slider',
      'text'
    ])
  },
  advancedFields: {
    type: Array as PropType<Array<string>>,
    default: () => ['img-upload', 'richtext-editor', 'cascader']
  },
  layoutFields: {
    type: Array as PropType<Array<string>>,
    default: () => ['grid']
  },
  preview: {
    type: Boolean,
    default: true
  },
  generateCode: {
    type: Boolean,
    default: true
  },
  generateJson: {
    type: Boolean,
    default: true
  },
  uploadJson: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: true
  }
})

/** 常量定义 */
const previewVisible = ref<boolean>(false)
const uploadJsonVisible = ref<boolean>(false)
const generateJsonVisible = ref<boolean>(false)
const dataCodeVisible = ref<boolean>(false)
const dataJsonVisible = ref<boolean>(false)
const generateCodeVisible = ref<boolean>(false)

const configTab = ref<string>('widget')
const dataJsonTemplate = ref<string>('')
const dataCodeTemplate = ref<string>('')
const codeLanguage = ref<string>('vue')

const widgetFormSelect = ref(undefined)
const generateFormRef = ref(null)

const codeType = reactive({ Vue: 'vue', Html: 'html' })
const widgetFormObj = ref(JSON.parse(JSON.stringify(widgetForm)))
const generateJsonTemplate = ref(JSON.stringify(widgetForm, null, 2))
const jsonEg = ref(JSON.stringify(widgetForm, null, 2))

/** 监听 */
// watch(dataCodeVisible, (val) => {
//   if (val) {
//     dataCodeTemplate.value =
//   }
// })

/** methods 定义 */
// function handleUplaodJson() {
//   try {
//     widgetFormObj.value.list = []
//     defaultsDeep(widgetFormObj, JSON.parse(jsonEg.value))

//     if (widgetFormObj.value.list.length) {
//       widgetFormSelect.value = widgetFormObj.value.list[0]
//     }

//     uploadJsonVisible.value = false
//     ElMessage.success('上传成功')
//   } catch (error) {
//     console.error(error)
//     ElMessage.error('上传失败')
//   }
// }

// function handleCopyClick(text: string) {
//   copy(text)
//   ElMessage.success('复制成功')
// }

// async function handleGetData() {
//   const res = generateFormRef.value?.getData()
//   dataJsonTemplate.value = JSON.stringify(res, null, 2)
//   dataJsonVisible.value = true
// }

function handleGenerateJson () {
  (generateJsonTemplate.value = JSON.stringify(widgetFormObj.value, null, 2)) && (generateJsonVisible.value = true)
}

function handleGenerateCode () {
  codeLanguage.value = 'vue'
  dataCodeVisible.value = true
}

function handleClearable () {
  // widgetFormObj.value.list = []
  // defaultsDeep(widgetFormObj.value, JSON.parse(JSON.stringify(widgetForm)))
  // widgetFormSelect.value = undefined
}

// function handleReset() {
//   generateFormRef.value?.reset()
// }

// function getJson() {
//   return widgetFormObj
// }

// function setJson(json: WidgetForm) {
//   widgetFormObj.value.list = []
//   defaultsDeep(widgetFormObj.value, json)
//   if (json.list.length) {
//     widgetFormSelect.value = json.list[0]
//   }
// }

// const clear = () => handleClearable()

</script>

<template>
  <div class="el-design-form__wrapper">
    <el-container class="el-design-form__container">
      <el-main class="el-design-form__main">
        <el-aside
          class="widget-form__container"
          width="250px"
        >
          <div class="components">
            <FormGroup
              key="basic"
              title="基础组件"
              :fields="props.basicFields"
              :list="basicComponents"
            />
            <FormGroup
              key="advanced"
              title="高级组件"
              :fields="props.advancedFields"
              :list="advanceComponents"
            />
            <FormGroup
              key="layout"
              title="布局组件"
              :fields="props.layoutFields"
              :list="layoutComponents"
            />
          </div>
        </el-aside>
        <el-main class="widget-design__container">
          <ElCustomHeader
            v-bind="$props"
            @preview="() => (previewVisible = true)"
            @uploadJson="() => (uploadJsonVisible = true)"
            @generateJson="handleGenerateJson"
            @generateCode="handleGenerateCode"
            @clearable="handleClearable"
          >
            <slot name="header" />
          </ElCustomHeader>
          <el-main :class="{ 'widget-empty': widgetFormObj.list.length === 0 }">
            <ElWidgetForm
              ref="widgetFormRef"
              v-model:widgetForm="widgetFormObj"
              v-model:widgetFormSelect="widgetFormSelect"
            />
          </el-main>
        </el-main>
        <el-aside
          class="widget-config__container"
          width="300px"
        >
          <el-container>
            <el-header>
              <div
                class="config-tab"
                :class="{ active: configTab === 'widget' }"
                @click="configTab = 'widget'"
              >
                字段属性
              </div>
              <div
                class="config-tab"
                :class="{ active: configTab === 'form' }"
                @click="configTab = 'form'"
              >
                表单属性
              </div>
            </el-header>
            <el-main class="config-content">
              <ElWidgetConfig
                v-show="configTab === 'widget'"
                v-model:select="widgetFormSelect"
              />
              <ElFormConfig
                v-show="configTab === 'form'"
                v-model:config="widgetFormObj.config"
              />
            </el-main>
          </el-container>
        </el-aside>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="" scoped>

</style>
