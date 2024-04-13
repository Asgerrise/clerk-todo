<script setup lang="ts">
import TodosList from '@/components/Todos/List/List.vue';
import TodosControls from '@/components/Todos/Controls/Controls.vue';
import { storeToRefs } from 'pinia';
import { useTodosStore } from '@/store';

const { todos } = storeToRefs(useTodosStore());
</script>
<template>
  <div class="todos">
    <div class="todos__header">
      <h1>Todos</h1>
    </div>
    <div v-if="!todos.length" class="todos__no-content">
      <p>You currently have no todos. Add one!</p>
    </div>
    <TodosList />
    <TodosControls />
  </div>
</template>

<style lang="scss">
@import 'Todos.scss';
</style>
