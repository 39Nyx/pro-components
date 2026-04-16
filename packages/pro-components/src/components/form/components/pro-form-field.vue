<script setup lang="ts">
/**
 * ProFormField 表单字段组件
 * 用于渲染单个表单项
 */
import type { ProFormFieldProps } from '../types';

import { computed } from 'vue';

const props = defineProps<ProFormFieldProps>();

// 计算字段宽度样式
const widthStyle = computed(() => {
  if (!props.width) return {};

  const widthMap: Record<string, string> = {
    xs: '104px',
    sm: '216px',
    md: '328px',
    lg: '440px',
    xl: '552px',
    '2xl': '664px',
  };

  const width = widthMap[props.width as string] || props.width;
  return { width: typeof width === 'number' ? `${width}px` : width };
});
</script>

<template>
  <div class="pro-form-field" :style="widthStyle">
    <slot>
      <!-- 默认插槽内容 -->
    </slot>
  </div>
</template>

<style scoped>
.pro-form-field {
  flex: 1;
  max-width: 100%;
}
</style>
