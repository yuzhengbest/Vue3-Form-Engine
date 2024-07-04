<script setup lang="ts">
import { ref, PropType, watch } from 'vue'
import { defaultsDeep } from 'lodash'
import { copy } from '@/utils/common'
import { CodeType } from '@/types'
import generateCode from '@/utils/generateCode'
import { basicComponents, advanceComponents, layoutComponents, widgetForm } from '@/config/component'
import FormGroup from '@/components/FormGroup/index.vue'
import ElCustomHeader from './ElCustomHeader.vue'
import ElWidgetForm from './ElWidgetForm.vue'
import ElFormConfig from './ElFormConfig.vue'
import ElWidgetConfig from './ElWidgetConfig.vue'
import ElGenerateForm from './ElGenerateForm.vue'
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
    default: false
  },
  generateJson: {
    type: Boolean,
    default: false
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
// const generateCodeVisible = ref<boolean>(false)

const configTab = ref<string>('widget')
const dataJsonTemplate = ref<string>('')
const dataCodeTemplate = ref<string | undefined>('')
const codeLanguage = ref<string>(CodeType.Vue)
const widgetFormSelect = ref(undefined)
const generateFormRef = ref(null)

// const codeType = reactive({ Vue: 'vue', Html: 'html' })
const widgetFormObj = ref(JSON.parse(JSON.stringify(widgetForm)))
const generateJsonTemplate = ref(JSON.stringify(widgetForm, null, 2))
const jsonEg = ref(JSON.stringify(widgetForm, null, 2))

/** 监听 */
watch(dataCodeVisible, (val) => {
  if (val) {
    dataCodeTemplate.value = generateCode(widgetFormObj.value, codeLanguage.value)
  }
})

/** methods 定义 */
function handleUplaodJson () {
  try {
    widgetFormObj.value.list = []
    defaultsDeep(widgetFormObj, JSON.parse(jsonEg.value))

    if (widgetFormObj.value.list.length) {
      widgetFormSelect.value = widgetFormObj.value.list[0]
    }

    uploadJsonVisible.value = false
    // eslint-disable-next-line no-undef
    ElMessage.success('上传成功')
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line no-undef
    ElMessage.error('上传失败')
  }
}

function handleCopyClick (text: string) {
  copy(text)
  // eslint-disable-next-line no-undef
  ElMessage.success('复制成功')
}

async function handleGetData () {
  const res = generateFormRef.value?.getData()
  dataJsonTemplate.value = JSON.stringify(res, null, 2)
  dataJsonVisible.value = true
}

function handleGenerateJson () {
  (generateJsonTemplate.value = JSON.stringify(widgetFormObj.value, null, 2)) && (generateJsonVisible.value = true)
}

function handleGenerateCode () {
  codeLanguage.value = 'vue'
  dataCodeVisible.value = true
}

function handleClearable () {
  widgetFormObj.value.list = []
  defaultsDeep(widgetFormObj.value, JSON.parse(JSON.stringify(widgetForm)))
  widgetFormSelect.value = undefined
}

function handleReset () {
  generateFormRef.value?.reset()
}

// function getJson () {
//   return widgetFormObj.value
// }

// function setJson (json: WidgetForm) {
//   widgetFormObj.value.list = []
//   defaultsDeep(widgetFormObj.value, json)
//   if (json.list.length) {
//     widgetFormSelect.value = json.list[0]
//   }
// }

// const clear = () => handleClearable()

</script>

<template>
  <div class="fc-style">
    <el-container class="fc-container">
      <el-main class="fc-main">
        <el-container>
          <el-aside
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
          <el-main class="center-container">
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
            class="widget-config-container"
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
        </el-container>
      </el-main>
    </el-container>

    <!-- 导入JSON -->
    <el-dialog
      v-model="uploadJsonVisible"
      title="导入JSON"
      :width="800"
    >
      <el-alert
        type="info"
        title="JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可"
        style="margin-bottom: 10px"
      />
      <CodeEditor
        v-model:value="jsonEg"
        language="json"
      />
      <template #footer>
        <el-button @click="() => (uploadJsonVisible = false)">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleUplaodJson"
        >
          导入
        </el-button>
      </template>
    </el-dialog>

    <!-- 预览表单 -->
    <el-dialog
      v-model="previewVisible"
      title="预览"
      :width="800"
    >
      <ElGenerateForm
        ref="generateFormRef"
        v-if="previewVisible"
        :data="widgetFormObj"
      />
      <template #footer>
        <el-button @click="handleReset">
          重置
        </el-button>
        <el-button
          type="primary"
          @click="handleGetData"
        >
          获取数据
        </el-button>
      </template>
      <el-dialog
        v-model="dataJsonVisible"
        title="获取数据"
        :width="800"
      >
        <CodeEditor
          :value="dataJsonTemplate"
          language="json"
          readonly
        />

        <template #footer>
          <el-button
            @click="() => (dataJsonVisible = false)"
          >
            取消
          </el-button>
          <el-button
            type="primary"
            @click="handleCopyClick(dataJsonTemplate)"
          >
            复制
          </el-button>
        </template>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<style lang="" scoped>

</style>
