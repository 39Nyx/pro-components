/**
 * ProForm 组合式函数
 * 提供表单的状态管理和操作方法
 */

import type { ProFormInstance, ProFormProps } from '../types';

import { reactive, ref, toRaw, unref } from 'vue';

import { useForm } from '@vben-core/form-ui';

export function useProForm(props: ProFormProps) {
  const formRef = ref<null | ProFormInstance>(null);
  const formState = reactive<Record<string, any>>({});
  const loading = ref(false);

  /**
   * 表单实例
   */
  const [register, form] = useForm({
    ...props,
    onValuesChange: (
      changedValues: Record<string, any>,
      values: Record<string, any>,
    ) => {
      Object.assign(formState, values);
      props.onValuesChange?.(changedValues, values);
    },
  });

  /**
   * 提交表单
   */
  const submit = async () => {
    try {
      loading.value = true;
      const values = await form.validate();
      const result = await props.onFinish?.(values);
      return result;
    } catch (error) {
      console.error('Form validation failed:', error);
      return false;
    } finally {
      loading.value = false;
    }
  };

  /**
   * 重置表单
   */
  const resetFields = () => {
    form.resetFields();
    Object.keys(formState).forEach((key) => {
      formState[key] = undefined;
    });
  };

  /**
   * 设置字段值
   */
  const setFieldsValue = (values: Record<string, any>) => {
    form.setFieldsValue(values);
    Object.assign(formState, values);
  };

  /**
   * 获取字段值
   */
  const getFieldValue = (name: string) => {
    return unref(form.getFieldValue(name));
  };

  /**
   * 获取所有字段值
   */
  const getFieldsValue = () => {
    return toRaw(form.getFieldsValue());
  };

  /**
   * 获取格式化后的值
   */
  const getFieldsFormatValue = () => {
    const values = getFieldsValue();
    // TODO: 应用 transform 转换
    return values;
  };

  /**
   * 校验表单
   */
  const validateFields = async () => {
    return form.validate();
  };

  /**
   * 设置字段错误信息
   */
  const setFieldError = (name: string, error: string) => {
    form.setFieldsValue({
      [name]: {
        errors: [error],
      },
    });
  };

  /**
   * 表单实例方法
   */
  const getInstance = (): ProFormInstance => ({
    submit,
    resetFields,
    setFieldsValue,
    getFieldValue,
    getFieldsValue,
    getFieldsFormatValue,
    validateFields,
    setFieldError,
  });

  return {
    formRef,
    formState,
    loading,
    register,
    submit,
    resetFields,
    setFieldsValue,
    getFieldValue,
    getFieldsValue,
    getFieldsFormatValue,
    validateFields,
    setFieldError,
    getInstance,
  };
}

export type UseProFormReturn = ReturnType<typeof useProForm>;
