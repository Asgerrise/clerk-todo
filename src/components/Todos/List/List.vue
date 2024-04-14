<script setup lang="ts">
import TodosItem from '@/components/Todos/Item/Item.vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/store';
import { Todo } from '@/types';
import { computed } from 'vue';

type Props = {
  items?: Todo[];
};

defineOptions({
  name: 'TodosList',
});

const props = defineProps<Props>();

const { completedTodos, incompletedTodos, todos } =
  storeToRefs(useTodosStore());

const shownTodos = computed(() => {
  if (props.items) {
    const completed = props.items.filter(item => item.completed);
    const incompleted = props.items
      .filter(item => !item.completed)
      .sort((a, b) => Number(b.priority.value) - Number(a.priority.value));

    return [...incompleted, ...completed];
  } else {
    return [...incompletedTodos.value, ...completedTodos.value];
  }
});

// Necessary for transitions to work with positioned elements
const onBeforeLeave = (el: HTMLElement) => {
  const { marginLeft, marginTop, width, height } = window.getComputedStyle(el);
  el.style.left = `${el.offsetLeft - parseFloat(marginLeft)}px`;
  el.style.top = `${el.offsetTop - parseFloat(marginTop)}px`;
  el.style.width = width;
  el.style.height = height;
};
</script>
<template>
  <TransitionGroup
    name="list"
    tag="ul"
    role="list"
    class="todos-list"
    :class="[items && 'todos-list--NESTED']"
    @before-leave="el => onBeforeLeave(el as HTMLElement)"
  >
    <div v-if="!todos.length && !items" class="todos-list__no-content">
      <p>You currently have no todos. Add one!</p>
    </div>
    <TodosItem v-for="item in shownTodos" :key="item.id" :item="item" />
  </TransitionGroup>
</template>

<style lang="scss">
@import 'List.scss';
</style>
