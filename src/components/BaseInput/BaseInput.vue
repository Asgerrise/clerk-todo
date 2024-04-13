<script setup lang="ts">
type Props = {
  label?: string;
  name?: string;
};

defineProps<Props>();
const model = defineModel('modelValue');
</script>
<template>
  <div class="base-input__wrapper">
    <label v-if="label" class="base-input__label" :for="name">{{
      label
    }}</label>
    <input
      v-bind="$attrs"
      :name="name"
      :id="name"
      v-model="model"
      class="base-input"
    />
  </div>
</template>

<style lang="scss">
@import 'BaseInput.scss';
</style>
