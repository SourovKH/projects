class Todo {
  #tasks;
  #id;
  #title;
  #taskCount;
  #sortType;

  constructor(id, title) {
    this.#tasks = [];
    this.#id = id;
    this.#title = title;
    this.#taskCount = 0;
    this.#sortType = "time";
  }

  createTask(taskDescription) {
    const id = ++this.#taskCount;
    const task = new Task(taskDescription, id);
    this.#tasks.push(task);
  }

  markOrUnmarkTask(taskId) {
    const todoToMark = this.#tasks.find((task) => task.id === taskId);
    todoToMark.toggleMarkStatus();
  }

  set sortingMethod(sortingMethod) {
    this.#sortType = sortingMethod;
  }

  #getTaskDetails(task) {
    const taskDescription = task.description;
    const id = task.id;
    const isDone = task.isDone;

    return { taskDescription, id, isDone };
  }

  sortAlphabetically() {
    const sortedTasks = this.#tasks.toSorted((a, b) => {
      return a.description >= b.description ? 1 : -1;
    });

    return sortedTasks.map(this.#getTaskDetails);
  }

  sortOnTime() {
    return this.#tasks.map(this.#getTaskDetails);
  }

  #groupOnCompletion() {
    const groupedTasks = this.#tasks.toSorted((a, b) =>
      a.isDone < b.isDone ? -1 : 1
    );

    return groupedTasks.map(this.#getTaskDetails);
  }

  removeTask(taskId) {
    this.#tasks = this.#tasks.filter((task) => task.id !== taskId);
  }

  get tasks() {
    return {
      time: this.sortOnTime(),
      alphabetical: this.sortAlphabetically(),
      completed: this.#groupOnCompletion(),
    }[this.#sortType];
  }

  get todoId() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }
}
