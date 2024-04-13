<script setup lang="ts"></script>
<template>
  <button class="base-button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style lang="scss">
@import 'BaseButton.scss';
</style>
