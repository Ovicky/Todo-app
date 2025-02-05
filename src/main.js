import "./utils/bling.js";
import "./style.css";

function app() {
  // state
  let state = {
    todos: [],
  };
  // ui
  let ui = {
    input: $("input"),
    form: $("form"),
  };
  console.log(ui);

  return mk("div", { id: "app" }, [
    mk("h1", null, ["Todo App: Alstschool Frontend Version"]),
    (ui.form = mk("form", { id: "form" }, [
      (ui.input = mk("input", {
        className: "todo",
        type: "text",
        id: "todo",
        placeholder: "Enter a Todo",
      })),
      mk("button", { type: "submit", onclick: add }, ["Add todo"]),
    ])),
    (ui.todos = mk("ul", { id: "todos" }, [])),
  ]);

  function createTodo(todo) {
    let item, text, deleteButton, editButton;

    item = mk("li", { className: "todo-item" }, [
        (text = mk("span", {}, [todo.text])),
        (deleteButton = mk("button", { type: "button", id: todo.id }, ["Delete"])),
        (editButton = mk("button", { type: "button", id: todo.id }, ["Edit"]))
    ]);

    deleteButton.addEventListener("click", (e) => deleteTodo(e, todo.id));
    editButton.addEventListener("click", (e) => {
        const newText = prompt("Edit your todo:", todo.text);
        if (newText) modifyTodo(e, todo.id, newText);
    });

    item.append(deleteButton, editButton);

    return item;
}


  function add(e) {
    e.preventDefault();

    const text = ui?.input.value;

    if (!text) return;

    const todo = { text, completed: false, id: Date.now() };
    console.log(todo);

    ui.input.value = "";

    state.todos.push(todo);
    console.log(state.todos);

    ui?.todos.prepend(createTodo(todo));
  }

  function deleteTodo(e, id) {
    e.preventDefault();

    console.log("Deleting todo with ID:", id);

    // Ensure ID is valid and filter todos
    state.todos = state.todos.filter((todo) => todo.id !== Number(id));

    renderTodos(); // Update UI after deletion
  }

  
  function modifyTodo(e, id, newText) {
    e.preventDefault();
    
    console.log("Editing todo with ID:", id);
    
    // Find and update the todo
    state.todos = state.todos.map((todo) =>
        todo.id === Number(id) ? { ...todo, text: newText } : todo
  );
  
  renderTodos(); // Refresh UI
}

function renderTodos() {
  ui.todos.innerHTML = "";
  state.todos.forEach((todo) => ui.todos.prepend(createTodo(todo)));
}


 


  
}

function render() {
  document.body.prepend(app());
}

render();
