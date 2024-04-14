<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import TodosList from '@/components/Todos/List/List.vue';
import { useTodosStore } from '@/store';
import { Todo } from '@/types';
import { storeToRefs } from 'pinia';

type Props = {
  item: Todo;
};

defineOptions({
  name: 'TodosItem',
});
defineProps<Props>();

const { selectedTodo } = storeToRefs(useTodosStore());
const { updateTodo, setSelectedTodo, deleteTodo } = useTodosStore();
</script>
<template>
  <li
    class="todos-item"
    :class="[
      item.completed && 'todos-item--CHECKED',
      item.parentId && 'todos-item--CHILD',
    ]"
  >
    <div
      role="button"
      class="todos-item__header"
      tabindex="0"
      @keyup.enter="setSelectedTodo(item.id === selectedTodo?.id ? null : item)"
      @click="setSelectedTodo(item.id === selectedTodo?.id ? null : item)"
    >
      <button
        class="todos-item__check"
        @click.stop="
          updateTodo({
            id: item.id,
            completed: !item.completed,
            parentId: item.parentId ? item.parentId : undefined,
          })
        "
        :title="`Mark as ${item.completed ? 'incomplete' : 'complete'}`"
        :aria-label="`Mark as ${item.completed ? 'incomplete' : 'complete'}`"
      ></button>
      <div class="todos-item__info">
        <span class="todos-item__title"
          >{{ item.title }}
          <Icon
            v-if="item.notes"
            title="This task has notes"
            class="todos-item__icon"
            name="hi-document-text"
          />
        </span>
        <span v-if="item.subtitle" class="todos-item__subtitle">
          {{ item.subtitle }}
        </span>
        <span
          class="todos-item__priority"
          :class="`todos-item__priority--${item.priority.value}`"
          >{{ item.priority.label }}</span
        >
      </div>
      <BaseButton
        class="todos-item__delete"
        layout="icon-danger"
        @click:stop="deleteTodo(item)"
      >
        <Icon name="px-trash" />
      </BaseButton>
    </div>
    <TodosList
      v-if="item.subtasks && item.subtasks.length > 0"
      :items="item.subtasks"
    />
  </li>
</template>

<style lang="scss">
@import 'Item.scss';
</style>
