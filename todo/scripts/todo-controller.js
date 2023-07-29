class TodoController {
  #todoList;
  #view;
  #count;

  constructor(todoList, view) {
    this.#todoList = todoList;
    this.#view = view;
    this.#count = 0;
  }

  #addTodo(title) {
    const todo = new Todo(++this.#count, title);
    this.#todoList.addTodo(todo);
    this.#view.render(this.#todoList.todos);
  }

  #addTaskInTodo(taskDescription, todoId) {
    this.#todoList.addTaskInTodo(taskDescription, todoId);
    this.#view.render(this.#todoList.todos);
  }

  #markOrUnmarkTask(taskId, todoId) {
    this.#todoList.markOrUnmarkTask(taskId, todoId);
    this.#view.render(this.#todoList.todos);
  }

  #sortOn(sortMethod, todoId) {
    this.#todoList.setSortingMethod(sortMethod, todoId);
    const sortedTodoList = this.#todoList.todos;
    this.#view.render(sortedTodoList);
  }

  #removeTask(todoId, taskId) {
    this.#todoList.removeTask(todoId, taskId);
    this.#view.render(this.#todoList.todos);
  }

  start() {
    this.#view.setListeners("addTodo", (title) => this.#addTodo(title));

    this.#view.setListeners("addTaskInTodo", (taskDescription, todoId) =>
      this.#addTaskInTodo(taskDescription, todoId)
    );

    this.#view.setListeners("toggleIsDone", (taskId, todoId) =>
      this.#markOrUnmarkTask(taskId, todoId)
    );

    this.#view.setListeners("sortOn", (sortMethod, todoId) =>
      this.#sortOn(sortMethod, todoId)
    );

    this.#view.setListeners("removeTask", (todoId, taskId) =>
      this.#removeTask(todoId, taskId)
    );

    this.#view.onNewTodo();
  }
}
