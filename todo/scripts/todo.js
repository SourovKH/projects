class Todo {
  #tasks;
  #id;
  #title;
  #taskCount;
  #sortingMethod;

  constructor(id, title) {
    this.#tasks = [];
    this.#id = id;
    this.#title = title;
    this.#taskCount = 0;
    this.#sortingMethod = "time";
  }

  createTask(taskDescription) {
    const id = ++this.#taskCount;
    const task = new Task(taskDescription, id);
    this.#tasks.push(task);
  }

  toggleIsDone(taskId) {
    const todoToMark = this.#tasks.find((task) => task.id === taskId);
    todoToMark.toggleMarkStatus();
  }

  set sortingMethod(sortingMethod) {
    this.#sortingMethod = sortingMethod;
  }

  sortTasksAlphabetically() {
    const sortedTasks = this.#tasks.toSorted((a, b) => {
      return a.description > b.description ? 1 : -1;
    });

    return sortedTasks.map((task) => {
      const taskDescription = task.description;
      const id = task.id;
      const isDone = task.isDone;

      return { taskDescription, id, isDone };
    });
  }

  defaultTasks() {
    return this.#tasks.map((task) => {
      const taskDescription = task.description;
      const id = task.id;
      const isDone = task.isDone;

      return { taskDescription, id, isDone };
    });
  }

  #groupOnCompletion() {
    const groupedTasks = this.#tasks.toSorted((a, b) =>
      a.isDone < b.isDone ? -1 : 1
    );

    return groupedTasks.map((task) => {
      const taskDescription = task.description;
      const id = task.id;
      const isDone = task.isDone;

      return { taskDescription, id, isDone };
    });
  }

  removeTask(taskId) {
    this.#tasks = this.#tasks.filter((task) => task.id !== taskId);
  }

  get tasks() {
    return {
      time: this.defaultTasks(),
      alphabetical: this.sortTasksAlphabetically(),
      completed: this.#groupOnCompletion(),
    }[this.#sortingMethod];
  }

  get todoId() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }
}