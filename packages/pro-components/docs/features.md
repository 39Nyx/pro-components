# 其他特性

ProForm 提供一些实用特性，增强表单交互体验。

## readonly（只读模式）

`readonly` 模式与 `disabled` 相比，展示更加友好。

### 字段级只读

```vue
<ProForm>
  <ProFormText name="username" label="用户名" readonly />
  <ProFormSelect name="status" label="状态" readonly />
  <ProFormDatePicker name="createTime" label="创建时间" readonly />
</ProForm>
```

### 表单级只读

```vue
<ProForm readonly>
  <!-- 所有表单项只读 -->
</ProForm>
```

### readonly vs disabled

| 特性 | readonly | disabled |
|------|----------|----------|
| 视觉效果 | 正常显示 | 灰色/禁用样式 |
| 表单提交 | 包含值 | 不包含值 |
| 复制文本 | 支持 | 不支持 |
| Tab 键聚焦 | 支持 | 不支持 |
| 适用场景 | 展示详情 | 禁用编辑 |

---

## disabled（禁用状态）

### 字段级禁用

```vue
<ProForm>
  <ProFormText name="username" label="用户名" disabled />
  <ProFormSelect name="status" label="状态" disabled />
</ProForm>
```

### 表单级禁用

```vue
<ProForm disabled>
  <!-- 所有表单项禁用 -->
</ProForm>
```

### 条件禁用

```vue
<ProForm>
  <ProFormSwitch name="enabled" label="是否启用" />
  
  <ProFormDependency name="enabled">
    <template #default="{ enabled }">
      <ProFormText 
        name="value" 
        label="值" 
        :disabled="!enabled"
      />
    </template>
  </ProFormDependency>
</ProForm>
```

---

## hidden（隐藏字段）

隐藏字段不会被渲染，但值仍会被提交。

```vue
<ProForm>
  <ProFormText name="id" hidden :initial-value="userId" />
  <ProFormText name="username" label="用户名" />
</ProForm>
```

### 条件隐藏

```vue
<ProForm>
  <ProFormRadio
    name="type"
    label="类型"
    :options="[
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'company' },
    ]"
  />
  
  <ProFormText 
    name="companyName" 
    label="公司名称"
    :hidden="type !== 'company'"
  />
</ProForm>
```

---

## allowClear（清除按钮）

允许清除已输入/选择的值。

### 默认行为

大部分输入组件默认支持清除。

```vue
<!-- 默认允许清除 -->
<ProFormText name="username" label="用户名" />
<ProFormSelect name="status" label="状态" />
```

### 禁用清除

```vue
<ProFormText name="username" label="用户名" :allow-clear="false" />
<ProFormSelect name="status" label="状态" :allow-clear="false" />
```

---

## placeholder（占位文本）

ProForm 会自动透传 `placeholder` 到输入组件。

### 默认行为

默认会生成 `placeholder`，如：`请输入用户名`、`请选择状态`。

### 自定义 placeholder

```vue
<ProFormText 
  name="username" 
  label="用户名" 
  placeholder="请输入您的用户名"
/>

<ProFormSelect 
  name="status" 
  label="状态" 
  placeholder="请选择状态"
/>
```

---

## tooltip（提示信息）

字段标签旁显示提示图标，悬停显示提示内容。

```vue
<ProFormText
  name="apiKey"
  label="API Key"
  tooltip="用于接口认证的密钥，请妥善保管"
/>
```

---

## fieldProps（透传属性）

`fieldProps` 用于直接传递属性给底层输入组件。

```vue
<ProFormText
  name="username"
  label="用户名"
  :field-props="{
    maxlength: 20,
    showCount: true,
    allowClear: true,
  }"
/>

<ProFormSelect
  name="status"
  label="状态"
  :field-props="{
    showSearch: true,
    filterOption: filterOption,
  }"
/>
```

---

## 与 Ant Design Form 混用

ProForm 支持与 Ant Design Form.Item 混用。

```vue
<ProForm>
  <!-- ProForm 组件 -->
  <ProFormText name="username" label="用户名" />
  
  <!-- Ant Design 原生组件 -->
  <Form.Item name="custom" label="自定义">
    <CustomComponent />
  </Form.Item>
  
  <!-- 使用 shouldUpdate 实现联动 -->
  <Form.Item noStyle should-update>
    <template #default="{ getFieldValue }">
      <ProFormSelect
        name="useMode"
        :label="`与《${getFieldValue('name')}》合同约定生效方式`"
        :options="options"
      />
    </template>
  </Form.Item>
</ProForm>
```

---

## 表单上下文

通过 `provide/inject` 获取表单上下文。

```vue
<script setup>
import { inject } from 'vue';

// 注入表单上下文
const formContext = inject('proFormContext');

// 获取表单实例
const form = formContext?.form;

// 获取当前值
const values = form?.getFieldsValue();
</script>
```

---

## 特性对比表

| 特性 | 说明 | 提交时 | 视觉效果 |
|------|------|--------|----------|
| `readonly` | 只读模式 | 包含值 | 正常显示 |
| `disabled` | 禁用状态 | 不包含值 | 灰色禁用 |
| `hidden` | 隐藏字段 | 包含值 | 不渲染 |
