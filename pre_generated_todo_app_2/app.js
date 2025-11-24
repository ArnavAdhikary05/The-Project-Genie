// app.js - Core logic for Colorful Todo App
// ------------------------------------------------------------
// Data Model & Persistence
// ------------------------------------------------------------
/**
 * Task model
 * @typedef {Object} Task
 * @property {number} id - Unique identifier
 * @property {string} text - Task description
 * @property {boolean} completed - Completion state
 */

/** @type {Task[]} */
let tasks = [];

/** Load tasks from localStorage into the `tasks` array */
function loadTasks() {
  const data = localStorage.getItem('tasks');
  try {
    tasks = data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to parse tasks from localStorage', e);
    tasks = [];
  }
}

/** Save the current `tasks` array into localStorage */
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ------------------------------------------------------------
// UI Rendering
// ------------------------------------------------------------
/**
 * Render tasks into the #task-list element based on a filter.
 * @param {string} [filter='all'] - "all" | "active" | "completed"
 */
function renderTasks(filter = 'all') {
  const listEl = document.getElementById('task-list');
  if (!listEl) return;

  // Clear existing content
  listEl.innerHTML = '';

  const filtered = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // all
  });

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;
    li.draggable = true;

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.className = 'task-checkbox';
    checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
    li.appendChild(checkbox);

    // Text span
    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';
    if (task.completed) span.style.textDecoration = 'line-through';
    li.appendChild(span);

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✎'; // simple pencil icon
    editBtn.title = 'Edit task';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => {
      const newText = prompt('Edit task', task.text);
      if (newText !== null) editTask(task.id, newText.trim());
    });
    li.appendChild(editBtn);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.title = 'Delete task';
    delBtn.className = 'delete-btn';
    delBtn.addEventListener('click', () => deleteTask(task.id));
    li.appendChild(delBtn);

    // Drag handle (visual cue only)
    const dragHandle = document.createElement('span');
    dragHandle.textContent = '≡';
    dragHandle.title = 'Drag to reorder';
    dragHandle.className = 'drag-handle';
    li.appendChild(dragHandle);

    // Drag‑and‑Drop event listeners
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragover', handleDragOver);
    li.addEventListener('drop', handleDrop);
    li.addEventListener('dragend', handleDragEnd);

    listEl.appendChild(li);
  });
}

// ------------------------------------------------------------
// Task CRUD Handlers
// ------------------------------------------------------------
/** Add a new task with the given text */
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  const newTask = {
    id: Date.now(),
    text: trimmed,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks(currentFilter);
}

/** Edit an existing task's text */
function editTask(id, newText) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.text = newText;
  saveTasks();
  renderTasks(currentFilter);
}

/** Delete a task by id */
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks(currentFilter);
}

/** Toggle the completed flag of a task */
function toggleTaskCompletion(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  renderTasks(currentFilter);
}

// ------------------------------------------------------------
// Filter Logic
// ------------------------------------------------------------
let currentFilter = 'all';

function setupFilterNav() {
  const nav = document.getElementById('filter-nav');
  if (!nav) return;
  const items = nav.querySelectorAll('li[data-filter]');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const filter = item.dataset.filter;
      if (!filter) return;
      currentFilter = filter;
      // Update active class
      items.forEach(i => i.classList.toggle('active', i === item));
      renderTasks(currentFilter);
    });
    // Also support keyboard activation (Enter/Space)
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });
  });
}

// ------------------------------------------------------------
// Drag‑and‑Drop Reordering
// ------------------------------------------------------------
let draggedTaskId = null;

function handleDragStart(e) {
  const li = e.currentTarget;
  draggedTaskId = Number(li.dataset.id);
  e.dataTransfer.effectAllowed = 'move';
  // Some browsers require dataTransfer data to be set
  e.dataTransfer.setData('text/plain', draggedTaskId.toString());
  li.classList.add('dragging');
}

function handleDragOver(e) {
  e.preventDefault(); // Necessary to allow drop
  const li = e.currentTarget;
  if (li.classList.contains('dragging')) return; // ignore self
  li.classList.add('drag-over');
}

function handleDrop(e) {
  e.preventDefault();
  const targetLi = e.currentTarget;
  targetLi.classList.remove('drag-over');
  const targetId = Number(targetLi.dataset.id);
  if (draggedTaskId === null || draggedTaskId === targetId) return;

  // Reorder tasks array
  const fromIndex = tasks.findIndex(t => t.id === draggedTaskId);
  const toIndex = tasks.findIndex(t => t.id === targetId);
  if (fromIndex === -1 || toIndex === -1) return;

  const [moved] = tasks.splice(fromIndex, 1);
  // Insert before the target index if dragging downwards, otherwise after
  const insertAt = fromIndex < toIndex ? toIndex : toIndex;
  tasks.splice(insertAt, 0, moved);

  saveTasks();
  renderTasks(currentFilter);
}

function handleDragEnd(e) {
  const li = e.currentTarget;
  li.classList.remove('dragging');
  // Clean any lingering drag-over classes
  document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  draggedTaskId = null;
}

// ------------------------------------------------------------
// Initialisation
// ------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  currentFilter = 'all';
  renderTasks(currentFilter);
  setupFilterNav();

  const addBtn = document.getElementById('add-task-btn');
  const input = document.getElementById('new-task-input');

  if (addBtn && input) {
    addBtn.addEventListener('click', () => {
      addTask(input.value);
      input.value = '';
      input.focus();
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        addBtn.click();
      }
    });
  }
});
