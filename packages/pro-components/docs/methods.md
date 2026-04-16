# 表单操作方法

ProForm 提供丰富的表单操作方法，通过 `formRef` 访问。

## 获取表单实例

```vue
<script setup>
import { ref } from 'vue';

const formRef = ref();

// 在任意方法中使用
const handleSubmit = () => {
  const values = formRef.value?.getFieldsValue();
  console.log(values);
};
</script>

<ProForm ref="formRef">
  <!-- 表单项 -->
</ProForm>
```

## 实例方法列表

### submit()

手动提交表单。

```ts
await formRef.value?.submit();
```

### resetFields()

重置表单为初始值。

```ts
formRef.value?.resetFields();
```

### setFieldsValue()

设置表单字段值。

```ts
// 设置单个字段
formRef.value?.setFieldsValue({
  username: 'newUser',
});

// 设置多个字段
formRef.value?.setFieldsValue({
  username: 'newUser',
  email: 'new@example.com',
  status: 1,
});
```

### getFieldValue()

获取单个字段值。

```ts
const username = formRef.value?.getFieldValue('username');
console.log(username); // 'admin'
```

### getFieldsValue()

获取所有字段值。

```ts
const values = formRef.value?.getFieldsValue();
console.log(values);
// { username: 'admin', email: 'admin@example.com', status: 1 }
```

### getFieldsFormatValue()

获取格式化后的字段值（应用 transform）。

```ts
const formattedValues = formRef.value?.getFieldsFormatValue();
console.log(formattedValues);
// 已应用 transform 转换的数据
```

### validateFields()

校验表单字段。

```ts
try {
  const values = await formRef.value?.validateFields();
  console.log('校验通过:', values);
} catch (errorInfo) {
  console.log('校验失败:', errorInfo);
}

// 校验指定字段
try {
  const values = await formRef.value?.validateFields(['username', 'email']);
} catch (errorInfo) {
  console.log('指定字段校验失败:', errorInfo);
}
```

### setFieldError()

设置字段错误信息。

```ts
formRef.value?.setFieldError('username', '用户名已存在');
```

### clearValidate()

清除校验状态。

```ts
// 清除全部
formRef.value?.clearValidate();

// 清除指定字段
formRef.value?.clearValidate(['username', 'email']);
```

---

## 完整示例

```vue
<script setup lang="ts">
import type { ProFormInstance } from '@vben/pro-components';
import { ref } from 'vue';

const formRef = ref<ProFormInstance>();

// 表单数据
const formData = ref({
  username: '',
  email: '',
  status: 1,
});

// 加载数据
const loadData = async () => {
  const res = await fetch('/api/user/1');
  const data = await res.json();

  // 填充表单
  formRef.value?.setFieldsValue(data);
};

// 提交表单
const handleSubmit = async () => {
  try {
    const values = await formRef.value?.validateFields();

    const res = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    console.log('提交成功');
  } catch (errorInfo) {
    console.log('校验失败:', errorInfo);
  }
};

// 重置表单
const handleReset = () => {
  formRef.value?.resetFields();
};
</script>

<template>
  <div>
    <div class="actions">
      <button @click="loadData">加载数据</button>
      <button @click="handleSubmit">提交</button>
      <button @click="handleReset">重置</button>
    </div>

    <ProForm ref="formRef" v-model="formData">
      <ProFormText name="username" label="用户名" required />
      <ProFormText name="email" label="邮箱" required />
      <ProFormSelect name="status" label="状态" />
    </ProForm>
  </div>
</template>
```

---

## ProFormInstance 类型定义

```ts
interface ProFormInstance {
  /**
   * 提交表单
   */
  submit: () => Promise<void>;

  /**
   * 重置表单
   */
  resetFields: () => void;

  /**
   * 设置字段值
   */
  setFieldsValue: (values: Record<string, any>) => void;

  /**
   * 获取单个字段值
   */
  getFieldValue: (name: string) => any;

  /**
   * 获取所有字段值
   */
  getFieldsValue: () => Record<string, any>;

  /**
   * 获取格式化后的值
   */
  getFieldsFormatValue: () => Record<string, any>;

  /**
   * 校验表单
   */
  validateFields: (nameList?: string[]) => Promise<Record<string, any>>;

  /**
   * 设置字段错误
   */
  setFieldError: (name: string, error: string) => void;

  /**
   * 清除校验状态
   */
  clearValidate: (nameList?: string[]) => void;
}
```
