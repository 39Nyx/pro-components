# 数据管理功能

ProForm 提供完善的数据管理能力，包括默认值设置、数据转换和表单联动。

## 默认值设置

### 表单级默认值

使用 `initialValues` 设置整个表单的默认值。

```vue
<ProForm
  :initial-values="{
    username: 'admin',
    email: 'admin@example.com',
    status: 1,
  }"
>
  <ProFormText name="username" label="用户名" />
  <ProFormText name="email" label="邮箱" />
  <ProFormSelect name="status" label="状态" />
</ProForm>
```

### 字段级默认值

使用 `initialValue` 设置单个字段的默认值。

```vue
<ProForm>
  <ProFormText name="username" label="用户名" initial-value="guest" />
  <ProFormSelect 
    name="status" 
    label="状态" 
    :initial-value="1"
    :options="statusOptions"
  />
  <ProFormSwitch name="enabled" label="启用" :initial-value="true" />
</ProForm>
```

### 动态设置值

通过 `formRef` 动态设置表单值。

```vue
<script setup>
const formRef = ref();

// 设置单个字段
formRef.value?.setFieldsValue({
  username: 'newUser',
});

// 设置多个字段
formRef.value?.setFieldsValue({
  username: 'newUser',
  email: 'new@example.com',
});
</script>

<ProForm ref="formRef">
  <!-- 表单项 -->
</ProForm>
```

## 数据转换

### transform（提交时转换）

`transform` 在表单提交时触发，用于将表单数据转换为后端需要的格式。

```vue
<ProForm @finish="handleSubmit">
  <!-- 将日期范围拆分为开始和结束时间 -->
  <ProFormDateRangePicker
    name="dateRange"
    label="日期范围"
    :transform="(value) => ({
      startTime: value[0],
      endTime: value[1],
    })"
  />
  
  <!-- 将数组转换为逗号分隔的字符串 -->
  <ProFormSelect
    name="tags"
    label="标签"
    mode="multiple"
    :transform="(value) => ({ tags: value.join(',') })"
  />
</ProForm>
```

### convertValue（获取时转换）

`convertValue` 在组件获取数据时触发，用于将后端数据转换为组件需要的格式。

```vue
<ProForm :initial-values="formData">
  <!-- 将逗号分隔的字符串转换为数组 -->
  <ProFormSelect
    name="tags"
    label="标签"
    mode="multiple"
    :convert-value="(value) => value?.split(',') || []"
  />
  
  <!-- 将开始和结束时间合并为日期范围 -->
  <ProFormDateRangePicker
    name="dateRange"
    label="日期范围"
    :convert-value="(_, values) => [
      values.startTime,
      values.endTime,
    ]"
  />
</ProForm>
```

### 完整示例

```vue
<script setup>
const formData = {
  // 后端数据格式
  startTime: '2024-01-01',
  endTime: '2024-12-31',
  tags: 'vue,react,angular',
};

const handleSubmit = (values) => {
  // 提交时数据格式
  console.log(values);
  // {
  //   startTime: '2024-01-01',
  //   endTime: '2024-12-31',
  //   tags: 'vue,react,angular',
  // }
};
</script>

<template>
  <ProForm :initial-values="formData" @finish="handleSubmit">
    <ProFormDateRangePicker
      name="dateRange"
      label="日期范围"
      :convert-value="(_, values) => [values.startTime, values.endTime]"
      :transform="(value) => ({
        startTime: value[0],
        endTime: value[1],
      })"
    />
    
    <ProFormSelect
      name="tags"
      label="标签"
      mode="multiple"
      :convert-value="(value) => value?.split(',') || []"
      :transform="(value) => ({ tags: value.join(',') })"
    />
  </ProForm>
</template>
```

## 表单联动

### ProFormDependency

`ProFormDependency` 组件用于实现表单字段之间的联动。

**基础用法：**

```vue
<ProForm>
  <ProFormText name="name" label="名称" />
  
  <ProFormDependency name="name">
    <template #default="{ name }">
      <ProFormSelect
        name="useMode"
        :label="`与《${name}》合同约定生效方式`"
        :options="[
          { value: 'chapter', label: '盖章后生效' },
          { value: 'sign', label: '签字后生效' },
        ]"
      />
    </template>
  </ProFormDependency>
</ProForm>
```

**多字段依赖：**

```vue
<ProForm>
  <ProFormText name="firstName" label="姓" />
  <ProFormText name="lastName" label="名" />
  
  <ProFormDependency :name="['firstName', 'lastName']">
    <template #default="{ firstName, lastName }">
      <ProFormText
        name="fullName"
        label="全名"
        :initial-value="`${firstName}${lastName}`"
        readonly
      />
    </template>
  </ProFormDependency>
</ProForm>
```

**嵌套字段依赖：**

```vue
<ProFormDependency :name="['user', ['address', 'city']]">
  <template #default="{ user, address }">
    <!-- user = values.user -->
    <!-- address = { city: values.address.city } -->
  </template>
</ProFormDependency>
```

### onValuesChange

使用 `onValuesChange` 监听值变化并实现联动逻辑。

```vue
<script setup>
const handleValuesChange = (changedValues, allValues) => {
  // changedValues: 变化的字段
  // allValues: 全部表单值
  
  if ('province' in changedValues) {
    // 省份变化时，重置城市
    formRef.value?.setFieldsValue({
      city: undefined,
      district: undefined,
    });
    // 重新加载城市列表
    loadCities(changedValues.province);
  }
};
</script>

<ProForm @values-change="handleValuesChange">
  <ProFormSelect name="province" label="省份" :options="provinces" />
  <ProFormSelect name="city" label="城市" :options="cities" />
  <ProFormSelect name="district" label="区县" :options="districts" />
</ProForm>
```

### 条件显示

根据其他字段值决定是否显示某字段。

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
  
  <ProFormDependency name="type">
    <template #default="{ type }">
      <template v-if="type === 'personal'">
        <ProFormText name="idCard" label="身份证号" />
      </template>
      <template v-else-if="type === 'company'">
        <ProFormText name="companyName" label="公司名称" />
        <ProFormText name="creditCode" label="统一社会信用代码" />
      </template>
    </template>
  </ProFormDependency>
</ProForm>
```

## 数据获取

### 获取表单值

```vue
<script setup>
const formRef = ref();

// 获取所有值
const values = formRef.value?.getFieldsValue();

// 获取单个字段值
const username = formRef.value?.getFieldValue('username');

// 获取格式化后的值（应用 transform）
const formattedValues = formRef.value?.getFieldsFormatValue();
</script>
```

### 表单数据流

```
┌─────────────────────────────────────────────────────────┐
│                      ProForm                            │
│                                                         │
│  initialValues ──────────────────────────────────────► │
│       │                    表单内部状态                  │
│       │                    (formState)                  │
│       ▼                         │                       │
│  ┌─────────┐                   │                       │
│  │ 字段组件 │◄──────────────────┘                       │
│  │         │                                             │
│  │convertValue◄── 后端数据格式                           │
│  │    │                                                 │
│  │    ▼                                                 │
│  │ 组件所需格式                                          │
│  └─────────┘                                             │
│       │                                                 │
│       │ 用户输入                                         │
│       ▼                                                 │
│  ┌─────────┐                                             │
│  │transform│──► 提交数据格式 ──► onFinish               │
│  └─────────┘                                             │
└─────────────────────────────────────────────────────────┘
```
