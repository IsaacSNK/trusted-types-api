initUi();
loadItems();

function initUi() {
  const addButton = document.getElementsByTagName("button")[0];
  addButton.addEventListener("click", addTask);
}

async function addTask() {
  const incompleteTasksHolder = document.getElementById("incomplete-tasks");
  const taskInput = document.getElementById("new-task"); // new-task
  const response = await fetch("/api/todo", {
    method: "POST",
    body: taskInput.value,
  });
  if (response.status === 200) {
    const id = await response.text();
    incompleteTasksHolder.appendChild(createNewTaskElement(taskInput.value, false, id));
  }
}

async function loadItems() {
  const response = await fetch("/api/todo");
  if (response.status === 200) {
    render(await response.json());
  }
}

function render(itemArray) {
  const incompleteTasksHolder = document.getElementById("incomplete-tasks");
  const completedTasksHolder = document.getElementById("completed-tasks"); 

  itemArray.forEach((item) => {
    const listItem = createNewTaskElement(item.text, item.state == 'done', item.id);
    if (item.state == 'done') {
        completedTasksHolder.appendChild(listItem);
    } else {
        incompleteTasksHolder.appendChild(listItem);
    }
  });
}

function createNewTaskElement(taskString, complete, id) {
  const listItem = document.createElement("li");
  listItem.id = id;
  const checkBox = document.createElement("input");
  const label = document.createElement("label");

  checkBox.type = "checkBox";
  checkBox.checked = complete;
  
  label.innerHTML = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  if (!complete) {
    checkBox.onchange = markComplete;
  }
  return listItem;
}

async function markComplete() {
    const completedTasksHolder = document.getElementById("completed-tasks"); 
    const item = this.parentNode;
    const response = await fetch(`/api/todo/${item.id}/complete`, {
        method: "PATCH"
    });
    if (response.status === 200) {
        completedTasksHolder.appendChild(item);
    }
}
