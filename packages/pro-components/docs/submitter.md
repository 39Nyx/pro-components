# 提交按钮配置

ProForm 提供灵活的提交按钮配置，支持自定义渲染。

## 基础配置

### 显示/隐藏按钮

```vue
<!-- 显示提交和重置按钮 -->
<ProForm :show-submit-button="true" :show-reset-button="true" />

<!-- 只显示提交按钮 -->
<ProForm :show-submit-button="true" :show-reset-button="false" />

<!-- 隐藏所有按钮 -->
<ProForm :show-submit-button="false" :show-reset-button="false" />
```

### 按钮文本

```vue
<ProForm submit-button-text="保存" reset-button-text="取消">
  <!-- 表单项 -->
</ProForm>
```

### 按钮位置

```vue
<ProForm :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
  <!-- 按钮会跟随布局 -->
</ProForm>
```

---

## submitter 属性

### 对象配置

```vue
<ProForm
  :submitter="{
    submitText: '保存',
    resetText: '取消',
    showSubmit: true,
    showReset: true,
  }"
>
  <!-- 表单项 -->
</ProForm>
```

### 完全隐藏

```vue
<ProForm :submitter="false">
  <!-- 表单项 -->
</ProForm>
```

---

## 自定义渲染

### 使用插槽

```vue
<ProForm>
  <!-- 表单项 -->
  
  <template #actions="{ submit, reset, loading }">
    <Button type="primary" :loading="loading" @click="submit">
      提交
    </Button>
    <Button @click="reset">重置</Button>
    <Button type="link" @click="handleCancel">取消</Button>
  </template>
</ProForm>
```

### 使用 render 函数

```vue
<ProForm
  :submitter="{
    render: (props) => {
      return [
        h(
          Button,
          {
            type: 'primary',
            loading: props.loading,
            onClick: props.submit,
          },
          () => '提交',
        ),
        h(
          Button,
          {
            onClick: props.reset,
          },
          () => '重置',
        ),
      ];
    },
  }"
>
  <!-- 表单项 -->
</ProForm>
```

---

## ProFormSubmitter 组件

单独使用提交按钮组件。

```vue
<script setup>
import { ProFormSubmitter } from '@vben/pro-components';

const handleSubmit = () => {
  console.log('提交');
};

const handleReset = () => {
  console.log('重置');
};
</script>

<template>
  <ProFormSubmitter
    submit-text="保存"
    reset-text="取消"
    :loading="loading"
    @submit="handleSubmit"
    @reset="handleReset"
  >
    <template #default="{ submit, reset, loading }">
      <Button type="primary" :loading="loading" @click="submit"> 保存 </Button>
      <Button @click="reset">取消</Button>
      <Button type="link" @click="handlePreview">预览</Button>
    </template>
  </ProFormSubmitter>
</template>
```

---

## 完整示例

### 带确认对话框

```vue
<script setup>
import { Modal } from 'ant-design-vue';

const formRef = ref();

const handleSubmit = async () => {
  Modal.confirm({
    title: '确认提交？',
    content: '提交后将无法修改',
    onOk: async () => {
      const values = await formRef.value?.validateFields();
      await saveData(values);
    },
  });
};
</script>

<template>
  <ProForm ref="formRef">
    <!-- 表单项 -->

    <template #actions>
      <Button type="primary" @click="handleSubmit"> 提交 </Button>
      <Button @click="formRef?.resetFields()"> 重置 </Button>
    </template>
  </ProForm>
</template>
```

### 条件按钮

```vue
<template>
  <ProForm>
    <!-- 表单项 -->

    <template #actions>
      <!-- 新增时显示 -->
      <template v-if="!editMode">
        <Button type="primary" @click="handleCreate"> 创建 </Button>
      </template>

      <!-- 编辑时显示 -->
      <template v-else>
        <Button type="primary" @click="handleUpdate"> 更新 </Button>
        <Button danger @click="handleDelete"> 删除 </Button>
      </template>

      <Button @click="handleCancel">取消</Button>
    </template>
  </ProForm>
</template>
```

### 多步骤表单按钮

```vue
<template>
  <ProForm>
    <!-- 当前步骤表单项 -->

    <template #actions>
      <!-- 第一步不显示上一步 -->
      <Button v-if="currentStep > 0" @click="prevStep"> 上一步 </Button>

      <!-- 最后一步显示提交 -->
      <Button
        v-if="currentStep < totalSteps - 1"
        type="primary"
        @click="nextStep"
      >
        下一步
      </Button>
      <Button v-else type="primary" @click="handleSubmit"> 提交 </Button>
    </template>
  </ProForm>
</template>
```

---

## API

### submitter 属性

| 属性       | 说明           | 类型                 | 默认值   |
| ---------- | -------------- | -------------------- | -------- |
| submitText | 提交按钮文本   | `string`             | `'提交'` |
| resetText  | 重置按钮文本   | `string`             | `'重置'` |
| showSubmit | 显示提交按钮   | `boolean`            | `true`   |
| showReset  | 显示重置按钮   | `boolean`            | `true`   |
| render     | 自定义渲染函数 | `(props) => VNode[]` | -        |

### submitter 插槽

| 插槽    | 说明           | 参数                         |
| ------- | -------------- | ---------------------------- |
| actions | 自定义按钮区域 | `{ submit, reset, loading }` |
