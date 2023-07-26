class Task {
  #description;
  #isDone;
  #id;

  constructor(taskDescription, id) {
    this.#description = taskDescription;
    this.#isDone = false;
    this.#id = id;
  }

  toggleMarkStatus() {
    this.#isDone = !this.#isDone;
  }

  get description() {
    return this.#description;
  }

  get isDone() {
    return this.#isDone;
  }

  get id() {
    return this.#id;
  }
}
