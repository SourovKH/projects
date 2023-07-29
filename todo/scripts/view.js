class View {
  #todoListContainer;
  #addButton;
  #textBox;
  #listeners;
  #currentSelectOption;

  constructor(todoListContainer, addButton, textBox) {
    this.#todoListContainer = todoListContainer;
    this.#addButton = addButton;
    this.#textBox = textBox;
    this.#listeners = {};
    this.#currentSelectOption = "time";
  }

  #createSortOptions(todoId) {
    const sortOptions = document.createElement("select");
    sortOptions.classList.add("sort-options");

    const timeOption = document.createElement("option");
    timeOption.id = `time-${todoId}`;
    timeOption.setAttribute("value", "time");
    timeOption.innerText = "time";

    const alphabeticalOption = document.createElement("option");
    alphabeticalOption.id = `alpha-${todoId}`;
    alphabeticalOption.setAttribute("value", "alphabetical");
    alphabeticalOption.innerText = "A-Z";

    const completionOption = document.createElement("option");
    completionOption.id = `done-${todoId}`;
    completionOption.setAttribute("value", "completed");
    completionOption.innerText = "done";

    sortOptions.append(timeOption, alphabeticalOption, completionOption);

    sortOptions.onchange = (event) => {
      const value = event.target.value;

      switch (value) {
        case "time":
          this.#currentSelectOption = "time";
          this.#listeners.setSortTypeOnTime(todoId);
          break;

        case "alphabetical":
          this.#currentSelectOption = "alphabetical";
          this.#listeners.setSortTypeOnAlphabets(todoId);
          break;

        case "completed":
          this.#currentSelectOption = "completed";
          this.#listeners.setSortTypeOnCompletion(todoId);
      }
    };

    [...sortOptions.children].forEach((option) => {
      if (option.value === this.#currentSelectOption) {
        option.setAttribute("selected", "true");
      }
    });

    return sortOptions;
  }

  #createTemplate(todoTitle, todoId) {
    const todoContainer = document.createElement("section");
    todoContainer.classList.add("todo");
    todoContainer.id = `todo-${todoId}`;

    const todoHeader = document.createElement("div");
    todoHeader.classList.add("todo-header");

    const title = document.createElement("div");
    title.classList.add("title");
    title.innerText = todoTitle;

    const closeButton = document.createElement("div");
    closeButton.classList.add("close-button", "todo-close-button");
    closeButton.innerText = "X";

    closeButton.onclick = () => {
      this.#listeners.removeTodo(todoId);
    };

    todoHeader.append(title, closeButton);

    const inputArea = document.createElement("div");
    inputArea.classList.add("input-area");
    inputArea.id = "task-input-area";

    const taskInputBox = document.createElement("input");
    taskInputBox.setAttribute("type", "text");
    taskInputBox.classList.add("text-box");
    taskInputBox.id = `task-input-${todoId}`;

    const inputButton = document.createElement("input");
    inputButton.setAttribute("type", "button");
    inputButton.setAttribute("value", "Add");
    inputButton.classList.add("button");
    inputButton.id = `add-task-${todoId}`;

    inputButton.onclick = () => {
      const taskDescription = taskInputBox.value;
      taskInputBox.value = "";

      if (taskDescription !== "") {
        this.#listeners.addTaskInTodo(taskDescription, todoId);
      }
    };

    const sortOptions = this.#createSortOptions(todoId);

    inputArea.append(taskInputBox, inputButton, sortOptions);

    const taskContainer = document.createElement("ul");
    taskContainer.classList.add("tasks");
    taskContainer.id = `tasks-${todoId}`;

    todoContainer.append(todoHeader, taskContainer, inputArea);

    return todoContainer;
  }

  setListeners(event, listener) {
    this.#listeners[event] = listener;
  }

  onNewTodo() {
    this.#addButton.onclick = () => {
      const title = this.#textBox.value;
      this.#textBox.value = "";
      this.#textBox.focus();

      if (title !== "") {
        this.#listeners.addTodo(title);
      }
    };
  }

  #clearTodos() {
    [...this.#todoListContainer.children].forEach((child) => child.remove());
  }

  #createTaskElement(task, todoId) {
    const { taskDescription, isDone, id } = task;

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task");

    const closeButton = document.createElement("div");
    closeButton.innerText = "X";
    closeButton.classList.add("close-button");

    closeButton.onclick = () => {
      this.#listeners.removeTask(todoId, id);
    };

    const taskElement = document.createElement("div");
    taskElement.innerText = taskDescription;
    taskElement.id = `task-${todoId}-${id}`;

    taskElement.onclick = () => {
      this.#listeners.toggleIsDone(id, todoId);
    };

    if (isDone) {
      taskElement.classList.add("done");
    }

    taskContainer.append(taskElement, closeButton);
    return taskContainer;
  }

  #createTasksContainer(tasks, todoId) {
    const taskContainer = document.querySelector(`#tasks-${todoId}`);

    tasks.forEach((task) => {
      const taskElement = this.#createTaskElement(task, todoId);
      taskContainer.appendChild(taskElement);
    });

    return taskContainer;
  }

  render(todos) {
    this.#clearTodos();

    todos.forEach((todo) => {
      const todoId = todo.todoId;
      const title = todo.title;

      const template = this.#createTemplate(title, todoId);
      this.#todoListContainer.appendChild(template);

      const tasksContainer = this.#createTasksContainer(todo.tasks, todoId);
      template.appendChild(tasksContainer);
    });
  }
}
