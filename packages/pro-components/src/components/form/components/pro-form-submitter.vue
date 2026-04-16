<script setup lang="ts">
/**
 * ProFormSubmitter 提交按钮组件
 * 用于自定义表单提交区域
 */

interface Props {
  loading?: boolean;
  resetText?: string;
  showReset?: boolean;
  showSubmit?: boolean;
  submitText?: string;
}

const _props = withDefaults(defineProps<Props>(), {
  showSubmit: true,
  showReset: true,
  submitText: '提交',
  resetText: '重置',
  loading: false,
});

const emit = defineEmits<{
  reset: [];
  submit: [];
}>();

const handleSubmit = () => {
  emit('submit');
};

const handleReset = () => {
  emit('reset');
};
</script>

<template>
  <div class="pro-form-submitter">
    <slot :loading="loading" :submit="handleSubmit" :reset="handleReset">
      <button
        v-if="showSubmit"
        type="button"
        :disabled="loading"
        class="pro-form-submit-btn"
        @click="handleSubmit"
      >
        {{ loading ? '提交中...' : submitText }}
      </button>
      <button
        v-if="showReset"
        type="button"
        class="pro-form-reset-btn"
        @click="handleReset"
      >
        {{ resetText }}
      </button>
    </slot>
  </div>
</template>

<style scoped>
.pro-form-submitter {
  display: flex;
  gap: 8px;
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

.pro-form-submit-btn:hover:not(:disabled) {
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
