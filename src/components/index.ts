/**
 * src/components 下的组件作为全局注册组件
 */
import SvgIcon from './SvgIcon/index.vue'
import CodeEditor from './CodeEditor/index.vue'
import RichTextEditor from './RichTextEditor/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon, CodeEditor, RichTextEditor }

export default {
  install (app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  }
}
