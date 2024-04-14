<script setup lang="ts">
type Props = {
  label?: string;
  name?: string;
  layout?: 'default' | 'text';
  type?: string;
};

withDefaults(defineProps<Props>(), {
  layout: 'default',
});
const model = defineModel<string>('modelValue');
</script>
<template>
  <div class="base-input__wrapper">
    <label v-if="label" class="base-input__label" :for="name">{{
      label
    }}</label>
    <input
      v-if="type !== 'textarea'"
      v-bind="$attrs"
      :name="name"
      :id="name"
      v-model="model"
      :type="type"
      class="base-input"
      :class="`base-input--${layout.toUpperCase()}`"
    />
    <textarea
      v-else
      v-bind="$attrs"
      :name="name"
      :id="name"
      v-model="model"
      :type="type"
      class="base-input"
      :class="`base-input--${layout.toUpperCase()} base-input--TYPE-TEXTAREA`"
    />
  </div>
</template>

<style lang="scss">
@import 'BaseInput.scss';
</style>
