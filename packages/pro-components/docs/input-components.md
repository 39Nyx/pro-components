# 表单输入组件

ProForm 提供丰富的表单输入组件，每个组件都是 FormItem + 输入控件的组合。

## 组件原理

```ts
// ProFormText 本质上是 FormItem + Input 的封装
const ProFormText = (props) => {
  return (
    <ProForm.Item {...props}>
      <Input placeholder={props.placeholder} {...props.fieldProps} />
    </ProForm.Item>
  );
};
```

## 通用属性

所有表单输入组件都支持以下通用属性：

| 属性 | 说明 | 类型 |
|------|------|------|
| name | 字段名 | `string \| string[]` |
| label | 标签文本 | `string` |
| rules | 校验规则 | `Rule[]` |
| required | 是否必填 | `boolean` |
| disabled | 是否禁用 | `boolean` |
| readonly | 是否只读 | `boolean` |
| hidden | 是否隐藏 | `boolean` |
| width | 组件宽度 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string \| number` |
| placeholder | 占位文本 | `string` |
| tooltip | 提示信息 | `string` |
| initialValue | 默认值 | `any` |
| fieldProps | 传递给底层组件的属性 | `object` |
| transform | 提交时数据转换 | `(value) => Record<string, any>` |
| convertValue | 获取时数据转换 | `(value) => any` |

## 输入组件列表

### ProFormText

文本输入框，用于输入各类文本。

```vue
<ProFormText
  name="username"
  label="用户名"
  placeholder="请输入用户名"
  required
  :rules="[
    { required: true, message: '请输入用户名' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符' },
  ]"
/>
```

---

### ProFormTextArea

多行文本输入框。

```vue
<ProFormTextArea
  name="description"
  label="描述"
  placeholder="请输入描述"
  :rows="4"
  :maxlength="200"
  show-count
/>
```

**特有属性：**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| rows | 行数 | `number` | `4` |
| maxlength | 最大长度 | `number` | - |
| showCount | 显示字数 | `boolean` | `false` |

---

### ProFormDigit

数字输入框，自带格式化（默认保留2位小数）。

```vue
<ProFormDigit
  name="amount"
  label="金额"
  :min="0"
  :max="999999"
  :precision="2"
/>
```

**特有属性：**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| precision | 小数精度 | `number` | `2` |
| step | 步长 | `number` | `1` |

---

### ProFormSelect

下拉选择框，支持 `request` 和 `valueEnum` 生成选项。

```vue
<!-- 静态选项 -->
<ProFormSelect
  name="status"
  label="状态"
  :options="[
    { label: '启用', value: 1 },
    { label: '禁用', value: 0 },
  ]"
/>

<!-- 远程选项 -->
<ProFormSelect
  name="userId"
  label="用户"
  :request="fetchUserOptions"
  :debounce-time="300"
/>

<!-- 枚举选项 -->
<ProFormSelect
  name="type"
  label="类型"
  :value-enum="{
    A: { text: '类型A', status: 'Success' },
    B: { text: '类型B', status: 'Error' },
  }"
/>
```

**特有属性：**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表 | `Option[]` | - |
| request | 远程请求 | `() => Promise<Option[]>` | - |
| valueEnum | 枚举值 | `Record<string, any>` | - |
| mode | 模式 | `'single' \| 'multiple' \| 'tags'` | `'single'` |
| showSearch | 支持搜索 | `boolean` | `false` |
| debounceTime | 防抖时间 | `number` | `0` |

---

### ProFormTreeSelect

树形选择器。

```vue
<ProFormTreeSelect
  name="department"
  label="部门"
  :tree-data="departmentTree"
  :field-names="{ label: 'name', value: 'id', children: 'children' }"
  tree-checkable
/>
```

**特有属性：**

| 属性 | 说明 | 类型 |
|------|------|------|
| treeData | 树形数据 | `TreeNode[]` |
| treeCheckable | 多选 | `boolean` |
| showSearch | 支持搜索 | `boolean` |
| fieldNames | 字段映射 | `object` |

---

### ProFormCaptcha

验证码输入组件，配合发送验证码接口使用。

```vue
<ProFormCaptcha
  name="captcha"
  label="验证码"
  :phone-name="'phone'"
  :on-get-captcha="sendCaptcha"
  :count-down="60"
/>
```

**特有属性：**

| 属性 | 说明 | 类型 |
|------|------|------|
| onGetCaptcha | 获取验证码回调 | `() => Promise<void>` |
| phoneName | 手机号字段名 | `string` |
| countDown | 倒计时秒数 | `number` |

---

### ProFormDatePicker

日期选择器。

```vue
<ProFormDatePicker
  name="birthday"
  label="出生日期"
  format="YYYY-MM-DD"
  value-format="YYYY-MM-DD"
/>
```

---

### ProFormDateRangePicker

日期范围选择器。

```vue
<ProFormDateRangePicker
  name="dateRange"
  label="日期范围"
  format="YYYY-MM-DD"
/>
```

---

### ProFormDateTimePicker

日期时间选择器。

```vue
<ProFormDateTimePicker
  name="createdAt"
  label="创建时间"
  format="YYYY-MM-DD HH:mm:ss"
  show-time
/>
```

---

### ProFormTimePicker

时间选择器。

```vue
<ProFormTimePicker
  name="time"
  label="时间"
  format="HH:mm:ss"
/>
```

---

### ProFormRadio

单选框组。

```vue
<ProFormRadio
  name="gender"
  label="性别"
  :options="[
    { label: '男', value: 1 },
    { label: '女', value: 2 },
  ]"
/>
```

---

### ProFormCheckbox

复选框组。

```vue
<ProFormCheckbox
  name="hobbies"
  label="爱好"
  :options="hobbyOptions"
/>
```

---

### ProFormSwitch

开关组件。

```vue
<ProFormSwitch
  name="enabled"
  label="是否启用"
  checked-children="开"
  un-checked-children="关"
/>
```

---

### ProFormSlider

滑动条。

```vue
<ProFormSlider
  name="volume"
  label="音量"
  :min="0"
  :max="100"
/>
```

---

### ProFormRate

评分组件。

```vue
<ProFormRate
  name="rating"
  label="评分"
  :count="5"
  allow-half
/>
```

---

### ProFormUpload

文件上传组件。

```vue
<ProFormUpload
  name="avatar"
  label="头像"
  list-type="picture-card"
  :max-count="1"
  :action="uploadUrl"
/>
```

**特有属性：**

| 属性 | 说明 | 类型 |
|------|------|------|
| action | 上传地址 | `string` |
| listType | 列表类型 | `'text' \| 'picture' \| 'picture-card'` |
| maxCount | 最大数量 | `number` |
| accept | 接受文件类型 | `string` |

## 宽度预设值

| 值 | 像素 | 适用场景 |
|----|------|----------|
| `xs` | 104px | 短字段，如 ID、状态 |
| `sm` | 216px | 较短字段，如姓名、电话 |
| `md` | 328px | 标准宽度，大部分场景 |
| `lg` | 440px | 较长字段，如网址、标签组 |
| `xl` | 552px | 长字段 |
| `2xl` | 664px | 超长字段 |
