# 核心表单组件

ProForm 提供多种表单容器组件，覆盖不同的业务场景需求。

## 组件列表

### ProForm

基础高级表单组件，是其他表单组件的基础。

**功能特点：**

- 支持多种布局方式
- 支持栅格化布局
- 内置提交/重置按钮
- 支持表单验证

**基础用法：**

```vue
<ProForm :layout="'horizontal'" :grid="true" @finish="handleSubmit">
  <!-- 表单项 -->
</ProForm>
```

**API：**

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| grid | 开启栅格化布局 | `boolean` | `false` |
| labelCol | 标签栅格布局 | `{ span: number; offset?: number }` | - |
| wrapperCol | 控件栅格布局 | `{ span: number; offset?: number }` | - |
| fields | 表单字段配置 | `ProFormFieldProps[]` | - |
| onFinish | 表单提交回调 | `(values) => Promise<void \| boolean>` | - |
| onValuesChange | 值变化回调 | `(changedValues, values) => void` | - |
| showSubmitButton | 是否显示提交按钮 | `boolean` | `true` |
| showResetButton | 是否显示重置按钮 | `boolean` | `true` |

---

### ModalForm

弹窗表单组件，整合 Modal + ProForm。

**适用场景：**

- 新增/编辑数据的弹窗表单
- 需要用户确认的操作表单

**基础用法：**

```vue
<ModalForm v-model:visible="visible" title="新建用户" @finish="handleSubmit">
  <ProFormText name="username" label="用户名" required />
</ModalForm>
```

**API：**

| 属性           | 说明         | 类型               | 默认值  |
| -------------- | ------------ | ------------------ | ------- |
| visible        | 是否显示弹窗 | `boolean`          | `false` |
| title          | 弹窗标题     | `string`           | -       |
| width          | 弹窗宽度     | `number \| string` | `520`   |
| destroyOnClose | 关闭时销毁   | `boolean`          | `true`  |
| maskClosable   | 点击遮罩关闭 | `boolean`          | `true`  |

---

### DrawerForm

抽屉表单组件，整合 Drawer + ProForm。

**适用场景：**

- 侧边滑出的表单
- 需要更大空间的表单

**基础用法：**

```vue
<DrawerForm
  v-model:visible="visible"
  title="编辑信息"
  width="600"
  @finish="handleSubmit"
>
  <!-- 表单项 -->
</DrawerForm>
```

**API：**

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示抽屉 | `boolean` | `false` |
| title | 抽屉标题 | `string` | - |
| width | 抽屉宽度 | `number \| string` | `378` |
| placement | 抽屉方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |

---

### QueryFilter

查询筛选表单，用于搜索区域。

**功能特点：**

- 自动折叠/展开
- 查询/重置按钮内置
- 响应式布局

**适用场景：**

- 列表页顶部搜索区
- 数据筛选面板

**基础用法：**

```vue
<QueryFilter :collapsed="collapsed" @finish="handleSearch" @reset="handleReset">
  <ProFormText name="keyword" label="关键词" />
  <ProFormSelect name="status" label="状态" :options="statusOptions" />
  <ProFormDatePicker name="createTime" label="创建时间" />
</QueryFilter>
```

---

### LightFilter

轻量级筛选表单，占用空间更小。

**功能特点：**

- 紧凑布局
- 筛选项少时使用
- 内联展示

**适用场景：**

- 简单筛选场景
- 空间受限的筛选区

---

### StepsForm

分步表单组件，用于多步骤表单场景。

**功能特点：**

- 分步骤展示表单
- 步骤间数据缓存
- 支持步骤跳转

**适用场景：**

- 注册流程
- 复杂信息录入
- 向导式表单

**基础用法：**

```vue
<StepsForm :current="current" @finish="handleSubmit">
  <StepsForm.StepForm title="基本信息">
    <ProFormText name="name" label="姓名" />
  </StepsForm.StepForm>
  
  <StepsForm.StepForm title="联系方式">
    <ProFormText name="phone" label="电话" />
  </StepsForm.StepForm>
  
  <StepsForm.StepForm title="完成">
    <!-- 确认信息 -->
  </StepsForm.StepForm>
</StepsForm>
```

**API：**

| 属性     | 说明         | 类型                        | 默认值 |
| -------- | ------------ | --------------------------- | ------ |
| current  | 当前步骤     | `number`                    | `0`    |
| steps    | 步骤配置     | `StepConfig[]`              | -      |
| onFinish | 全部完成回调 | `(values) => Promise<void>` | -      |
