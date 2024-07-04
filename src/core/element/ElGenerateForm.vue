<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { widgetForm } from '@/config/component'
import ElGenerateFormItem from './ElGenerateFormItem.vue'

/** props */
const props = defineProps({
  data: {
    type: Object,
    default: widgetForm
  },
  value: {
    type: Object,
    default: () => ({})
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

/** expose */
defineExpose({ getData, reset })

/** constant */
const formRef = ref<FormInstance | null>(null)
const model = ref<any>({})
const rules = ref<any>({})
const widgetFormObj = ref((props.data && JSON.parse(JSON.stringify(props.data))) ?? JSON.parse(JSON.stringify(widgetForm)))

/** watch */
watch(() => props.data, val => {
  widgetFormObj.value = (val && JSON.parse(JSON.stringify(val)))
  model.value = {}
  rules.value = {}
  generateModel(widgetFormObj.value.list)
  generateOptions(widgetFormObj.value.list)
  reset()
}, { immediate: true, deep: true })

/** methods */
function generateModel (list: any[]) {
  for (let index = 0; index < list.length; index++) {
    const id = list[index].model
    if (!id) return

    if (list[index].type === 'grid') {
      list[index].columns.forEach((col: any) => generateModel(col.list))
    } else {
      if (props.value && Object.keys(props.value).includes(id)) {
        model.value[id] = props.value[id]
      } else {
        model.value[id] = list[index].options.defaultValue ?? ''
      }

      if (list[index].options.rules) {
        rules.value[id] = JSON.parse(JSON.stringify(list[index].options.rules))
      }

      if (rules.value[id]?.enum) {
        // eslint-disable-next-line no-eval
        rules.value[id].enum = eval(rules.value[id].enum)
      }

      if (rules.value[id]?.pattern) {
        // eslint-disable-next-line no-eval
        rules.value[id].pattern = eval(rules.value[id].pattern)
        rules.value[id].type = 'string'
      }
    }
  }
}

function generateOptions (list: any[]) {
  list.forEach(item => {
    if (item.type === 'grid') {
      item.columns.forEach((col: any) => generateOptions(col.list))
    } else {
      if (item.options.remote && item.options.remoteFunc) {
        fetch(item.options.remoteFunc)
          .then(res => res.json())
          .then(json => {
            if (json instanceof Array) {
              item.options.remoteOptions = json.map(data => ({
                label: data[item.options.props.label],
                value: data[item.options.props.value],
                children: data[item.options.props.children]
              }))
            }
          })
      }
    }
  })
}

function reset () {
  nextTick(() => {
    formRef.value?.resetFields()
  })
}

// eslint-disable-next-line
function getData () {
  return new Promise((resolve, reject) => {
    formRef.value?.validate().then((validator: boolean) => {
      if (validator) {
        resolve(model.value)
      } else {
        // eslint-disable-next-line no-undef
        ElMessage.error('验证失败')
      }
    })
      .catch((error: Error) => {
        reject(error)
      })
  })
}

/** hooks */
onMounted(() => {
  generateModel(widgetFormObj.value?.list ?? [])
  generateOptions(widgetFormObj.value?.list ?? [])
  reset()
})
</script>

<template>
  <div class="el-design__form">
    <el-form
      ref="formRef"
      label-suffix=":"
      :model="model"
      :rules="rules"
      :size="widgetFormObj.config.size"
      :label-position="widgetFormObj.config.labelPosition"
      :label-width="`${widgetFormObj.config.labelWidth}px`"
      :hide-required-asterisk="widgetFormObj.config.hideRequiredAsterisk"
    >
      <template v-for="(element, index) of widgetFormObj.list">
        <template v-if="element.type === 'grid'">
          <el-row
            type="flex"
            v-if="element.key"
            :key="element.key"
            :gutter="element.options.gutter ?? 0"
            :justify="element.options.justify"
            :align="element.options.align"
          >
            <el-col
              v-for="(col, colIndex) of element.columns"
              :key="colIndex"
              :span="col.span ?? 0"
            >
              <ElGenerateFormItem
                v-for="colItem of col.list"
                :model="model"
                :key="colItem.key"
                :element="colItem"
                :config="data.config"
                :disabled="disabled"
              />
            </el-col>
          </el-row>
        </template>
        <ElGenerateFormItem
          v-else
          :model="model"
          :key="element.key"
          :element="widgetFormObj.list[index]"
          :config="data.config"
          :disabled="disabled"
        />
      </template>
    </el-form>
  </div>
</template>
