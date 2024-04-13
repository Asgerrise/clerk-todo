export type Todo = {
  id: string;
  title: string;
  subtitle?: string;
  notes?: string;
  priority: {
    value: number | string;
    label: string;
  };
  completed?: boolean;
  parentId?: string;
  subtasks?: Omit<Todo, 'subtasks'>[];
};
