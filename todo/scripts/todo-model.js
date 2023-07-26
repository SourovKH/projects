class Todo {
  #description;
  #isMarked;
  #id;

  constructor(todoDescription, id) {
    this.#description = todoDescription;
    this.#isMarked = false;
    this.#id = id;
  }

  toggleMarkStatus() {
    this.#isMarked = !this.#isMarked;
  }

  get details() {
    const description = this.#description;
    const isMarked = this.#isMarked;
    const id = this.#id;

    return { description, isMarked, id };
  }

  //separate getters
}

class TodoList {
  #todos;
  #count;
  #grouping;

  constructor() {
    this.#todos = [];
    this.#count = 0;
    this.#grouping = false;
  }

  addTodo(todo) {
    this.#count++;
    const id = `todo-${this.#count}`;
    const todoWithId = { id, todo };

    this.#todos.push(todoWithId);
  }

  toggleMarkStatus(id) {
    const todoWithId = this.#todos.find((todo) => todo.id === id);
    todoWithId.todo.toggleMarkStatus();
  }

  toggleCompletionSequenceStatus() {
    this.#grouping = !this.#grouping;
  }

  get todoDetails() {
    const todoDetails = this.#todos.map(({ todo, id }) => {
      return { ...todo.details, id };
    });

    if (this.#grouping)
      todoDetails.sort((a, b) => (a.isMarked < b.isMarked ? -1 : 1));

    return todoDetails;
  }

  get sortedTodoDetails() {
    const todoDetails = this.todoDetails;

    return todoDetails.toSorted((a, b) => {
      return a.description > b.description ? 1 : -1;
    });
  }
}

class Renderer {
  #container;

  constructor(container) {
    this.#container = container;
  }

  #clearDisplay() {
    const containerElements = this.#container.children;
    [...containerElements].forEach((element) => element.remove());
  }

  #createTodoElement({ description, isMarked, id }) {
    const todoElement = document.createElement("li");

    todoElement.innerText = description;
    todoElement.classList.add("todo");
    todoElement.id = id;

    if (isMarked) todoElement.classList.add("done");

    return todoElement;
  }

  display(todoDetails, callBack) {
    this.#clearDisplay();

    todoDetails.forEach((todoDetail) => {
      const todoElement = this.#createTodoElement(todoDetail, callBack);
      this.#container.appendChild(todoElement);
    });
  }
}

class Controller {
  #todo;
  #renderer;

  constructor(todo, renderer) {
    this.#todo = todo;
    this.#renderer = renderer;
  }

  addTodo(todo) {
    this.#todo.addTodo(todo);
  }

  toggleMarkStatus(todoId) {
    this.#todo.toggleMarkStatus(todoId);
  }

  changeCompletionSequenceStatus() {
    this.#todo.toggleCompletionSequenceStatus();
  }

  render({ alphabetically }) {
    const todoDetails = alphabetically
      ? this.#todo.sortedTodoDetails
      : this.#todo.todoDetails;
    this.#renderer.display(todoDetails);
  }
}

const main = () => {
  const todoContainer = document.querySelector("#todos");
  const addButton = document.querySelector("#add-button");
  const textBox = document.querySelector("#text-box");
  const sortButton = document.querySelector("#sort-button");
  const doneDefaultButton = document.querySelector("#done-default");
  const sortMethod = { alphabetically: false };

  const todoList = new TodoList();
  const renderer = new Renderer(todoContainer);
  const controller = new Controller(todoList, renderer);

  addButton.onclick = () => {
    const todoDescription = textBox.value;
    const todo = new Todo(todoDescription);
    textBox.value = "";

    controller.addTodo(todo);
    controller.render(sortMethod);
  };

  todoContainer.onclick = (event) => {
    const element = event.target;
    const { id } = element;
    controller.toggleMarkStatus(id);
    controller.render(sortMethod);
  };

  sortButton.onclick = () => {
    sortMethod.alphabetically = !sortMethod.alphabetically;
    sortButton.value = "Sort";

    if (sortMethod.alphabetically) {
      sortButton.value = "Unsort";
    }

    controller.render(sortMethod);
  };

  doneDefaultButton.onclick = () => {
    controller.changeCompletionSequenceStatus();
    controller.render(sortMethod);
  };
};

window.onload = main;
