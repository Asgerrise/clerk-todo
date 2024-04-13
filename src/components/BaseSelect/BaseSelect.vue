<script setup lang="ts">
type Props = {
  options: { label: string; value: string; disabled?: boolean }[];
  label?: string;
  name?: string;
};

defineProps<Props>();
const model = defineModel('modelValue');
</script>
<template>
  <div class="base-select__wrapper">
    <label v-if="label" class="base-select__label" :for="name">{{
      label
    }}</label>
    <select
      v-bind="$attrs"
      :name="name"
      :id="name"
      v-model="model"
      class="base-select"
    >
      <option v-for="option in options" :key="option.value" v-bind="option">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style lang="scss">
@import 'BaseSelect.scss';
</style>
