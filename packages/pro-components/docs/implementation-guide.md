# 实现指南

本文档提供 ProForm 组件库的开发优先级和实现建议。

## 开发优先级

### 第一阶段：核心组件（高优先级）

| 组件                | 优先级     | 说明                       |
| ------------------- | ---------- | -------------------------- |
| `ProForm`           | ⭐⭐⭐⭐⭐ | 核心表单容器，其他组件基础 |
| `ProFormText`       | ⭐⭐⭐⭐⭐ | 最常用的输入组件           |
| `ProFormSelect`     | ⭐⭐⭐⭐⭐ | 最常用的选择组件           |
| `ProFormTextArea`   | ⭐⭐⭐⭐   | 多行文本输入               |
| `ProFormDigit`      | ⭐⭐⭐⭐   | 数字输入，带格式化         |
| `ProFormDatePicker` | ⭐⭐⭐⭐   | 日期选择                   |

### 第二阶段：布局系统（高优先级）

| 功能                            | 优先级     | 说明         |
| ------------------------------- | ---------- | ------------ |
| horizontal/vertical/inline 布局 | ⭐⭐⭐⭐⭐ | 基础布局支持 |
| grid 栅格布局                   | ⭐⭐⭐⭐   | 复杂布局需求 |
| colProps/rowProps               | ⭐⭐⭐⭐   | 栅格属性配置 |
| ProFormGroup                    | ⭐⭐⭐     | 分组展示     |

### 第三阶段：数据管理（中优先级）

| 功能                          | 优先级     | 说明       |
| ----------------------------- | ---------- | ---------- |
| initialValues                 | ⭐⭐⭐⭐⭐ | 默认值设置 |
| setFieldsValue/getFieldsValue | ⭐⭐⭐⭐⭐ | 值操作方法 |
| ProFormDependency             | ⭐⭐⭐⭐   | 字段联动   |
| transform/convertValue        | ⭐⭐⭐     | 数据转换   |
| onValuesChange                | ⭐⭐⭐⭐   | 值变化监听 |

### 第四阶段：远程数据（中优先级）

| 功能         | 优先级   | 说明     |
| ------------ | -------- | -------- |
| valueEnum    | ⭐⭐⭐⭐ | 枚举选项 |
| request      | ⭐⭐⭐⭐ | 远程请求 |
| params       | ⭐⭐⭐   | 参数传递 |
| dependencies | ⭐⭐⭐   | 依赖字段 |

### 第五阶段：结构化数据（中优先级）

| 组件            | 优先级 | 说明     |
| --------------- | ------ | -------- |
| ProFormList     | ⭐⭐⭐ | 动态列表 |
| ProFormFieldSet | ⭐⭐   | 固定组合 |

### 第六阶段：扩展容器（低优先级）

| 组件        | 优先级 | 说明     |
| ----------- | ------ | -------- |
| ModalForm   | ⭐⭐⭐ | 弹窗表单 |
| DrawerForm  | ⭐⭐⭐ | 抽屉表单 |
| QueryFilter | ⭐⭐⭐ | 查询表单 |
| StepsForm   | ⭐⭐   | 分步表单 |

### 第七阶段：其他输入组件（低优先级）

| 组件              | 优先级 | 说明     |
| ----------------- | ------ | -------- |
| ProFormRadio      | ⭐⭐⭐ | 单选框组 |
| ProFormCheckbox   | ⭐⭐⭐ | 复选框组 |
| ProFormSwitch     | ⭐⭐⭐ | 开关     |
| ProFormTreeSelect | ⭐⭐   | 树选择   |
| ProFormUpload     | ⭐⭐   | 文件上传 |
| ProFormCaptcha    | ⭐⭐   | 验证码   |
| ProFormSlider     | ⭐     | 滑动条   |
| ProFormRate       | ⭐     | 评分     |

---

## 架构设计建议

### 1. 基础架构

```
pro-components/
├── src/
│   ├── components/
│   │   └── form/
│   │       ├── pro-form.vue          # 主组件
│   │       ├── types.ts              # 类型定义
│   │       ├── hooks/
│   │       │   ├── use-pro-form.ts   # 表单状态管理
│   │       │   └── use-field.ts      # 字段状态管理
│   │       ├── components/
│   │       │   ├── pro-form-field.vue
│   │       │   ├── pro-form-submitter.vue
│   │       │   └── ...
│   │       └── fields/               # 输入组件
│   │           ├── pro-form-text.vue
│   │           ├── pro-form-select.vue
│   │           └── ...
│   └── index.ts
```

### 2. 核心设计模式

#### 组合式函数

```ts
// useProForm.ts
export function useProForm(props: ProFormProps) {
  const formState = reactive<Record<string, any>>({});
  const formRef = ref();

  const submit = async () => {
    // 提交逻辑
  };

  const resetFields = () => {
    // 重置逻辑
  };

  return {
    formState,
    formRef,
    submit,
    resetFields,
    // ...其他方法
  };
}
```

#### Context 注入

```ts
// 通过 provide/inject 共享表单上下文
const formContextKey = Symbol('proFormContext');

// ProForm 中
provide(formContextKey, {
  formState,
  registerField,
  unregisterField,
  // ...
});

// 子组件中
const context = inject(formContextKey);
```

### 3. 类型设计

```ts
// 核心类型
interface ProFormProps {
  layout?: FormLayout;
  grid?: boolean;
  fields?: ProFormFieldProps[];
  onFinish?: (values: Record<string, any>) => Promise<void>;
  // ...
}

interface ProFormFieldProps {
  name: string;
  label?: string;
  component?: Component;
  rules?: Rule[];
  // ...
}

// 实例类型
interface ProFormInstance {
  submit: () => Promise<void>;
  resetFields: () => void;
  setFieldsValue: (values: Record<string, any>) => void;
  getFieldsValue: () => Record<string, any>;
  validateFields: () => Promise<Record<string, any>>;
  // ...
}
```

---

## 与 VbenForm 集成

ProForm 应基于 VbenForm 进行封装，复用其核心能力：

```vue
<script setup>
import { useVbenForm } from '@vben-core/form-ui';

// 复用 VbenForm 的核心逻辑
const [register, form] = useVbenForm({
  // ...配置
});

// 扩展 ProForm 特有功能
const proFormMethods = {
  getFieldsFormatValue: () => {
    // 应用 transform 转换
  },
  // ...
};
</script>
```

---

## 测试建议

### 单元测试

```ts
describe('ProForm', () => {
  it('should render correctly', () => {
    // ...
  });

  it('should submit form values', async () => {
    // ...
  });

  it('should validate fields', async () => {
    // ...
  });
});
```

### E2E 测试

```ts
test('form submission', async ({ page }) => {
  await page.goto('/form');
  await page.fill('input[name="username"]', 'test');
  await page.click('button[type="submit"]');
  await expect(page.locator('.success-message')).toBeVisible();
});
```

---

## 文档规范

每个组件应包含：

1. **功能说明** - 组件用途
2. **API 文档** - 属性、事件、方法
3. **代码示例** - 基础用法和高级用法
4. **注意事项** - 使用限制和最佳实践

---

## 发布计划

### v1.0.0

- 核心 ProForm 组件
- 基础输入组件（Text、Select、DatePicker）
- 布局系统
- 表单验证

### v1.1.0

- ProFormList
- ProFormDependency
- 远程数据加载

### v1.2.0

- ModalForm、DrawerForm
- QueryFilter
- 更多输入组件

---

## 参考资源

- [Ant Design Pro Components](https://github.com/ant-design/pro-components)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vben Admin 架构设计](https://doc.vben.pro/)
