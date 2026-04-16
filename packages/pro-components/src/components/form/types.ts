/**
 * ProForm 类型定义
 */

import type { VbenFormProps, VbenFormSchema } from '@vben-core/form-ui';

/**
 * 表单布局类型
 */
export type FormLayout = 'horizontal' | 'inline' | 'vertical';

/**
 * 表单尺寸
 */
export type FormSize = 'large' | 'middle' | 'small';

/**
 * 表单字段宽度
 */
export type FieldWidth =
  | '2xl'
  | 'lg'
  | 'md'
  | 'sm'
  | 'xl'
  | 'xs'
  | number
  | string;

/**
 * ProForm 字段配置
 * 扩展 VbenFormSchema，增加更多业务属性
 */
export interface ProFormFieldProps extends Partial<VbenFormSchema> {
  /**
   * 栅格布局属性
   */
  colProps?: {
    lg?: number;
    md?: number;
    offset?: number;
    sm?: number;
    span?: number;
    xl?: number;
    xs?: number;
  };

  /**
   * 数据转换（获取时）
   */
  convertValue?: (value: any) => any;

  /**
   * 字段名称
   */
  fieldName?: string;

  /**
   * 只读模式
   */
  readonly?: boolean;

  /**
   * 远程数据请求
   */
  request?: () => Promise<any>;

  /**
   * 数据转换（提交时）
   */
  transform?: (value: any) => Record<string, any>;

  /**
   * 枚举值
   */
  valueEnum?: Record<string, any>;

  /**
   * 字段宽度
   */
  width?: FieldWidth;
}

/**
 * ProForm 组件属性
 */
export interface ProFormProps extends Partial<VbenFormProps> {
  /**
   * 表单字段配置
   */
  fields?: ProFormFieldProps[];

  /**
   * 是否开启栅格化布局
   * @default false
   */
  grid?: boolean;

  /**
   * 标签栅格布局
   */
  labelCol?: { offset?: number; span: number };

  /**
   * 表单布局
   * @default 'horizontal'
   */
  layout?: FormLayout;

  /**
   * 表单提交回调
   */
  onFinish?: (values: Record<string, any>) => Promise<boolean>;

  /**
   * 表单值变化回调
   */
  onValuesChange?: (
    changedValues: Record<string, any>,
    values: Record<string, any>,
  ) => void;

  /**
   * 重置按钮文本
   * @default '重置'
   */
  resetButtonText?: string;

  /**
   * 是否显示重置按钮
   * @default true
   */
  showResetButton?: boolean;

  /**
   * 是否显示提交按钮
   * @default true
   */
  showSubmitButton?: boolean;

  /**
   * 表单尺寸
   * @default 'middle'
   */
  size?: FormSize;

  /**
   * 提交按钮文本
   * @default '提交'
   */
  submitButtonText?: string;

  /**
   * 控件栅格布局
   */
  wrapperCol?: { offset?: number; span: number };
}

/**
 * 表单实例方法
 */
export interface ProFormInstance {
  /**
   * 获取格式化后的值
   */
  getFieldsFormatValue: () => Record<string, any>;

  /**
   * 获取所有字段值
   */
  getFieldsValue: () => Record<string, any>;

  /**
   * 获取字段值
   */
  getFieldValue: (name: string) => any;

  /**
   * 重置表单
   */
  resetFields: () => void;

  /**
   * 设置字段校验状态
   */
  setFieldError: (name: string, error: string) => void;

  /**
   * 设置字段值
   */
  setFieldsValue: (values: Record<string, any>) => void;

  /**
   * 提交表单
   */
  submit: () => Promise<void>;

  /**
   * 校验表单
   */
  validateFields: () => Promise<Record<string, any>>;
}
