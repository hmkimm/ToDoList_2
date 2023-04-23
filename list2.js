const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const delAll = document.querySelector(".delAll");

let todos = [];
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (event) => {
  const target = event.target.parentElement;

  todos = todos.filter((todo) => todo.id != target.id);
  save();
  target.remove();
};
const addItem = (todo) => {
  if (todo.text !== "") {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = todo.text;
    button.innerHTML = "X";

    button.addEventListener("click", delItem);
    delAll.addEventListener("click", delAllItem);

    ul.append(li);
    li.append(span, button);
    li.id = todo.id;
    li.classList.add("li-style");
    li.addEventListener("click", () => {
      li.classList.toggle("horizontal-line");
    });
  } else if (todo.text === "") {
    alert("할 일을 입력하세요!");
  }
};

const delAllItem = (event) => {
  const $liLists = document.querySelectorAll("li");
  const yes = confirm("정말 모두 삭제하시겠습니까?");

  if (yes) {
    for (let i = 0; i < $liLists.length; i++) {
      $liLists[i].remove();
    }
    localStorage.removeItem("todos");
  }
};

const handler = (event) => {
  event.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(todo);
  addItem(todo);
  save();

  input.value = "";
};

form.addEventListener("submit", handler);

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos"));
  //저장된 거 화면에 띄우기

  if (userTodos) {
    //userTodos가 있는 경우에 실행하게
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    //가져온 배열을 전역에서 사용하는 배열 todos에도 대입
    todos = userTodos;
  }
};
init();
