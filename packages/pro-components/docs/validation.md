# 表单验证

ProForm 提供完善的表单验证能力，支持内置规则和自定义校验。

## 内置校验规则

### required - 必填

```vue
<ProFormText name="username" label="用户名" required message="请输入用户名" />
```

或使用 `rules`：

```vue
<ProFormText
  name="username"
  label="用户名"
  :rules="[{ required: true, message: '请输入用户名' }]"
/>
```

### type - 类型校验

```vue
<ProFormText
  name="email"
  label="邮箱"
  :rules="[{ type: 'email', message: '请输入正确的邮箱格式' }]"
/>
```

支持的类型：

- `string` - 字符串
- `number` - 数字
- `boolean` - 布尔值
- `url` - URL
- `email` - 邮箱
- `date` - 日期
- `array` - 数组
- `object` - 对象

### min / max - 长度/范围

```vue
<!-- 字符串长度 -->
<ProFormText
  name="password"
  label="密码"
  :rules="[
    { min: 6, message: '密码长度不能少于6位' },
    { max: 20, message: '密码长度不能超过20位' },
  ]"
/>

<!-- 数字范围 -->
<ProFormDigit
  name="age"
  label="年龄"
  :rules="[{ type: 'number', min: 0, max: 150, message: '请输入有效年龄' }]"
/>
```

### len - 精确长度

```vue
<ProFormText
  name="phone"
  label="手机号"
  :rules="[{ len: 11, message: '请输入11位手机号' }]"
/>
```

### pattern - 正则表达式

```vue
<ProFormText
  name="phone"
  label="手机号"
  :rules="[
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入正确的手机号',
    },
  ]"
/>
```

### whitespace - 空格检测

```vue
<ProFormText
  name="name"
  label="姓名"
  :rules="[
    {
      required: true,
      whitespace: true,
      message: '不能只输入空格',
    },
  ]"
/>
```

### enum - 枚举值

```vue
<ProFormText
  name="gender"
  label="性别"
  :rules="[
    {
      type: 'enum',
      enum: ['male', 'female'],
      message: '请选择正确的性别',
    },
  ]"
/>
```

---

## 自定义校验

### validator 函数

```vue
<script setup>
const checkPassword = async (rule, value) => {
  if (!value) {
    return Promise.reject('请输入密码');
  }
  if (value.length < 6) {
    return Promise.reject('密码长度不能少于6位');
  }
  if (!/[A-Z]/.test(value)) {
    return Promise.reject('密码必须包含大写字母');
  }
  if (!/[0-9]/.test(value)) {
    return Promise.reject('密码必须包含数字');
  }
  return Promise.resolve();
};
</script>

<ProFormText
  name="password"
  label="密码"
  :rules="[{ validator: checkPassword }]"
/>
```

### 异步校验

```vue
<script setup>
const checkUsername = async (rule, value) => {
  if (!value) {
    return Promise.reject('请输入用户名');
  }

  // 异步检查用户名是否已存在
  const res = await fetch(`/api/users/check?username=${value}`);
  const data = await res.json();

  if (data.exists) {
    return Promise.reject('用户名已存在');
  }

  return Promise.resolve();
};
</script>

<ProFormText
  name="username"
  label="用户名"
  :rules="[{ validator: checkUsername }]"
/>
```

### 触发时机

```vue
<ProFormText
  name="username"
  label="用户名"
  :rules="[
    {
      required: true,
      trigger: 'blur', // 失焦时触发
      message: '请输入用户名',
    },
  ]"
/>
```

支持触发时机：

- `blur` - 失焦时
- `change` - 值变化时
- `['blur', 'change']` - 两者都触发

---

## 校验状态

### validateStatus

手动设置校验状态。

```vue
<ProFormText
  name="username"
  label="用户名"
  validate-status="error"
  help="用户名已存在"
/>
```

状态值：

- `success` - 成功
- `warning` - 警告
- `error` - 错误
- `validating` - 校验中

### hasFeedback

