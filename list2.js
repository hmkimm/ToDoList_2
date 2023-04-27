const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const delAll = document.querySelector(".delAll");

// 빈 배열 준비하고, li 추가할 때 마다 todos에 넣어줘.
let todos = [];
// todos라는 키로, todos 배열을 문서화해서 로컬에 저장해줘.
const save = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// 개별삭제의 경우
const delItem = (event) => {
  const target = event.target.parentElement;

  // 내가 클릭한 것과 todo배열의 id값이 다른것만 필터링 하자. 그 결과를 다시 todos에 넣자.
  todos = todos.filter((todo) => todo.id != target.id);
  // 업데이트(필터한 결과)를 다시 저장해서 todos배열을 동기화하자
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
  // enter마다 자동 새로고침을 방지하기 위해
  event.preventDefault();

  // 내가 작성한 li를 todo객체에 저장
  const todo = {
    id: Date.now(),
    text: input.value,
  };

  // 위에서 생성된 객체를 todos배열에 입력
  todos.push(todo);

  // li 생성
  addItem(todo);
  // 생성한 li를 로컬스토리지에 저장
  save();

  input.value = "";
};

form.addEventListener("submit", handler);

const init = () => {
  //로컬에서 저장된 배열 가져온 후, 그것을 다시 객체 문법으로 바꿔주기
  const userTodos = JSON.parse(localStorage.getItem("todos"));

  //userTodos가 있는 경우에 실행하게
  if (userTodos) {
    //위에서 가져온 배열 안에 있는 todo객체를 forEach로 순회하면서 다시 화면에 띄우기
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    //가져온 배열을 전역에서 사용하는 배열 todos에도 대입
    todos = userTodos;
  }
};
init();
