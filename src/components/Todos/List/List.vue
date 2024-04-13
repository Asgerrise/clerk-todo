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

const { completedTodos, incompletedTodos } = storeToRefs(useTodosStore());

const shownTodos = computed(() => {
  if (props.items) {
    return props.items.sort((a, b) => b.priority.value - a.priority.value);
  } else {
    return [...incompletedTodos.value, ...completedTodos.value];
  }
});
</script>
<template>
  <TransitionGroup name="list" tag="ul" role="list" class="todos-list">
    <TodosItem v-for="item in shownTodos" :key="item.id" :item="item" />
  </TransitionGroup>
</template>

<style lang="scss">
@import 'List.scss';
</style>
