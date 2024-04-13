import { ref, computed, onMounted, watch } from 'vue';
import { defineStore } from 'pinia';
import { Todo } from '@/types';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([]);

  const completedTodos = computed(() =>
    todos.value.filter(todo => todo.completed),
  );
  const incompletedTodos = computed(() =>
    todos.value
      .filter(todo => !todo.completed)
      .sort((a, b) => Number(b.priority.value) - Number(a.priority.value)),
  );

  /**
   * Creates a new todo. If [todo.parentId] is defined,
   * it will add it to the parent's subtasks
   */
  const createTodo = (todo: Todo) => {
    // If the todo has a parent, add it to the parent's subtasks array
    if (todo.parentId) {
      const parent = todos.value.find(t => t.id === todo.parentId);
      if (parent) {
        parent.subtasks = parent.subtasks ? [...parent.subtasks, todo] : [todo];
      }

      return;
    }
    todos.value.push(todo);
  };

  /**
   * Deletes a todo. If [todo.parentId] is defined,
   * it will remove it from the parent's subtasks
   */
  const deleteTodo = (todo: Todo) => {
    // If the todo has a parent, remove it from the parent's subtasks array
    if (todo.parentId) {
      const parent = todos.value.find(t => t.id === todo.parentId);
      if (parent) {
        parent.subtasks = parent.subtasks
          ? parent.subtasks.filter(t => t.id !== todo.id)
          : [];
      }

      return;
    }
    todos.value = todos.value.filter(t => t.id !== todo.id);
  };

  /**
   * Updates a todo. If [todo.parentId] is defined,
   * it will update it in the parent's subtasks
   */
  const updateTodo = (item: Partial<Todo>) => {
    // If the todo has a parent, update it in the parent's subtasks array
    if (item.parentId) {
      console.log(item);
      const parent = todos.value.find(todo => todo.id === item.parentId);
      if (parent) {
        parent.subtasks = parent.subtasks
          ? parent.subtasks.map(todo => {
              if (todo.id === item.id) {
                todo = { ...todo, ...item };
              }
              return todo;
            })
          : [];
      }

      return;
    }

    todos.value = todos.value.map(todo => {
      if (todo.id === item.id) {
        todo = { ...todo, ...item };
      }
      return todo;
    });
  };

  onMounted(() => {
    if (localStorage.getItem('todos')) {
      todos.value = JSON.parse(localStorage.getItem('todos') as string);
    }
  });

  watch(
    todos,
    () => {
      localStorage.setItem('todos', JSON.stringify(todos.value));
    },
    { deep: true },
  );

  return {
    todos,
    completedTodos,
    incompletedTodos,
    createTodo,
    deleteTodo,
    updateTodo,
  };
});
