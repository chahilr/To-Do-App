let taskRecord = window.localStorage.getItem("tasks");
if (taskRecord == null) taskRecord = document.createElement("div");

window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  list_el.innerHTML = taskRecord.innerHTML;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    if (!task) {
      alert("Please fill out the task");
      return;
    }

    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    list_el.appendChild(task_el);
    window.localStorage.setItem("tasks", list_el.innerHTML);

    const actions = document.createElement("div");
    actions.classList.add("actions");
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
      list_el.removeChild(task_el);
      window.localStorage.setItem("tasks", list_el.innerHTML);
    });

    task_el.appendChild(actions);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    input.value = "";

    editBtn.addEventListener("click", () => {
      if (editBtn.innerText.toLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        editBtn.innerText = "save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        editBtn.innerText = "edit";
      }
      window.localStorage.setItem("tasks", list_el.innerHTML);
    });
  });
});
