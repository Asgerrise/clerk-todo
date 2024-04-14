<script setup lang="ts">
import TodosList from '@/components/Todos/List/List.vue';
import TodosControls from '@/components/Todos/Controls/Controls.vue';
import TodosModal from '@/components/Todos/Modal/Modal.vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/store';

const { todos, selectedTodo } = storeToRefs(useTodosStore());
</script>
<template>
  <div class="todos">
    <div class="todos__header">
      <h1>Todos</h1>
    </div>
    <div v-if="!todos.length" class="todos__no-content">
      <p>You currently have no todos. Add one!</p>
    </div>
    <TodosList v-else />
    <TodosControls />
    <Transition name="slide-fade">
      <TodosModal v-if="selectedTodo" />
    </Transition>
  </div>
</template>

<style lang="scss">
@import 'Todos.scss';
</style>
