<script setup lang="ts">
import VueDraggable from 'vuedraggable'
import { PropType } from 'vue'

/** 属性定义 */
defineProps({
  title: {
    type: String,
    required: true
  },
  fields: {
    type: Array as PropType<Array<string>>,
    required: true
  },
  list: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="form-group__title">
    {{ title }}
  </div>
  <vue-draggable
    tag="ul"
    item-key="type"
    ghost-class="ghost"
    :group="{ name: 'people', pull: 'clone', put: false }"
    :sort="false"
    :list="list"
  >
    <template #item="{ element }">
      <li
        v-if="fields.includes(element.type)"
        class="form-group__item"
        :class="{ 'no-put': element.type === 'divider' }"
      >
        <a>
          <svg-icon :name="element.type" />
          <span>{{ element.label }}</span>
        </a>
      </li>
    </template>
  </vue-draggable>
</template>

<style lang="scss" scoped>

</style>
