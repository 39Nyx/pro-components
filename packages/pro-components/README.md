# @vben/pro-components

用于多个 `app` 公用的高级业务组件库。该库封装了常用的业务组件，提供开箱即用的高级组件能力。

## 用法

### 添加依赖

```bash
# 进入目标应用目录，例如 apps/xxxx-app
# cd apps/xxxx-app
pnpm add @vben/pro-components
```

### 使用

```vue
<script setup lang="ts">
import { ProTable } from '@vben/pro-components';
</script>

<template>
  <ProTable />
</template>
```

## 组件列表

- ProTable - 高级表格组件
- ProForm - 高级表单组件
- 更多组件开发中...
