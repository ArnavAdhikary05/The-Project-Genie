// script.js - Core logic for Simple To-Do App

// ------------------------------------------------------------
// Step 1: Data Model
// ------------------------------------------------------------
/**
 * Represents a single task.
 * @param {number} id - Unique identifier.
 * @param {string} text - Task description.
 * @param {boolean} [completed=false] - Completion status.
 */
class Task {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}
// Expose globally for debugging
window.Task = Task;

// ------------------------------------------------------------
// Step 2: Persistence Layer
// ------------------------------------------------------------
/**
 * Load tasks from localStorage.
 * @returns {Task[]} Array of Task instances.
 */
function loadTasks() {
  const raw = localStorage.getItem('todos');
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    // Ensure each object is turned into a Task instance
    return arr.map(item => new Task(item.id, item.text, item.completed));
  } catch (e) {
    console.error('Failed to parse tasks from localStorage', e);
    return [];
  }
}

/**
 * Save an array of tasks to localStorage.
 * @param {Task[]} tasks
 */
function saveTasks(tasks) {
  try {
    const serialized = JSON.stringify(tasks);
    localStorage.setItem('todos', serialized);
  } catch (e) {
    console.error('Failed to save tasks to localStorage', e);
  }
}

// ------------------------------------------------------------
// Step 3: UI Rendering Helpers
// ------------------------------------------------------------
/**
 * Create a DOM element representing a task.
 * @param {Task} task
 * @returns {HTMLElement}
 */
function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (task.completed) li.classList.add('completed');
  li.dataset.id = task.id;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'toggle';
  if (task.completed) checkbox.checked = true;

  // Text span
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-button';
  editBtn.textContent = 'Edit';

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-button';
  deleteBtn.textContent = 'Delete';

  // Assemble
  const leftContainer = document.createElement('div');
  leftContainer.style.display = 'flex';
  leftContainer.style.alignItems = 'center';
  leftContainer.appendChild(checkbox);
  leftContainer.appendChild(span);

  const rightContainer = document.createElement('div');
  rightContainer.appendChild(editBtn);
  rightContainer.appendChild(deleteBtn);

  li.appendChild(leftContainer);
  li.appendChild(rightContainer);

  return li;
}

/**
 * Render tasks based on the current filter.
 * @param {string} [filter='all'] - 'all', 'active', or 'completed'.
 */
function renderTasks(filter = 'all') {
  const tasks = loadTasks();
  const listEl = document.getElementById('task-list');
  if (!listEl) return;

  // Clear existing list
  listEl.innerHTML = '';

  // Filter tasks
  const filtered = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // all
  });

  // Append each task element
  filtered.forEach(task => {
    const el = createTaskElement(task);
    listEl.appendChild(el);
  });

  // Update items left count (active tasks)
  const itemsLeftEl = document.getElementById('items-left');
  if (itemsLeftEl) {
    const activeCount = tasks.filter(t => !t.completed).length;
    itemsLeftEl.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
  }
}

// ------------------------------------------------------------
// Step 4: Event Handlers
// ------------------------------------------------------------
let currentFilter = 'all'; // module‑level variable

/** Add a new task based on input value */
function handleAddTask() {
  const input = document.getElementById('task-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return; // ignore empty

  const tasks = loadTasks();
  const newTask = new Task(Date.now(), text, false);
  tasks.push(newTask);
  saveTasks(tasks);

  input.value = '';
  renderTasks(currentFilter);
}

/** Toggle completion status */
function handleToggleComplete(event) {
  const checkbox = event.target;
  const li = checkbox.closest('.task-item');
  if (!li) return;
  const id = Number(li.dataset.id);
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = checkbox.checked;
  saveTasks(tasks);
  renderTasks(currentFilter);
}

/** Edit task text */
function handleEditTask(event) {
  const btn = event.target;
  const li = btn.closest('.task-item');
  if (!li) return;
  const id = Number(li.dataset.id);
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  const newText = prompt('Edit task', task.text);
  if (newText === null) return; // cancelled
  const trimmed = newText.trim();
  if (trimmed) {
    task.text = trimmed;
    saveTasks(tasks);
    renderTasks(currentFilter);
  }
}

/** Delete a task */
function handleDeleteTask(event) {
  const btn = event.target;
  const li = btn.closest('.task-item');
  if (!li) return;
  const id = Number(li.dataset.id);
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
  renderTasks(currentFilter);
}

/** Change filter based on button click */
function handleFilterChange(event) {
  const btn = event.target;
  const filter = btn.dataset.filter;
  if (!filter) return;
  currentFilter = filter;

  // Update active class on filter buttons
  document.querySelectorAll('.filter-button').forEach(b => {
    b.classList.toggle('active', b === btn);
  });

  renderTasks(currentFilter);
}

/** Clear all completed tasks */
function handleClearCompleted() {
  const tasks = loadTasks().filter(t => !t.completed);
  saveTasks(tasks);
  renderTasks(currentFilter);
}

// ------------------------------------------------------------
// Step 5: Initialization
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Add task button
  const addBtn = document.getElementById('add-button');
  if (addBtn) addBtn.addEventListener('click', handleAddTask);

  // Enter key on input
  const input = document.getElementById('task-input');
  if (input) {
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTask();
      }
    });
  }

  // Delegated listeners for task list actions
  const list = document.getElementById('task-list');
  if (list) {
    list.addEventListener('change', e => {
      if (e.target && e.target.matches('.toggle')) {
        handleToggleComplete(e);
      }
    });
    list.addEventListener('click', e => {
      if (e.target) {
        if (e.target.matches('.edit-button')) {
          handleEditTask(e);
        } else if (e.target.matches('.delete-button')) {
          handleDeleteTask(e);
        }
      }
    });
  }

  // Filter buttons
  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.addEventListener('click', handleFilterChange);
  });

  // Clear completed button
  const clearBtn = document.getElementById('clear-completed');
  if (clearBtn) clearBtn.addEventListener('click', handleClearCompleted);

  // Initial render
  renderTasks(currentFilter);
});
