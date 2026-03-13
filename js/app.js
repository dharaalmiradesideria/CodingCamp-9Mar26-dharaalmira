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
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
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
    // Implementation pending
  }

  start() {
    // Implementation pending
  }

  stop() {
    // Implementation pending
  }

  reset() {
    // Implementation pending
  }

  tick() {
    // Implementation pending
  }

  formatTime(seconds) {
    // Implementation pending
  }

  render() {
    // Implementation pending
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
    this.loadLinks();
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
    // Implementation pending
  }

  editTask(id, newText) {
    // Implementation pending
  }

  deleteTask(id) {
    // Implementation pending
  }

  toggleTask(id) {
    // Implementation pending
  }

  render() {
    // Implementation pending
  }

  renderTask(task) {
    // Implementation pending
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
    // Implementation pending
  }

  editLink(id, newName, newUrl) {
    // Implementation pending
  }

  deleteLink(id) {
    // Implementation pending
  }

  render() {
    // Implementation pending
  }

  renderLink(link) {
    // Implementation pending
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
