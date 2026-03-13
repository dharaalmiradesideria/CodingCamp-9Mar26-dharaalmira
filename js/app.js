// Productivity Dashboard Application
// Component-based vanilla JavaScript application

// ============================================================================
// Greeting Component
// ============================================================================
class GreetingComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.intervalId = null;
  }

  init() {
    this.updateDisplay();
    this.intervalId = setInterval(() => this.updateDisplay(), 1000);
  }

  updateDisplay() {
    const now = new Date();
    const hour = now.getHours();
    
    const greetingElement = this.container.querySelector('.greeting-message');
    const timeElement = this.container.querySelector('.current-time');
    const dateElement = this.container.querySelector('.current-date');
    
    if (greetingElement) {
      greetingElement.textContent = this.getGreeting(hour);
    }
    if (timeElement) {
      timeElement.textContent = this.formatTime(now);
    }
    if (dateElement) {
      dateElement.textContent = this.formatDate(now);
    }
  }

  getGreeting(hour) {
    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  }

  formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    
    return `${hours}:${minutesStr}:${secondsStr} ${ampm}`
  }

  formatDate(date) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${dayOfWeek}, ${month} ${day}`;
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// ============================================================================
// Focus Timer Component
// ============================================================================
class FocusTimerComponent {
  constructor(containerElement) {
    this.container = containerElement;
    this.totalSeconds = 1500; // 25 minutes
    this.remainingSeconds = 1500;
    this.isRunning = false;
    this.intervalId = null;
  }

  init() {
    // Get button elements
    const startBtn = document.getElementById('timer-start');
    const stopBtn = document.getElementById('timer-stop');
    const resetBtn = document.getElementById('timer-reset');

    if (!startBtn || !stopBtn || !resetBtn) {
      console.error('Timer button elements not found');
      return;
    }

    // Attach event listeners
    startBtn.addEventListener('click', () => this.start());
    stopBtn.addEventListener('click', () => this.stop());
    resetBtn.addEventListener('click', () => this.reset());

    // Initial render
    this.render();
  }

  start() {
    if (this.isRunning) {
      return; // Already running
    }

    this.isRunning = true;
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (!this.isRunning) {
      return; // Already stopped
    }

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.remainingSeconds = this.totalSeconds;
    this.render();
  }

  tick() {
    if (this.remainingSeconds > 0) {
      this.remainingSeconds--;
      this.render();
    } else {
      // Timer reached zero, stop countdown
      this.stop();
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secsStr = secs < 10 ? '0' + secs : secs;
    return `${minutesStr}:${secsStr}`;
  }

  render() {
    const timerDisplay = this.container.querySelector('.timer-display');
    if (timerDisplay) {
      timerDisplay.textContent = this.formatTime(this.remainingSeconds);
    }
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}


// ============================================================================
// Task List Component
// ============================================================================
class TaskListComponent {
  constructor(containerElement, storageKey) {
    this.container = containerElement;
    this.storageKey = storageKey;
    this.tasks = [];
  }

  init() {
    this.loadTasks();
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    const taskInput = this.container.querySelector('#task-input');
    const addButton = this.container.querySelector('#task-add');
    const sortButton = this.container.querySelector('#task-sort');

    if (!taskInput || !addButton) {
      console.error('Task input elements not found');
      return;
    }

     // Sort tasks button
  if (sortButton) {
    sortButton.addEventListener('click', () => {
      this.sortTasks();
    });
  }

    addButton.addEventListener('click', () => {
      const text = taskInput.value;
      if (this.addTask(text)) {
        taskInput.value = '';
      }
    });

    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = taskInput.value;
        if (this.addTask(text)) {
          taskInput.value = '';
        }
      }
    });
  }

  loadTasks() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        // Validate that parsed data is an array
        if (Array.isArray(parsed)) {
          this.tasks = parsed;
        } else {
          console.error('Invalid task data format in Local Storage, initializing empty list');
          this.tasks = [];
        }
      } else {
        this.tasks = [];
      }
    } catch (error) {
      console.error('Failed to load tasks from Local Storage:', error);
      this.tasks = [];
    }
  }

  saveTasks() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('Local Storage quota exceeded. Unable to save tasks.');
        alert('Storage limit reached. Please delete some tasks to free up space.');
      } else {
        console.error('Failed to save tasks to Local Storage:', error);
      }
    }
  }


  addTask(text) {
      const trimmedText = text.trim();

      if (!trimmedText) {
        console.error('Task text cannot be empty');
        return false;
      }

       // Prevent duplicate tasks
  const isDuplicate = this.tasks.some(task =>
    task.text.toLowerCase() === trimmedText.toLowerCase()
  );

  if (isDuplicate) {
    alert("Task already exists!");
    return false;
  }

      if (trimmedText.length > 500) {
        console.error('Task text cannot exceed 500 characters');
        return false;
      }

      const newTask = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
        text: trimmedText,
        completed: false,
        createdAt: Date.now()
      };

      this.tasks.push(newTask);
      this.saveTasks();
      this.render();

      return true;
    }


  editTask(id, newText) {
    const trimmedText = newText.trim();
    
    if (!trimmedText) {
      console.error('Task text cannot be empty');
      return false;
    }
    
    if (trimmedText.length > 500) {
      console.error('Task text cannot exceed 500 characters');
      return false;
    }
    
    const task = this.tasks.find(t => t.id === id);
    
    if (!task) {
      console.error('Task not found with id:', id);
      return false;
    }
    
    task.text = trimmedText;
    this.saveTasks();
    this.render();
    
    return true;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    
    if (index === -1) {
      console.error('Task not found with id:', id);
      return false;
    }
    
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.render();
    
    return true;
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    
    if (!task) {
      console.error('Task not found with id:', id);
      return false;
    }
    
    task.completed = !task.completed;
    this.saveTasks();
    this.render();
    
    return true;
  }

  sortTasks() {
  this.tasks.sort((a, b) => b.createdAt - a.createdAt);
  this.render();
}

  render() {
    const taskListContainer = this.container.querySelector('.task-list');
    if (!taskListContainer) {
      console.error('Task list container not found');
      return;
    }

    taskListContainer.innerHTML = '';

    this.tasks.forEach(task => {
      const taskElement = this.renderTask(task);
      taskListContainer.appendChild(taskElement);
    });
  }

  renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('data-task-id', task.id);
    
    if (task.completed) {
      li.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      this.toggleTask(task.id);
    });

    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    const editButton = document.createElement('button');
    editButton.className = 'task-edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText !== null) {
        this.editTask(task.id, newText);
      }
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'task-delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      if (confirm(`Delete task "${task.text}"?`)) {
        this.deleteTask(task.id);
      }
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
  }

  destroy() {
    // Cleanup if needed
  }
}

// ============================================================================
// Quick Links Component
// ============================================================================
class QuickLinksComponent {
  constructor(containerElement, storageKey) {
    this.container = containerElement;
    this.storageKey = storageKey;
    this.links = [];
  }

  init() {
    this.loadLinks();
    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    // Get input elements and add button
    const nameInput = this.container.querySelector('#link-name');
    const urlInput = this.container.querySelector('#link-url');
    const addButton = this.container.querySelector('#link-add');

    if (!nameInput || !urlInput || !addButton) {
      console.error('Link input elements not found');
      return;
    }

    // Add button click handler
    addButton.addEventListener('click', () => {
      const name = nameInput.value;
      const url = urlInput.value;

      if (this.addLink(name, url)) {
        // Clear inputs on successful add
        nameInput.value = '';
        urlInput.value = '';
      }
    });

    // Enter key handler for name input
    nameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        urlInput.focus(); // Move to URL input
      }
    });

    // Enter key handler for URL input
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const name = nameInput.value;
        const url = urlInput.value;

        if (this.addLink(name, url)) {
          // Clear inputs on successful add
          nameInput.value = '';
          urlInput.value = '';
          nameInput.focus(); // Return focus to name input
        }
      }
    });
  }

  loadLinks() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        // Validate that parsed data is an array
        if (Array.isArray(parsed)) {
          this.links = parsed;
        } else {
          console.error('Invalid links data format in Local Storage, initializing empty list');
          this.links = [];
        }
      } else {
        this.links = [];
      }
    } catch (error) {
      console.error('Failed to load links from Local Storage:', error);
      this.links = [];
    }
  }

  saveLinks() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.links));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        console.error('Local Storage quota exceeded. Unable to save links.');
        alert('Storage limit reached. Please delete some links to free up space.');
      } else {
        console.error('Failed to save links to Local Storage:', error);
      }
    }
  }


  addLink(name, url) {
    // Validate name: must be non-empty after trimming, max 100 characters
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length === 0) {
      console.error('Link name cannot be empty');
      return false;
    }
    if (trimmedName.length > 100) {
      console.error('Link name cannot exceed 100 characters');
      return false;
    }

    // Validate URL: must start with http:// or https://
    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      console.error('URL must start with http:// or https://');
      return false;
    }

    // Create new link object
    const newLink = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
      name: trimmedName,
      url: trimmedUrl,
      createdAt: Date.now()
    };

    // Add to links array
    this.links.push(newLink);

    // Persist to Local Storage
    this.saveLinks();

    // Re-render the list
    this.render();

    return true;
  }

  editLink(id, newName, newUrl) {
    // Find the link by id
    const linkIndex = this.links.findIndex(link => link.id === id);
    if (linkIndex === -1) {
      console.error('Link not found with id:', id);
      return false;
    }

    // Validate new name: must be non-empty after trimming, max 100 characters
    const trimmedName = newName.trim();
    if (!trimmedName || trimmedName.length === 0) {
      console.error('Link name cannot be empty');
      return false;
    }
    if (trimmedName.length > 100) {
      console.error('Link name cannot exceed 100 characters');
      return false;
    }

    // Validate new URL: must start with http:// or https://
    const trimmedUrl = newUrl.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      console.error('URL must start with http:// or https://');
      return false;
    }

    // Update the link
    this.links[linkIndex].name = trimmedName;
    this.links[linkIndex].url = trimmedUrl;

    // Persist to Local Storage
    this.saveLinks();

    // Re-render the list
    this.render();

    return true;
  }

  deleteLink(id) {
    // Find the link by id
    const linkIndex = this.links.findIndex(link => link.id === id);
    if (linkIndex === -1) {
      console.error('Link not found with id:', id);
      return false;
    }

    // Remove the link from array
    this.links.splice(linkIndex, 1);

    // Persist to Local Storage
    this.saveLinks();

    // Re-render the list
    this.render();

    return true;
  }

  render() {
    // Get the link list container
    const linkListContainer = this.container.querySelector('.link-list');
    if (!linkListContainer) {
      console.error('Link list container not found');
      return;
    }

    // Clear existing links
    linkListContainer.innerHTML = '';

    // Render each link
    this.links.forEach(link => {
      const linkElement = this.renderLink(link);
      linkListContainer.appendChild(linkElement);
    });
  }

  renderLink(link) {
    // Create list item
    const li = document.createElement('li');
    li.className = 'link-item';
    li.setAttribute('data-link-id', link.id);

    // Create anchor element with target="_blank" for new tab behavior
    const anchor = document.createElement('a');
    anchor.href = link.url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer'; // Security best practice
    anchor.className = 'link-anchor';
    anchor.textContent = link.name;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.className = 'link-edit';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const newName = prompt('Edit link name:', link.name);
      if (newName !== null) {
        const newUrl = prompt('Edit link URL:', link.url);
        if (newUrl !== null) {
          this.editLink(link.id, newName, newUrl);
        }
      }
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'link-delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      if (confirm(`Delete link "${link.name}"?`)) {
        this.deleteLink(link.id);
      }
    });

    // Append all elements to list item
    li.appendChild(anchor);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
  }

  destroy() {
    // Cleanup if needed
  }
}

// ============================================================================
// Application Controller
// ============================================================================
class App {
  constructor() {
    this.components = {};
  }

  init() {
    try {
      this.initializeComponents();
    } catch (error) {
      console.error('Failed to initialize application:', error);
    }
  }

  initializeComponents() {
    // Initialize Greeting Component
    try {
      const greetingContainer = document.getElementById('greeting-section');
      if (greetingContainer) {
        this.components.greeting = new GreetingComponent(greetingContainer);
        this.components.greeting.init();
      }
    } catch (error) {
      console.error('Failed to initialize Greeting Component:', error);
    }

    // Initialize Focus Timer Component
    try {
      const timerContainer = document.getElementById('timer-section');
      if (timerContainer) {
        this.components.timer = new FocusTimerComponent(timerContainer);
        this.components.timer.init();
      }
    } catch (error) {
      console.error('Failed to initialize Focus Timer Component:', error);
    }

    // Initialize Task List Component
    try {
      const tasksContainer = document.getElementById('tasks-section');
      if (tasksContainer) {
        this.components.tasks = new TaskListComponent(tasksContainer, 'productivity-dashboard-tasks');
        this.components.tasks.init();
      }
    } catch (error) {
      console.error('Failed to initialize Task List Component:', error);
    }

    // Initialize Quick Links Component
    try {
      const linksContainer = document.getElementById('links-section');
      if (linksContainer) {
        this.components.links = new QuickLinksComponent(linksContainer, 'productivity-dashboard-links');
        this.components.links.init();
      }
    } catch (error) {
      console.error('Failed to initialize Quick Links Component:', error);
    }
  }


  destroy() {
    Object.values(this.components).forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });
  }
}

// ============================================================================
// Application Initialization
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});

// ============================================================================
// Dark Mode Toggle
// ============================================================================
const themeToggle = document.getElementById('theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}
