// Professional To-Do & Notes App with localStorage, search, pin, dark mode

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');
  const clearBtn = document.getElementById('clear-all');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let filter = 'all';
  let search = '';

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    list.innerHTML = '';
    let filtered = tasks
      .filter(task => filter === 'all' ? true : filter === 'active' ? !task.completed : task.completed)
      .filter(task => task.text.toLowerCase().includes(search.toLowerCase()));
    // Pinned first
    filtered.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
    filtered.forEach((task, idx) => {
      const li = document.createElement('li');
      li.className = (task.completed ? 'completed ' : '') + (task.pinned ? 'pinned' : '');
      li.style.animation = 'fadeIn 0.4s';

      const pinBtn = document.createElement('button');
      pinBtn.className = 'pin-btn';
      pinBtn.title = task.pinned ? 'Unpin' : 'Pin';
      pinBtn.innerHTML = task.pinned ? '★' : '☆';
      pinBtn.addEventListener('click', () => {
        task.pinned = !task.pinned;
        saveTasks();
        renderTasks();
      });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.title = 'Mark as completed';
      checkbox.addEventListener('change', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      const text = document.createElement('span');
      text.className = 'text';
      text.textContent = task.text;
      text.contentEditable = true;
      text.spellcheck = false;
      text.title = 'Edit task/note';
      text.addEventListener('blur', () => {
        task.text = text.textContent.trim();
        saveTasks();
        renderTasks();
      });
      text.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          text.blur();
        }
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'delete-btn';
      delBtn.title = 'Delete task/note';
      delBtn.addEventListener('click', () => {
        li.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
          tasks.splice(tasks.indexOf(task), 1);
          saveTasks();
          renderTasks();
        }, 250);
      });

      li.appendChild(pinBtn);
      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      tasks.push({ text: val, completed: false, pinned: false });
      saveTasks();
      input.value = '';
      renderTasks();
    }
  });

  clearBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      renderTasks();
    });
  });

  searchInput.addEventListener('input', () => {
    search = searchInput.value;
    renderTasks();
  });

  // Dark mode
  if(localStorage.getItem('todoDarkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('todoDarkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
  });

  renderTasks();
});

// Animations & Styles
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
@keyframes fadeOut { from { opacity: 1; transform: translateY(0);} to { opacity: 0; transform: translateY(20px);} }
li.completed .text { text-decoration: line-through; color: #aaa; }
li.pinned { background: #fffbe6; border-left: 4px solid #ffd700; }
.pin-btn { background: none; border: none; font-size: 1.2em; color: #ffd700; cursor: pointer; margin-right: 0.7em; transition: color 0.2s; }
.pin-btn:hover { color: #ff6347; }
.dark-mode li.pinned { background: #23243a; border-left: 4px solid #ffd700; }
`;
document.head.appendChild(style);
