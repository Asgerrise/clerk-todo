<script setup lang="ts">
import Todos from '@/components/Todos/Todos.vue';
</script>

<template>
  <div class="main">
    <Todos />
  </div>
</template>

<style lang="scss">
@import './assets/styles/main.scss';

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: var(--space-md);
}
</style>
