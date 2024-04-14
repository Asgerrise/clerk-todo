<script setup lang="ts">
import BaseButton from '@/components/BaseButton/BaseButton.vue';
import BaseInput from '@/components/BaseInput/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect/BaseSelect.vue';
import TodosControls from '@/components/Todos/Controls/Controls.vue';
import { useTodosStore } from '@/store';
import { storeToRefs } from 'pinia';
import { priorityOptions } from '@/constants';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineOptions({
  name: 'TodosModal',
});

const { setSelectedTodo, updateTodo } = useTodosStore();
const { selectedTodo } = storeToRefs(useTodosStore());

const updatedValues = ref({
  title: selectedTodo.value?.title || '',
  subtitle: selectedTodo.value?.subtitle || '',
  notes: selectedTodo.value?.notes || '',
  priority: selectedTodo.value?.priority.value || '1',
});

const setEscapeListener = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    setSelectedTodo(null);
  }
};

watch(
  updatedValues,
  value => {
    updateTodo({
      ...value,
      parentId: selectedTodo.value?.parentId,
      id: selectedTodo.value?.id,
      priority: priorityOptions.find(p => p.value === value.priority)!,
    });
  },
  { deep: true },
);

watch(selectedTodo, (newValue, prevValue) => {
  if (newValue?.id !== prevValue?.id) {
    updatedValues.value = {
      title: selectedTodo.value?.title || '',
      subtitle: selectedTodo.value?.subtitle || '',
      notes: selectedTodo.value?.notes || '',
      priority: selectedTodo.value?.priority.value || '1',
    };
  }
});

onMounted(() => {
  document.addEventListener('keyup', setEscapeListener);
});

onBeforeUnmount(() => {
  document.removeEventListener('keyup', setEscapeListener);
});
</script>

<template>
  <div class="todos-modal">
    <div class="todos-modal__inputs">
      <BaseInput
        v-model="updatedValues.title"
        name="update-title"
        layout="text"
        placeholder="Title"
      />
      <BaseInput
        v-model="updatedValues.subtitle"
        name="update-subtitle"
        layout="text"
        placeholder="Subtitle"
      />
      <BaseInput
        v-model="updatedValues.notes"
        name="update-notes"
        type="textarea"
        layout="text"
        placeholder="Notes"
      />
      <BaseSelect
        v-model="updatedValues.priority"
        label="Priority"
        :options="priorityOptions"
        name="priority"
      />
      <TodosControls
        v-if="selectedTodo && !selectedTodo.parentId"
        placeholder="Add subtask"
        :parent="selectedTodo"
      />
    </div>
    <BaseButton
      class="todos-modal__close"
      @click="setSelectedTodo(null)"
      layout="icon"
    >
      <Icon name="io-close-sharp" />
    </BaseButton>
  </div>
</template>

<style lang="scss">
@import 'Modal.scss';
</style>
