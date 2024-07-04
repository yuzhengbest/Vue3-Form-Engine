# Vue3 Form Engine

 - 左侧组件配置
  + FormGroup中的list和fields

 - 中间表单设计
  + ElWidgetForm中的widgetFormObj和widgetFormSelect
  + widgetFormObj属性中包含了本次表单设计的所有表单及每一表单的配置
  + widgetFormSelect绑定了当前活动表单（当前被选中的表单）

- 左侧组件模块拖入中间表单设计模块，借助第三方库vuedraggable
  + FormGroup组件中vuedraggable中属性：group="{ name: 'people', pull: 'clone', put: false }"
  + ElWidgetForm组件中vuedraggable中属性：:group="{ name: 'people' }"
  + group中的name属性值保持一致，两个组件组件间可以相互拖动，其中再设置pull: 'clone', put: false，可以使左侧组件拖入中间设计区域

- 右侧属性配置
  + ElWidgetConfig: 字段属性，绑定属性值widgetFormSelect
  + ElFormConfig: 表单属性，绑定值widgetFormObj.config，此值为所有表单的公用配置

- 表单渲染
  + ElGenerateForm, 绑定属性值widgetFormObj


- 全局状态共享变量
  + widgetFormObj
  + widgetFormSelect = widgetFormObj.list[index], widgetFormSelect和widgetFormObj.list[index]之间存在的是引用关系

- 数据持久化存储
  + 配置完表单后，可绑定当前设计用户并保存
  + 调用时，根据保存后的id，调用该id对应的表单设计，并渲染