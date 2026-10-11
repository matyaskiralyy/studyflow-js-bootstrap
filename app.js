"use strict";

/*
 * StudyFlow - tanulói kiinduló fájl
 *
 * A funkciók külön brancheken készülnek el:
 * 1. feature/feladatkezeles
 * 2. feature/szures-statisztika
 * 3. feature/adatmentes
 * 4. feature/bootstrap-felulet
 * 5. fix/ures-cim (választható)
 *
 * A pontos kódrészleteket a 03_TANULOI_UTMUTATO.md tartalmazza.
 */

// 1. DOM-elemek kiválasztása.

const taskForm = document.querySelector("#taskForm");
const titleInput = document.querySelector("#taskTitle");
const categoryInput = document.querySelector("#taskCategory");
const priorityInput = document.querySelector("#taskPriority");
const dueDateInput = document.querySelector("#taskDueDate");
const formMessage = document.querySelector("#formMessage");
const taskList = document.querySelector("#taskList");
const emptyState = document.querySelector("#emptyState");
const statusMessage = document.querySelector("#statusMessage");

let tasks = [];

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readTaskFromForm() {
  return {
    id: createId(),
    title: titleInput.value,
    category: categoryInput.value,
    priority: priorityInput.value,
    dueDate: dueDateInput.value,
    completed: false
  };
}

function createTaskElement(task) {
  const item = document.createElement("li");
  item.className = "task-item";
  item.classList.toggle("task-item--completed", task.completed);

  const title = document.createElement("h3");
  title.className = "task-title";
  title.textContent = task.title;

  // Készíts metaadatokat és műveleti gombokat is.
  return item;
}

function renderTasks() {
  taskList.replaceChildren(...tasks.map(createTaskElement));
  emptyState.classList.toggle("is-hidden", tasks.length > 0);
}

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTask = readTaskFromForm();

  if (newTask.title === "") {
    formMessage.textContent = "A feladat címének kitöltése kötelező.";
    return;
  }

  tasks.push(newTask);
  renderTasks();
  taskForm.reset();
});

taskList.addEventListener("click", function (event) {
  const actionButton = event.target.closest("button[data-action]");

  if (actionButton === null) {
    return;
  }

  const taskId = actionButton.dataset.id;

  if (actionButton.dataset.action === "toggle") {
    tasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
  }

  if (actionButton.dataset.action === "delete") {
    tasks = tasks.filter((task) => task.id !== taskId);
  }

  renderTasks();
});


// 2. Alkalmazásállapot: feladatok, szűrő és keresőkifejezés.


// 3. Adatbeolvasó, ellenőrző, formázó és renderelő függvények.


// 4. Eseménykezelők.


// 5. localStorage-kezelés és Bootstrap-komponensek.
