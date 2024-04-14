<script setup lang="ts">
type Props = {
  layout?: 'default' | 'icon' | 'icon-danger';
};

withDefaults(defineProps<Props>(), {
  layout: 'default',
});
</script>
<template>
  <button
    class="base-button"
    :class="`base-button--${layout.toUpperCase()}`"
    @click="$emit('click')"
    @click.stop="$emit('click:stop')"
  >
    <slot />
  </button>
</template>

<style lang="scss">
@import 'BaseButton.scss';
</style>
