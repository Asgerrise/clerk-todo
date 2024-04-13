<script setup lang="ts">
import TodosItemBody from '@/components/Todos/Item/Body/Body.vue';
import { useTodosStore } from '@/store';
import { Todo } from '@/types';
import { ref } from 'vue';

type Props = {
  item: Todo;
};

defineOptions({
  name: 'TodosItem',
});
const props = defineProps<Props>();

const { updateTodo } = useTodosStore();

const expanded = ref(false);

const setExpanded = () => {
  if (props.item.parentId) {
    return;
  }

  expanded.value = !expanded.value;
};
</script>
<template>
  <li
    class="todos-item"
    :class="[
      item.completed && 'todos-item--CHECKED',
      expanded && 'todos-item--EXPANDED',
      item.parentId && 'todos-item--CHILD',
    ]"
  >
    <div
      class="todos-item__header"
      :tabindex="item.parentId ? -1 : 0"
      @keyup.enter="setExpanded"
      @click="setExpanded"
    >
      <button
        class="todos-item__check"
        @click.stop="
          updateTodo({
            id: item.id,
            completed: !item.completed,
            parentId: item.parentId ? item.parentId : undefined,
          })
        "
        :title="`Mark as ${item.completed ? 'incomplete' : 'complete'}`"
        :aria-label="`Mark as ${item.completed ? 'incomplete' : 'complete'}`"
      ></button>
      <div class="todos-item__info">
        <span class="todos-item__title"
          >{{ item.title }}
          <Icon
            v-if="item.notes"
            class="todos-item__icon"
            name="hi-document-text"
          />
          <Icon
            v-if="item.subtasks && item.subtasks.length > 0"
            class="todos-item__icon"
            name="bi-list-check"
          />
        </span>
        <span v-if="item.subtitle" class="todos-item__subtitle">
          {{ item.subtitle }}
        </span>
        <span
          class="todos-item__priority"
          :class="`todos-item__priority--${item.priority.value}`"
          >{{ item.priority.label }}</span
        >
      </div>
      <Icon
        v-if="!item.parentId"
        class="todos-item__chevron"
        name="fa-chevron-down"
      />
    </div>

    <Transition name="slide-fade">
      <TodosItemBody v-if="expanded" :item="item" />
    </Transition>
  </li>
</template>

<style lang="scss">
@import 'Item.scss';
</style>
