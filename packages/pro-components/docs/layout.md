# 布局功能

ProForm 提供灵活的布局配置，支持多种布局方式。

## 布局类型

### horizontal（水平布局）

标签与控件水平排列，标签在左侧。

```vue
<ProForm layout="horizontal">
  <!-- 表单项 -->
</ProForm>
```

**效果：**

```
用户名    [输入框]
邮箱      [输入框]
状态      [下拉框]
```

---

### vertical（垂直布局）

标签与控件垂直排列，标签在上方。

```vue
<ProForm layout="vertical">
  <!-- 表单项 -->
</ProForm>
```

**效果：**

```
用户名
[输入框]

邮箱
[输入框]

状态
[下拉框]
```

---

### inline（行内布局）

表单项行内排列，适合搜索栏。

```vue
<ProForm layout="inline">
  <ProFormText name="keyword" placeholder="关键词" />
  <ProFormSelect name="status" placeholder="状态" />
</ProForm>
```

**效果：**

```
[关键词] [状态] [查询] [重置]
```

## 栅格布局

### 基础栅格

开启 `grid` 后，可以使用 `colProps` 控制每个表单项的宽度。

```vue
<ProForm :grid="true" :row-props="{ gutter: 16 }">
  <ProFormText
    name="field1"
    label="字段1"
    :col-props="{ span: 12 }"
  />
  <ProFormText
    name="field2"
    label="字段2"
    :col-props="{ span: 12 }"
  />
  <ProFormText
    name="field3"
    label="字段3"
    :col-props="{ span: 8 }"
  />
  <ProFormText
    name="field4"
    label="字段4"
    :col-props="{ span: 8 }"
  />
  <ProFormText
    name="field5"
    label="字段5"
    :col-props="{ span: 8 }"
  />
</ProForm>
```

### 响应式栅格

```vue
<ProFormText
  name="field"
  label="字段"
  :col-props="{
    xs: 24, // < 576px
    sm: 12, // >= 576px
    md: 8, // >= 768px
    lg: 6, // >= 992px
    xl: 4, // >= 1200px
  }"
/>
```

## 栅格属性

### rowProps

传递给 Row 组件的属性。

| 属性    | 说明         | 类型                                  | 默认值    |
| ------- | ------------ | ------------------------------------- | --------- |
| gutter  | 栅格间隔     | `number \| [number, number]`          | `0`       |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| ...` | `'start'` |
| align   | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom'`       | `'top'`   |
| wrap    | 是否换行     | `boolean`                             | `true`    |

### colProps

控制单个表单项的栅格属性。

| 属性   | 说明                 | 类型               | 默认值 |
| ------ | -------------------- | ------------------ | ------ |
| span   | 占位格数             | `number`           | `24`   |
| offset | 左侧偏移格数         | `number`           | `0`    |
| push   | 向右移动格数         | `number`           | `0`    |
| pull   | 向左移动格数         | `number`           | `0`    |
| xs     | < 576px 响应式栅格   | `number \| object` | -      |
| sm     | >= 576px 响应式栅格  | `number \| object` | -      |
| md     | >= 768px 响应式栅格  | `number \| object` | -      |
| lg     | >= 992px 响应式栅格  | `number \| object` | -      |
| xl     | >= 1200px 响应式栅格 | `number \| object` | -      |
| xxl    | >= 1600px 响应式栅格 | `number \| object` | -      |

## 标签布局

### labelCol / wrapperCol

控制标签和控件的比例。

```vue
<ProForm :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
  <ProFormText name="field" label="字段" />
</ProForm>
```

### 栅格系统

24 栅格系统，常用比例配置：

| 场景 | labelCol      | wrapperCol     |
| ---- | ------------- | -------------- |
| 紧凑 | `{ span: 4 }` | `{ span: 20 }` |
| 标准 | `{ span: 6 }` | `{ span: 18 }` |
| 宽松 | `{ span: 8 }` | `{ span: 16 }` |

## 分组布局

### ProFormGroup

对表单项进行分组展示。

```vue
<ProForm>
  <ProFormGroup title="基本信息" bordered>
    <ProFormText name="name" label="姓名" />
    <ProFormText name="phone" label="电话" />
  </ProFormGroup>
  
  <ProFormGroup title="其他信息" bordered>
    <ProFormTextArea name="remark" label="备注" />
  </ProFormGroup>
</ProForm>
```

**属性：**

| 属性     | 说明         | 类型                         |
| -------- | ------------ | ---------------------------- |
| title    | 分组标题     | `string`                     |
| bordered | 是否显示边框 | `boolean`                    |
| gutter   | 栅格间距     | `number \| [number, number]` |

## 布局最佳实践

### 搜索表单

```vue
<!-- 使用 inline 布局 -->
<ProForm layout="inline" :show-submit-button="false">
  <ProFormText name="keyword" placeholder="关键词" />
  <ProFormSelect name="status" placeholder="状态" />
  <Button type="primary" @click="handleSearch">查询</Button>
</ProForm>
```

### 编辑表单

```vue
<!-- 使用 horizontal + grid 布局 -->
<ProForm layout="horizontal" :grid="true" :row-props="{ gutter: 24 }">
  <ProFormText name="name" label="姓名" :col-props="{ span: 12 }" />
  <ProFormText name="phone" label="电话" :col-props="{ span: 12 }" />
  <ProFormTextArea name="address" label="地址" :col-props="{ span: 24 }" />
</ProForm>
```

### 详情表单

```vue
<!-- 使用 vertical 布局展示详情 -->
<ProForm layout="vertical" :show-submit-button="false">
  <ProFormText name="name" label="姓名" readonly />
  <ProFormText name="email" label="邮箱" readonly />
</ProForm>
```
