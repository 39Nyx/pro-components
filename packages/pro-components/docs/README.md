# ProForm 高级表单组件

基于 Ant Design Pro 的 ProForm 设计理念，为 Vue Vben Admin 提供的高级表单解决方案。

## 概述

ProForm 在原有 Form 基础上增加语法糖和更多布局设置，帮助快速开发表单。同时添加默认行为，让表单默认好用。支持分步表单、Modal 表单、Drawer 表单、查询表单、轻量筛选等多种布局，可覆盖大部分使用场景。

## 核心特性

- 🚀 **开箱即用** - 预设常用表单场景，减少配置
- 📦 **丰富组件** - 支持 20+ 表单输入组件
- 🎨 **灵活布局** - 支持水平/垂直/行内/栅格多种布局
- 🔗 **表单联动** - 内置依赖组件，轻松实现字段联动
- 📡 **远程数据** - 支持 request/valueEnum 远程加载选项
- ✅ **智能验证** - 内置常用验证规则，支持自定义校验
- 🔄 **数据转换** - transform/convertValue 支持前后端数据格式转换

## 文档目录

| 文档 | 说明 |
| --- | --- |
| [核心组件](./core-components.md) | ProForm、ModalForm、DrawerForm 等核心表单组件 |
| [输入组件](./input-components.md) | ProFormText、ProFormSelect 等表单输入组件 |
| [布局功能](./layout.md) | 表单布局配置，栅格化布局 |
| [数据管理](./data-management.md) | 默认值设置、数据转换、表单联动 |
| [结构化数据](./structured-data.md) | ProFormList、ProFormFieldSet 结构化数据录入 |
| [远程数据](./remote-data.md) | request、valueEnum 远程数据加载 |
| [表单验证](./validation.md) | 表单校验规则与自定义验证 |
| [操作方法](./methods.md) | 表单实例方法，提交/重置/获取值等 |
| [事件回调](./events.md) | onFinish、onValuesChange 等事件 |
| [提交按钮](./submitter.md) | 提交按钮配置与自定义渲染 |
| [其他特性](./features.md) | readonly、disabled、hidden 等特性 |
| [实现指南](./implementation-guide.md) | 组件开发优先级与实现建议 |

## 快速开始

### 基础用法

```vue
<script setup lang="ts">
import { ProForm, ProFormText, ProFormSelect } from '@vben/pro-components';

const handleSubmit = async (values) => {
  console.log('表单值:', values);
};
</script>

<template>
  <ProForm @finish="handleSubmit">
    <ProFormText name="username" label="用户名" required />
    <ProFormSelect
      name="status"
      label="状态"
      :options="[
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ]"
    />
  </ProForm>
</template>
```

### 表单联动

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
        ]"
      />
    </template>
  </ProFormDependency>
</ProForm>
```

### 结构化数据

```vue
<ProForm>
  <ProFormList name="users" label="用户列表">
    <template #default="{ item, index }">
      <ProFormText :name="[index, 'name']" label="姓名" />
      <ProFormText :name="[index, 'email']" label="邮箱" />
    </template>
  </ProFormList>
</ProForm>
```

## 与 Ant Design Pro ProForm 的关系

本组件库参考 Ant Design Pro 的 ProForm 设计理念，针对 Vue 生态和 Vben Admin 架构进行了重新设计和实现，保持了核心功能的一致性。

## 相关资源

- [Ant Design Pro Components](https://procomponents.ant.design/)
- [Vben Admin 文档](https://doc.vben.pro/)