显示校验反馈图标。

```vue
<ProFormText name="username" label="用户名" has-feedback />
```

---

## 表单级校验

### 手动校验

```vue
<script setup>
const formRef = ref();

const handleSubmit = async () => {
  try {
    // 校验全部字段
    const values = await formRef.value?.validateFields();
    console.log('校验通过:', values);
  } catch (errorInfo) {
    console.log('校验失败:', errorInfo);
  }
};

// 校验指定字段
const validateField = async (name) => {
  try {
    await formRef.value?.validateFields([name]);
    console.log('字段校验通过');
  } catch (errorInfo) {
    console.log('字段校验失败:', errorInfo);
  }
};
</script>

<ProForm ref="formRef">
  <!-- 表单项 -->
</ProForm>
```

### 清除校验

```vue
<script setup>
const formRef = ref();

// 清除全部校验
formRef.value?.clearValidate();

// 清除指定字段校验
formRef.value?.clearValidate(['username', 'email']);
</script>
```

---

## 规则配置

### 规则对象

```ts
interface Rule {
  // 规则类型
  type?:
    | 'string'
    | 'number'
    | 'boolean'
    | 'url'
    | 'email'
    | 'date'
    | 'array'
    | 'object'
    | 'enum';

  // 是否必填
  required?: boolean;

  // 提示信息
  message?: string;

  // 最小长度/值
  min?: number;

  // 最大长度/值
  max?: number;

  // 精确长度
  len?: number;

  // 正则表达式
  pattern?: RegExp;

  // 是否校验空格
  whitespace?: boolean;

  // 枚举值
  enum?: any[];

  // 自定义校验函数
  validator?: (rule: any, value: any) => Promise<void>;

  // 触发时机
  trigger?: 'blur' | 'change' | ('blur' | 'change')[];

  // 字段级别触发时机覆盖
  validateTrigger?: 'blur' | 'change' | ('blur' | 'change')[];
}
```

### 多规则组合

```vue
<ProFormText
  name="password"
  label="密码"
  :rules="[
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码长度不能少于6位' },
    { max: 20, message: '密码长度不能超过20位' },
    { pattern: /[A-Z]/, message: '密码必须包含大写字母' },
    { pattern: /[0-9]/, message: '密码必须包含数字' },
  ]"
/>
```

---

## 最佳实践

### 密码强度校验

```vue
<script setup>
const passwordRules = [
  { required: true, message: '请输入密码' },
  { min: 8, message: '密码长度不能少于8位' },
  { pattern: /[a-z]/, message: '密码必须包含小写字母' },
  { pattern: /[A-Z]/, message: '密码必须包含大写字母' },
  { pattern: /[0-9]/, message: '密码必须包含数字' },
  { pattern: /[^a-zA-Z0-9]/, message: '密码必须包含特殊字符' },
];

const validateConfirmPassword = async (rule, value) => {
  const password = formRef.value?.getFieldValue('password');
  if (value !== password) {
    return Promise.reject('两次输入的密码不一致');
  }
  return Promise.resolve();
};
</script>

<ProForm ref="formRef">
  <ProFormText
    name="password"
    label="密码"
    type="password"
    :rules="passwordRules"
    has-feedback
  />
  
  <ProFormText
    name="confirmPassword"
    label="确认密码"
    type="password"
    :rules="[{ validator: validateConfirmPassword }]"
    has-feedback
  />
</ProForm>
```

### 手机号校验

```vue
<script setup>
const phoneRules = [
  { required: true, message: '请输入手机号' },
  { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
];
</script>

<ProFormText name="phone" label="手机号" :rules="phoneRules" />
```

### 身份证校验

```vue
<script setup>
const idCardRules = [
  { required: true, message: '请输入身份证号' },
  { len: 18, message: '身份证号必须是18位' },
  {
    pattern:
      /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dXx]$/,
    message: '请输入正确的身份证号',
  },
];
</script>

<ProFormText name="idCard" label="身份证号" :rules="idCardRules" />
```
