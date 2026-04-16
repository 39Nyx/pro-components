<script setup lang="ts">
/**
 * ProFormGroup 表单分组组件
 * 用于对表单项进行分组
 */
import type { CSSProperties } from 'vue';

import { computed } from 'vue';

interface Props {
  /**
   * 是否显示边框
   */
  bordered?: boolean;

  /**
   * 栅格间距
   */
  gutter?: [number, number] | number;

  /**
   * 分组标题
   */
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bordered: false,
  gutter: 16,
  title: '',
});

// 计算 gutter 样式
const gutterStyle = computed<CSSProperties>(() => {
  if (Array.isArray(props.gutter)) {
    return {
      rowGap: `${props.gutter[0]}px`,
      columnGap: `${props.gutter[1]}px`,
    };
  }
  return { gap: `${props.gutter}px` };
});
</script>

<template>
  <div class="pro-form-group" :class="{ 'pro-form-group--bordered': bordered }">
    <div v-if="title" class="pro-form-group__title">
      {{ title }}
    </div>
    <div class="pro-form-group__content" :style="gutterStyle">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.pro-form-group {
  width: 100%;
}

.pro-form-group--bordered {
  padding: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.pro-form-group__title {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 500;
  color: rgb(0 0 0 / 88%);
}

.pro-form-group__content {
  display: flex;
  flex-wrap: wrap;
}
</style>
