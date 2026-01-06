
let input = document.getElementById("todo-input");
let sab = document.getElementById("submit");
let list = document.getElementById("list");
let doneDiv = document.getElementById("completed-tasks");

let todos =  (localStorage.getItem("todos")) 
  ? JSON.parse(localStorage.getItem("todos"))
  :
  [];
displayTodos(todos);


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
  addlocl();
}

function displayTodos(el) {
  doneDiv.innerHTML = "<h2>Completed Tasks</h2>";
  list.innerHTML = "<h2>Incomplete Tasks</h2>";
  el.forEach((e) => {
    let div = document.createElement("label");
    div.className = "task";
    div.setAttribute("for", e.id);

    // Create checkbox first
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = e.completed;
    checkbox.className = "toggle-checkbox";
    checkbox.setAttribute("id", e.id);
    div.appendChild(checkbox);

    // Then add the text
    div.appendChild(document.createTextNode(e.title));

    // Single handler for checkbox changes
    checkbox.onchange = function() {
      e.completed = this.checked;
      addlocl();
      displayTodos(todos);
    };

    if (e.completed) {
      let delbutton = document.createElement("span");
      delbutton.className = "delete";
      delbutton.appendChild(document.createTextNode("Delete"));
      div.appendChild(delbutton);
      doneDiv.appendChild(div);
      delbutton.onclick = function() {
        todos = todos.filter(t => t.id != e.id);
        addlocl();
        displayTodos(todos);
      };
    } else {
      list.appendChild(div);
    }
  });
}

function addlocl() {
  localStorage.setItem("todos", JSON.stringify(todos));
}