<script setup lang="ts">
/**
 * ProFormList 列表表单组件
 * 用于录入结构化的数组数据
 */

import { ref } from 'vue';

interface ListItem {
  [key: string]: any;
  id: number | string;
}

interface Props {
  /**
   * 新增按钮文本
   */
  addButtonText?: string;

  /**
   * 默认值
   */
  initialValue?: ListItem[];

  /**
   * 标签
   */
  label?: string;

  /**
   * 最大数量
   */
  max?: number;

  /**
   * 最小数量
   */
  min?: number;

  /**
   * 字段名
   */
  name: string;

  /**
   * 是否显示复制按钮
   */
  showCopyButton?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  addButtonText: '添加一项',
  initialValue: () => [],
  label: '',
  max: Infinity,
  min: 0,
  showCopyButton: true,
});

const emit = defineEmits<{
  change: [value: ListItem[]];
}>();

// 列表数据
const list = ref<ListItem[]>(props.initialValue || []);

// 生成唯一 ID
const generateId = () => Date.now() + Math.random();

// 新增项
const add = (defaultValue?: Partial<ListItem>, index?: number) => {
  if (props.max && list.value.length >= props.max) {
    return;
  }

  const newItem: ListItem = {
    id: generateId(),
    ...defaultValue,
  };

  if (index === undefined) {
    list.value.push(newItem);
  } else {
    list.value.splice(index, 0, newItem);
  }

  emit('change', list.value);
};

// 删除项
const remove = (index: number) => {
  if (props.min && list.value.length <= props.min) {
    return;
  }

  list.value.splice(index, 1);
  emit('change', list.value);
};

// 复制项
const copy = (index: number) => {
  const item = list.value[index];
  if (item) {
    add({ ...item, id: generateId() }, index + 1);
  }
};

// 移动项
const move = (from: number, to: number) => {
  if (to < 0 || to >= list.value.length) return;

  const item = list.value.splice(from, 1)[0];
  list.value.splice(to, 0, item);
  emit('change', list.value);
};

// 获取单个项
const get = (index: number) => list.value[index];

// 获取所有项
const getList = () => list.value;

// 暴露方法
defineExpose({
  add,
  remove,
  copy,
  move,
  get,
  getList,
});
</script>

<template>
  <div class="pro-form-list">
    <div v-if="label" class="pro-form-list__label">
      {{ label }}
    </div>

    <div class="pro-form-list__content">
      <div
        v-for="(item, index) in list"
        :key="item.id"
        class="pro-form-list__item"
      >
        <div class="pro-form-list__item-content">
          <slot :item="item" :index="index"></slot>
        </div>

        <div class="pro-form-list__item-actions">
          <button
            v-if="showCopyButton"
            type="button"
            class="pro-form-list__action-btn"
            @click="copy(index)"
          >
            复制
          </button>
          <button
            type="button"
            class="pro-form-list__action-btn pro-form-list__action-btn--danger"
            :disabled="min !== undefined && list.length <= min"
            @click="remove(index)"
          >
            删除
          </button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="pro-form-list__add-btn"
      :disabled="max !== undefined && list.length >= max"
      @click="add()"
    >
      + {{ addButtonText }}
    </button>
  </div>
</template>

<style scoped>
.pro-form-list {
  width: 100%;
}

.pro-form-list__label {
  margin-bottom: 8px;
  font-size: 14px;
  color: rgb(0 0 0 / 88%);
}

.pro-form-list__item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  padding: 12px;
  margin-bottom: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.pro-form-list__item-content {
  flex: 1;
}

.pro-form-list__item-actions {
  display: flex;
  gap: 4px;
}

.pro-form-list__action-btn {
  padding: 2px 8px;
  font-size: 12px;
  cursor: pointer;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.pro-form-list__action-btn:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}

.pro-form-list__action-btn--danger:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.pro-form-list__action-btn:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
  border-color: #d9d9d9;
}

.pro-form-list__add-btn {
  width: 100%;
  padding: 8px;
  color: rgb(0 0 0 / 65%);
  cursor: pointer;
  background: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.pro-form-list__add-btn:hover {
  color: #40a9ff;
  border-color: #40a9ff;
}

.pro-form-list__add-btn:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
  border-color: #d9d9d9;
}
</style>
