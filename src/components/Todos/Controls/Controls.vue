<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import { priorityOptions } from '@/constants';
import { useTodosStore } from '@/store';
import { Todo } from '@/types';
import { generateRandomId } from '@/utils';
import { computed, ref } from 'vue';

type Props = {
  placeholder?: string;
  parent?: Todo;
};

defineOptions({
  name: 'TodosControls',
});

const props = defineProps<Props>();

const { createTodo } = useTodosStore();

const title = ref('');
const priority = ref('1');

const isSubmitDisabled = computed(() => !title.value || !priority.value);

const onCreate = () => {
  const todo: Todo = {
    id: generateRandomId(),
    title: title.value,
    priority: priorityOptions.find(p => p.value === priority.value)!,
  };

  if (props.parent) {
    todo.parentId = props.parent.id;
  }

  createTodo(todo);
  title.value = '';
  priority.value = '1';
};
</script>
<template>
  <form class="todos-controls" @submit.prevent="onCreate">
    <BaseInput
      v-model="title"
      type="text"
      name="title"
      :placeholder="placeholder || 'What needs to be done?'"
    />
    <BaseSelect v-model="priority" :options="priorityOptions" />
    <BaseButton type="submit" :disabled="isSubmitDisabled"> Add </BaseButton>
  </form>
</template>

<style lang="scss">
@import 'Controls.scss';
</style>
