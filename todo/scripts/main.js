const main = () => {
  const todoListContainer = document.querySelector("#todo-list");
  const todoAddButton = document.querySelector("#add-todo");
  const todoTextBox = document.querySelector("#todo-input");

  const todoList = new TodoList();
  const view = new View(todoListContainer, todoAddButton, todoTextBox);
  const todoController = new TodoController(todoList, view);
  todoController.start();
};

window.onload = main;
