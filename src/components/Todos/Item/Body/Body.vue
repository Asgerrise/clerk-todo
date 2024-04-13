<script setup lang="ts">
import { Todo } from '@/types';
import TodosControls from '@/components/Todos/Controls/Controls.vue';
import TodosList from '@/components/Todos/List/List.vue';
import { computed, ref } from 'vue';
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import { priorityOptions } from '@/constants';
import { useTodosStore } from '@/store';

type Props = {
  item: Todo;
};

defineOptions({
  name: 'TodosItemBody',
});
const props = defineProps<Props>();

const { updateTodo } = useTodosStore();

const isEditing = ref(false);
const updatedValues = ref({
  title: props.item.title,
  subtitle: props.item.subtitle || '',
  notes: props.item.notes || '',
  priority: props.item.priority.value,
});

const inputs = computed(() => [
  {
    name: 'title',
    type: 'text',
    label: 'Title',
  },
  {
    name: 'subtitle',
    type: 'text',
    label: 'Subtitle',
  },
  {
    name: 'notes',
    type: 'text',
    label: 'Notes',
  },
  {
    name: 'priority',
    type: 'select',
    label: 'Priority',
    options: priorityOptions,
  },
]);

const onSubmit = () => {
  updateTodo({
    ...props.item,
    ...updatedValues.value,
    priority: priorityOptions.find(
      p => p.value === updatedValues.value.priority,
    )!,
  });

  isEditing.value = false;
};
</script>

<template>
  <div class="todos-item-body">
    <div v-if="item.notes" class="todos-item-body__notes">
      {{ item.notes }}
    </div>
    <TodosList
      v-if="!isEditing && item.subtasks && item.subtasks.length > 0"
      :items="item.subtasks"
    />
    <BaseButton class="todos-item-body__edit" @click="isEditing = true">
      Edit
    </BaseButton>
    <template v-if="isEditing">
      <form class="todos-item-body__form" @submit.prevent="onSubmit">
        <template v-for="input in inputs" :key="input.name">
          <BaseSelect
            v-if="input.type === 'select' && input.options"
            v-bind="input"
            v-model="updatedValues[input.name as keyof typeof updatedValues]"
          />
          <BaseInput
            v-else
            v-bind="input"
            v-model="updatedValues[input.name as keyof typeof updatedValues]"
          />
        </template>

        <BaseButton class="todos-item-body__save" type="submit">
          Save changes
        </BaseButton>
      </form>
      <TodosControls placeholder="Add a subtask" :parent="item" />
      <TodosList
        v-if="item.subtasks && item.subtasks.length > 0"
        :items="item.subtasks"
      />
    </template>
  </div>
</template>

<style lang="scss">
@import 'Body.scss';
</style>
