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

  #setSortTypeOnAlphabets(todoId) {
    this.#todoList.setSortTypeOnAlphabets(todoId);
    const sortedTodoList = this.#todoList.todos;
    this.#view.render(sortedTodoList);
  }

  #setSortTypeOnTime(todoId) {
    this.#todoList.setSortTypeOnTime(todoId);
    const sortedTodoList = this.#todoList.todos;
    this.#view.render(sortedTodoList);
  }

  #setSortTypeOnCompletion(todoId) {
    this.#todoList.setSortTypeOnCompletion(todoId);
    const sortedTodoList = this.#todoList.todos;
    this.#view.render(sortedTodoList);
  }

  #removeTask(todoId, taskId) {
    this.#todoList.removeTask(todoId, taskId);
    this.#view.render(this.#todoList.todos);
  }

  #removeTodo(todoId) {
    this.#todoList.removeTodo(todoId);
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

    this.#view.setListeners("setSortTypeOnAlphabets", (todoId) =>
      this.#setSortTypeOnAlphabets(todoId)
    );

    this.#view.setListeners("setSortTypeOnTime", (todoId) =>
      this.#setSortTypeOnTime(todoId)
    );

    this.#view.setListeners("setSortTypeOnCompletion", (todoId) =>
      this.#setSortTypeOnCompletion(todoId)
    );

    this.#view.setListeners("removeTask", (todoId, taskId) =>
      this.#removeTask(todoId, taskId)
    );

    this.#view.setListeners("removeTodo", (todoId) => this.#removeTodo(todoId));

    this.#view.onNewTodo();
  }
}
