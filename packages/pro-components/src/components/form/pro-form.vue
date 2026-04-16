<script setup lang="ts">
/**
 * ProForm 主组件
 * 基于 VbenForm 封装的高级表单组件
 */
import type { ProFormInstance, ProFormProps } from './types';

import { ref, toRaw, useTemplateRef } from 'vue';

import { useVbenForm } from '@vben-core/form-ui';

// 定义组件属性
const props = withDefaults(defineProps<ProFormProps>(), {
  layout: 'horizontal',
  size: 'middle',
  grid: false,
  showSubmitButton: true,
  showResetButton: true,
  submitButtonText: '提交',
  resetButtonText: '重置',
});

// 定义事件
const emit = defineEmits<{
  finish: [values: Record<string, any>];
  reset: [];
  valuesChange: [
    changedValues: Record<string, any>,
    values: Record<string, any>,
  ];
}>();

// 表单引用
const formRef = useTemplateRef('formRef');

// 加载状态
const loading = ref(false);

// 使用 VbenForm
const [_register, form] = useVbenForm({
  ...props,
  onValuesChange: (
    changedValues: Record<string, any>,
    values: Record<string, any>,
  ) => {
    emit('valuesChange', changedValues, values);
  },
});

/**
 * 提交表单
 */
const handleSubmit = async () => {
  try {
    loading.value = true;
    const values = await form.validate();
    emit('finish', values);
    await props.onFinish?.(values);
  } catch (error) {
    console.error('Form validation failed:', error);
  } finally {
    loading.value = false;
  }
};

/**
 * 重置表单
 */
const handleReset = () => {
  form.resetFields();
  emit('reset');
};

// 暴露实例方法
defineExpose<ProFormInstance>({
  submit: handleSubmit,
  resetFields: handleReset,
  setFieldsValue: (values) => form.setFieldsValue(values),
  getFieldValue: (name) => toRaw(form.getFieldValue?.(name)),
  getFieldsValue: () => toRaw(form.getFieldsValue?.() ?? {}),
  getFieldsFormatValue: () => toRaw(form.getFieldsValue?.() ?? {}),
  validateFields: () => form.validate(),
  setFieldError: (_name, _error) => {
    // 设置字段错误
    console.warn('setFieldError is not implemented yet');
  },
});
</script>

<template>
  <div class="pro-form">
    <form ref="formRef" @submit.prevent="handleSubmit">
      <slot></slot>

      <!-- 提交按钮区域 -->
      <div v-if="showSubmitButton || showResetButton" class="pro-form-actions">
        <slot name="actions">
          <button
            v-if="showSubmitButton"
            type="submit"
            :disabled="loading"
            class="pro-form-submit-btn"
          >
            {{ submitButtonText }}
          </button>
          <button
            v-if="showResetButton"
            type="button"
            @click="handleReset"
            class="pro-form-reset-btn"
          >
            {{ resetButtonText }}
          </button>
        </slot>
      </div>
    </form>
  </div>
</template>

<style scoped>
.pro-form {
  width: 100%;
}

.pro-form-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.pro-form-submit-btn,
.pro-form-reset-btn {
  padding: 4px 15px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 6px;
}

.pro-form-submit-btn {
  color: #fff;
  background-color: #1890ff;
  border: 1px solid #1890ff;
}

.pro-form-submit-btn:hover {
  background-color: #40a9ff;
}

.pro-form-submit-btn:disabled {
  cursor: not-allowed;
  background-color: #d9d9d9;
  border-color: #d9d9d9;
}

.pro-form-reset-btn {
  color: rgb(0 0 0 / 88%);
  background-color: #fff;
  border: 1px solid #d9d9d9;
}

.pro-form-reset-btn:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}
</style>
