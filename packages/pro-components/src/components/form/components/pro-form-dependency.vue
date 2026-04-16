<script setup lang="ts">
/**
 * ProFormDependency 依赖组件
 * 用于实现表单字段之间的联动
 */
import type { NamePath } from '@vben-core/form-ui';

import { computed, inject } from 'vue';

interface Props {
  /**
   * 依赖的字段名列表
   */
  name: NamePath[];
}

const props = defineProps<Props>();

// 从父级表单获取当前值
// TODO: 实现表单上下文注入
const formValues = inject<Record<string, any>>('formValues', {});

// 获取依赖字段的值
const dependencyValues = computed(() => {
  const values: Record<string, any> = {};

  for (const namePath of props.name) {
    if (Array.isArray(namePath)) {
      // 处理嵌套路径
      let value = formValues;
      for (const key of namePath) {
        value = value?.[key];
      }
      values[namePath.join('.')] = value;
    } else {
      values[namePath as string] = formValues[namePath as string];
    }
  }

  return values;
});
</script>

<template>
  <div class="pro-form-dependency">
    <slot v-bind="dependencyValues"></slot>
  </div>
</template>
