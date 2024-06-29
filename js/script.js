// Select Elements
const form = document.querySelector("#data-form");
const lists = document.querySelector("#data-lists");
const input = document.querySelector("#data-Input");

// Classes :

class Storage {
  static addToStorage(todoArr) {
    return localStorage.setItem("Todo", JSON.stringify(todoArr));
  }

  static getStorage() {
    return localStorage.getItem("Todo") === null
      ? []
      : JSON.parse(localStorage.getItem("Todo"));
  }
}
let todoArr = Storage.getStorage();

class Todo {
  constructor(id, todo) {
    this.id = id;
    this.todo = todo;
  }
}
class UI {
  static displayData() {
    let displayData = todoArr.map((item) => {
      return `
            <div class="todo">
            <p>${item.todo}</p>
            <span class="remove" data-id = ${item.id}>🗑️</span>
            </div>
        `;
    });
    lists.innerHTML = displayData.join(" ");
  }

  static clearInput() {
    input.value = "";
  }

  static removeTodo() {
    lists.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        e.target.parentElement.remove();
      }
      let btnId = e.target.dataset.id;
      UI.removeArrayTodo(btnId);
    });
  }
  static removeArrayTodo(id) {
    todoArr = todoArr.filter((item) => item.id !== +id);
    Storage.addToStorage(todoArr);
  }
}

// Form Submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.length !== 0) {
    let id = Math.trunc(Math.random() * 1000000);
    const todo = new Todo(id, input.value);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    Storage.addToStorage(todoArr);
    UI.removeTodo();
  }
});

window.addEventListener("DOMContentLoaded", () => {
  UI.displayData();
  UI.removeTodo();
});
