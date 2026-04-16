# 事件回调

ProForm 提供多种事件回调，用于处理表单生命周期。

## 事件列表

### onFinish

表单提交成功回调。

```vue
<script setup>
const handleSubmit = async (values) => {
  console.log('表单值:', values);

  // 调用 API
  await saveData(values);

  // 返回 false 阻止默认行为
  // return false;
};
</script>

<ProForm @finish="handleSubmit">
  <!-- 表单项 -->
</ProForm>
```

**参数：**

| 参数   | 类型                  | 说明       |
| ------ | --------------------- | ---------- |
| values | `Record<string, any>` | 表单字段值 |

**返回值：**

- `void` 或 `Promise<void>` - 正常处理
- `false` - 阻止后续操作

---

### onValuesChange

表单值变化回调。

```vue
<script setup>
const handleValuesChange = (changedValues, allValues) => {
  console.log('变化的字段:', changedValues);
  console.log('全部字段:', allValues);

  // 根据变化字段处理逻辑
  if ('province' in changedValues) {
    loadCities(changedValues.province);
  }
};
</script>

<ProForm @values-change="handleValuesChange">
  <!-- 表单项 -->
</ProForm>
```

**参数：**

| 参数          | 类型                  | 说明         |
| ------------- | --------------------- | ------------ |
| changedValues | `Record<string, any>` | 变化的字段值 |
| allValues     | `Record<string, any>` | 全部表单值   |

---

### onReset

表单重置回调。

```vue
<script setup>
const handleReset = () => {
  console.log('表单已重置');

  // 清除相关状态
  state.value = {};
};
</script>

<ProForm @reset="handleReset">
  <!-- 表单项 -->
</ProForm>
```

---

### onFieldsChange

字段状态变化回调。

```vue
<script setup>
const handleFieldsChange = (changedFields, allFields) => {
  console.log('变化的字段:', changedFields);
  console.log('全部字段:', allFields);
};
</script>

<ProForm @fields-change="handleFieldsChange">
  <!-- 表单项 -->
</ProForm>
```

**参数：**

| 参数          | 类型          | 说明       |
| ------------- | ------------- | ---------- |
| changedFields | `FieldData[]` | 变化的字段 |
| allFields     | `FieldData[]` | 全部字段   |

**FieldData 结构：**

```ts
interface FieldData {
  name: string | string[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}
```

---

### onFinishFailed

表单提交失败回调（校验失败）。

```vue
<script setup>
const handleFinishFailed = (errorInfo) => {
  console.log('校验失败:', errorInfo);

  // 滚动到第一个错误字段
  const firstError = errorInfo.errorFields[0];
  scrollToField(firstError.name);
};
</script>

<ProForm @finish-failed="handleFinishFailed">
  <!-- 表单项 -->
</ProForm>
```

**参数：**

| 参数      | 类型                  | 说明     |
| --------- | --------------------- | -------- |
| errorInfo | `ValidateErrorEntity` | 错误信息 |

**ValidateErrorEntity 结构：**

```ts
interface ValidateErrorEntity {
  values: Record<string, any>;
  errorFields: { name: string; errors: string[] }[];
  outOfDate: boolean;
}
```

---

## 完整示例

```vue
<script setup>
import { ref } from 'vue';

const formRef = ref();
const loading = ref(false);

// 表单提交
const handleFinish = async (values) => {
  loading.value = true;

  try {
    await saveUser(values);
    message.success('保存成功');
  } catch (error) {
    message.error('保存失败');
  } finally {
    loading.value = false;
  }
};

// 值变化
const handleValuesChange = (changedValues, allValues) => {
  // 自动计算
  if ('price' in changedValues || 'quantity' in changedValues) {
    const { price = 0, quantity = 0 } = allValues;
    formRef.value?.setFieldsValue({
      total: price * quantity,
    });
  }
};

// 校验失败
const handleFinishFailed = (errorInfo) => {
  console.log('表单校验失败:', errorInfo);
  message.error('请检查表单填写是否正确');
};

// 重置
const handleReset = () => {
  console.log('表单已重置');
};
</script>

<template>
  <ProForm
    ref="formRef"
    :loading="loading"
    @finish="handleFinish"
    @values-change="handleValuesChange"
    @finish-failed="handleFinishFailed"
    @reset="handleReset"
  >
    <ProFormText name="name" label="名称" required />
    <ProFormDigit name="price" label="单价" :min="0" />
    <ProFormDigit name="quantity" label="数量" :min="1" />
    <ProFormDigit name="total" label="总计" readonly />
  </ProForm>
</template>
```

---

## 事件触发顺序

```
用户操作
    │
    ▼
onValuesChange (字段值变化)
    │
    ▼
用户点击提交
    │
    ├─ 校验成功 ──► onFinish
    │
    └─ 校验失败 ──► onFinishFailed
    │
    ▼
用户点击重置
    │
    ▼
onReset
```

---

## 事件对比

| 事件             | 触发时机       | 用途         |
| ---------------- | -------------- | ------------ |
| `onFinish`       | 提交校验成功后 | 处理表单提交 |
| `onValuesChange` | 字段值变化时   | 联动、计算   |
| `onFieldsChange` | 字段状态变化时 | 监听字段状态 |
| `onFinishFailed` | 提交校验失败时 | 错误处理     |
| `onReset`        | 表单重置后     | 清理相关状态 |
