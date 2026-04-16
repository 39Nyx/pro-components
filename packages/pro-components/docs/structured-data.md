# 结构化数据录入

ProForm 提供组件支持录入结构化的复杂数据。

## ProFormList

`ProFormList` 用于录入多维数组数据，自带操作按钮（删除、复制、新增）。

### 基础用法

```vue
<ProForm>
  <ProFormList name="users" label="用户列表">
    <template #default="{ item, index }">
      <ProFormText :name="[index, 'name']" label="姓名" />
      <ProFormText :name="[index, 'email']" label="邮箱" />
      <ProFormSelect :name="[index, 'role']" label="角色" :options="roles" />
    </template>
  </ProFormList>
</ProForm>
```

### 属性

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | 字段名 | `string` | - |
| label | 标签文本 | `string` | - |
| initialValue | 默认值 | `ListItem[]` | - |
| min | 最小数量 | `number` | - |
| max | 最大数量 | `number` | - |
| addButtonText | 新增按钮文本 | `string` | `'添加一项'` |
| showCopyButton | 显示复制按钮 | `boolean` | `true` |

### 操作按钮

ProFormList 默认提供以下操作：

- **新增** - 添加一行新数据
- **删除** - 删除当前行
- **复制** - 复制当前行到下一行

### 通过 actionRef 操作

```vue
<script setup>
const actionRef = ref();

// 新增一行
actionRef.value?.add({ name: '新用户' });

// 在指定位置新增
actionRef.value?.add({ name: '新用户' }, 2);

// 删除指定行
actionRef.value?.remove(1);

// 移动行
actionRef.value?.move(1, 3);

// 获取指定行数据
const row = actionRef.value?.get(1);

// 获取所有数据
const list = actionRef.value?.getList();
</script>

<ProFormList ref="actionRef" name="items">
  <template #default="{ item, index }">
    <!-- 表单项 -->
  </template>
</ProFormList>
```

### 操作拦截 (actionGuard)

可以在操作前后进行拦截处理。

```vue
<script setup>
const actionGuard = {
  // 新增前拦截
  beforeAddRow: async (defaultValue, insertIndex, count) => {
    console.log('新增前:', defaultValue, insertIndex, count);
    // 返回 false 阻止新增
    return true;
  },
  
  // 删除前拦截
  beforeRemoveRow: async (index, count) => {
    console.log('删除前:', index, count);
    // 返回 false 阻止删除
    return true;
  },
};
</script>

<ProFormList :action-guard="actionGuard" name="items">
  <!-- 表单项 -->
</ProFormList>
```

### 完整示例

```vue
<template>
  <ProForm @finish="handleSubmit">
    <ProFormList
      ref="listRef"
      name="contacts"
      label="联系方式"
      :min="1"
      :max="5"
      add-button-text="添加联系方式"
    >
      <template #default="{ item, index }">
        <div class="contact-item">
          <ProFormSelect
            :name="[index, 'type']"
            label="类型"
            :options="[
              { label: '手机', value: 'phone' },
              { label: '邮箱', value: 'email' },
              { label: '地址', value: 'address' },
            ]"
          />
          <ProFormText :name="[index, 'value']" label="值" />
          <ProFormSwitch :name="[index, 'primary']" label="主要" />
        </div>
      </template>
    </ProFormList>
  </ProForm>
</template>

<script setup>
const handleSubmit = (values) => {
  console.log('表单数据:', values);
  // {
  //   contacts: [
  //     { type: 'phone', value: '138xxxx', primary: true },
  //     { type: 'email', value: 'xxx@xx.com', primary: false },
  //   ]
  // }
};
</script>
```

---

## ProFormFieldSet

`ProFormFieldSet` 用于录入一维数组数据，将多个子字段的值组合存储。

### 基础用法

```vue
<ProForm>
  <ProFormFieldSet name="name" label="姓名">
    <ProFormText placeholder="姓" />
    <ProFormText placeholder="名" />
  </ProFormFieldSet>
  
  <!-- 提交数据: { name: ['张', '三'] } -->
</ProForm>
```

### 类型

#### group 类型

使用 Input.Group 包裹子元素。

```vue
<ProFormFieldSet name="name" label="姓名" type="group">
  <ProFormText placeholder="姓" />
  <ProFormText placeholder="名" />
</ProFormFieldSet>
```

#### space 类型（默认）

使用 Space 包裹子元素。

```vue
<ProFormFieldSet name="name" label="姓名" type="space">
  <ProFormText placeholder="姓" />
  <ProFormText placeholder="名" />
</ProFormFieldSet>
```

### 数据转换

使用 `transform` 将数组转换为对象。

```vue
<ProFormFieldSet
  name="dateRange"
  label="日期范围"
  :transform="(value) => ({
    startDate: value[0],
    endDate: value[1],
  })"
>
  <ProFormDatePicker placeholder="开始日期" />
  <ProFormDatePicker placeholder="结束日期" />
</ProFormFieldSet>

<!-- 提交数据: { startDate: '2024-01-01', endDate: '2024-12-31' } -->
```

### 常见场景

#### 姓名输入

```vue
<ProFormFieldSet name="fullName" label="姓名">
  <ProFormText placeholder="姓" width="sm" />
  <ProFormText placeholder="名" width="sm" />
</ProFormFieldSet>
```

#### 电话区号 + 号码

```vue
<ProFormFieldSet name="phone" label="电话">
  <ProFormSelect
    :options="countryCodes"
    placeholder="区号"
    width="xs"
  />
  <ProFormText placeholder="电话号码" />
</ProFormFieldSet>
```

#### 时间范围

```vue
<ProFormFieldSet
  name="timeRange"
  label="时间范围"
  :transform="(value) => ({
    startTime: value[0],
    endTime: value[1],
  })"
>
  <ProFormTimePicker placeholder="开始时间" />
  <ProFormTimePicker placeholder="结束时间" />
</ProFormFieldSet>
```

#### 价格区间

```vue
<ProFormFieldSet name="priceRange" label="价格区间">
  <ProFormDigit placeholder="最低价" :min="0" />
  <span>-</span>
  <ProFormDigit placeholder="最高价" :min="0" />
</ProFormFieldSet>
```

---

## 对比

| 特性 | ProFormList | ProFormFieldSet |
|------|-------------|-----------------|
| 数据结构 | 多维数组 | 一维数组 |
| 动态数量 | 支持 | 固定 |
| 操作按钮 | 自带增删复制 | 无 |
| 适用场景 | 动态列表录入 | 固定组合字段 |
| 数据格式 | `[{}, {}, ...]` | `[value1, value2, ...]` |

---

## 嵌套使用

ProFormList 和 ProFormFieldSet 可以嵌套使用。

```vue
<ProForm>
  <ProFormList name="departments" label="部门">
    <template #default="{ item: dept, index: deptIndex }">
      <ProFormText :name="[deptIndex, 'name']" label="部门名称" />
      
      <!-- 嵌套 ProFormList -->
      <ProFormList :name="[deptIndex, 'members']" label="成员">
        <template #default="{ item: member, index: memberIndex }">
          <ProFormText :name="[memberIndex, 'name']" label="姓名" />
          <ProFormText :name="[memberIndex, 'position']" label="职位" />
        </template>
      </ProFormList>
    </template>
  </ProFormList>
</ProForm>

<!-- 提交数据结构:
{
  departments: [
    {
      name: '研发部',
      members: [
        { name: '张三', position: '工程师' },
        { name: '李四', position: '经理' },
      ]
    },
    // ...
  ]
}
-->
```
