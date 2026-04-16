# 远程数据加载

ProForm 提供多种方式加载远程数据，主要用于选择类组件。

## valueEnum

`valueEnum` 用于配置静态枚举选项，支持 Object 和 Map 类型。

### 基础用法

```vue
<ProFormSelect
  name="status"
  label="状态"
  :value-enum="{
    ENABLED: { text: '启用', status: 'Success' },
    DISABLED: { text: '禁用', status: 'Error' },
    PENDING: { text: '待审核', status: 'Warning' },
  }"
/>
```

### 枚举配置

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| text | 显示文本 | `string` |
| value | 选项值（可选，默认使用 key） | `string \| number` |
| status | 状态颜色 | `'Success' \| 'Error' \| 'Warning' \| 'Processing'` |
| disabled | 是否禁用 | `boolean` |

### 使用 Map

```vue
<script setup>
const statusMap = new Map([
  [1, { text: '启用', status: 'Success' }],
  [2, { text: '禁用', status: 'Error' }],
  [3, { text: '待审核', status: 'Warning' }],
]);
</script>

<ProFormSelect name="status" label="状态" :value-enum="statusMap" />
```

---

## request

`request` 用于异步请求远程数据。

### 基础用法

```vue
<script setup>
const fetchUserOptions = async () => {
  const response = await fetch('/api/users');
  const data = await response.json();

  return data.map((user) => ({
    label: user.name,
    value: user.id,
  }));
};
</script>

<ProFormSelect name="userId" label="用户" :request="fetchUserOptions" />
```

### 带参数请求

```vue
<script setup>
const fetchOptions = async (params) => {
  const response = await fetch(`/api/options?type=${params.type}`);
  return response.json();
};
</script>

<ProFormSelect
  name="optionId"
  label="选项"
  :request="fetchOptions"
  :params="{ type: 'category' }"
/>
```

### 参数变化自动重新请求

```vue
<script setup>
const categoryId = ref(1);

// params 变化时自动重新请求
</script>

<ProFormSelect
  name="productId"
  label="产品"
  :request="fetchProducts"
  :params="{ categoryId }"
/>
```

### 防抖搜索

```vue
<script setup>
const searchUsers = async (keyword) => {
  if (!keyword) return [];

  const response = await fetch(`/api/users?keyword=${keyword}`);
  return response.json();
};
</script>

<ProFormSelect
  name="userId"
  label="用户"
  :request="searchUsers"
  :debounce-time="300"
  show-search
/>
```

---

## params

`params` 用于传递额外参数给 `request`。

### 基础用法

```vue
<ProFormSelect
  name="city"
  label="城市"
  :request="fetchCities"
  :params="{ province: '广东省' }"
/>
```

### 响应式参数

```vue
<script setup>
const form = reactive({
  province: '',
  city: '',
});

watch(
  () => form.province,
  () => {
    form.city = ''; // 省份变化时清空城市
  },
);
</script>

<ProForm>
  <ProFormSelect
    name="province"
    label="省份"
    :request="fetchProvinces"
    @change="(val) => form.province = val"
  />
  
  <ProFormSelect
    name="city"
    label="城市"
    :request="fetchCities"
    :params="{ province: form.province }"
  />
</ProForm>
```

---

## dependencies

`dependencies` 用于声明字段依赖关系，依赖字段变化时重新请求数据。

### 基础用法

```vue
<ProFormSelect
  name="city"
  label="城市"
  :request="fetchCities"
  :dependencies="['province']"
/>
```

### 多字段依赖

```vue
<ProFormSelect
  name="district"
  label="区县"
  :request="fetchDistricts"
  :dependencies="['province', 'city']"
/>
```

### 依赖值使用

```vue
<script setup>
const fetchDistricts = async (params, deps) => {
  // deps = { province: '广东省', city: '深圳市' }
  const { province, city } = deps;

  const response = await fetch(
    `/api/districts?province=${province}&city=${city}`,
  );
  return response.json();
};
</script>

<ProFormSelect
  name="district"
  label="区县"
  :request="fetchDistricts"
  :dependencies="['province', 'city']"
/>
```

---

## 完整示例

### 级联选择

```vue
<template>
  <ProForm>
    <ProFormSelect name="province" label="省份" :request="fetchProvinces" />

    <ProFormSelect
      name="city"
      label="城市"
      :request="fetchCities"
      :dependencies="['province']"
    />

    <ProFormSelect
      name="district"
      label="区县"
      :request="fetchDistricts"
      :dependencies="['province', 'city']"
    />
  </ProForm>
</template>

<script setup>
// 省份数据
const fetchProvinces = async () => {
  const res = await fetch('/api/provinces');
  return res.json();
};

// 城市数据 - 依赖省份
const fetchCities = async (_, deps) => {
  if (!deps.province) return [];

  const res = await fetch(`/api/cities?province=${deps.province}`);
  return res.json();
};

// 区县数据 - 依赖省份和城市
const fetchDistricts = async (_, deps) => {
  if (!deps.province || !deps.city) return [];

  const res = await fetch(
    `/api/districts?province=${deps.province}&city=${deps.city}`,
  );
  return res.json();
};
</script>
```

### 搜索选择

```vue
<template>
  <ProFormSelect
    name="userId"
    label="用户"
    :request="searchUsers"
    :debounce-time="500"
    show-search
    :field-props="{
      filterOption: false,
    }"
  />
</template>

<script setup>
const searchUsers = async (params, deps, { keyword }) => {
  if (!keyword || keyword.length < 2) return [];

  const res = await fetch(`/api/users/search?keyword=${keyword}`);
  return res.json();
};
</script>
```

---

## API 总结

| 属性         | 说明         | 类型                           | 默认值 |
| ------------ | ------------ | ------------------------------ | ------ |
| valueEnum    | 枚举配置     | `Record<string, OptionConfig>` | -      |
| request      | 远程请求函数 | `RequestFn`                    | -      |
| params       | 额外参数     | `Record<string, any>`          | -      |
| dependencies | 依赖字段     | `string[]`                     | -      |
| debounceTime | 防抖时间(ms) | `number`                       | `0`    |

### RequestFn 类型

```ts
type RequestFn = (
  params: Record<string, any>,
  dependencies: Record<string, any>,
  context: {
    keyword?: string; // 搜索关键词
    action?: 'init' | 'search' | 'dependency-change';
  },
) => Promise<Option[]>;

interface Option {
  label: string;
  value: string | number;
  disabled?: boolean;
  [key: string]: any;
}
```
