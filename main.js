
let input = document.getElementById("todo-input");
let sab = document.getElementById("submit");
let list =document.getElementById("list")
let doneDiv = document.getElementById("completed-tasks");

let todos = [];

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  displayTodos(todos);
}
sab.onclick = function() {
  if (input.value !== "") {
    addTodo(input.value);
    input.value = "";
  }
};

function addTodo(todoText) {
  let todo = {
    id: Date.now(),
    title: todoText,
    completed: false
  };
  todos.push(todo);
  displayTodos(todos);
 addlocl(todos);
}

function displayTodos(el) {
  doneDiv.innerHTML = "      <h2>Completed Tasks</h2>";
  list.innerHTML = "      <h2>Incomplete Tasks</h2>";
  el.forEach((e) => {
    let div = document.createElement("label");
    div.className = "task";
    div.setAttribute("for", e.id);
    div.appendChild(document.createTextNode(e.title));
    list.appendChild(div);
        let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = e.completed;
    checkbox.className = "toggle-checkbox";
    checkbox.setAttribute("id", e.id);
    div.appendChild(checkbox);
    checkbox.onchange = function() {
      e.completed = this.checked;
      addlocl(e);
      displayTodos(todos);
    };
    if (!e.completed) {
      checkbox.onclick = function() {
        e.completed = true;
        displayTodos(todos);
        addlocl(e);
      };
    } else {
      let delbutton = document.createElement("span");
      delbutton.className = "delete";
      delbutton.appendChild(document.createTextNode("Delete"));
      div.appendChild(delbutton);
      doneDiv.appendChild(div);
      delbutton.onclick = function() {
        todos = todos.filter(e => e.id != this.parentNode.getAttribute("for"));
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos(todos);
      }
    }
  });
}

function addlocl(el){
    localStorage.setItem("todos", JSON.stringify(todos));
}