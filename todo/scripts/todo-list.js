class TodoList {
  #todos;

  constructor() {
    this.#todos = [];
  }

  addTodo(todo) {
    this.#todos.push(todo);
  }

  get todos() {
    return this.#todos.map((todo) => {
      const { tasks, todoId, title } = todo;

      return { tasks, todoId, title };
    });
  }

  addTaskInTodo(taskDescription, todoId) {
    this.#todos.forEach((todo) => {
      if (todo.todoId === todoId) {
        todo.createTask(taskDescription);
      }
    });
  }

  markOrUnmarkTask(taskId, todoId) {
    const todo = this.#todos.find((todo) => {
      return todo.todoId === todoId;
    });

    todo.markOrUnmarkTask(taskId);
  }

  setSortingMethod(sortingMethod, todoId) {
    const todo = this.#todos.find((todo) => {
      return todo.todoId === todoId;
    });

    todo.sortingMethod = sortingMethod;
  }

  removeTask(todoId, taskId) {
    const todo = this.#todos.find((todo) => {
      return todo.todoId === todoId;
    });

    todo.removeTask(taskId);
  }
}
