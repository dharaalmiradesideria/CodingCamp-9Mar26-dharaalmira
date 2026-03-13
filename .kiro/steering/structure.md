# Project Structure

## Directory Layout

```
productivity-dashboard/
├── index.html          # Single HTML entry point
├── css/
│   └── styles.css      # All application styles
├── js/
│   └── app.js          # All application logic
├── .kiro/
│   ├── specs/
│   │   └── productivity-dashboard/
│   │       ├── requirements.md
│   │       ├── design.md
│   │       └── tasks.md
│   └── steering/       # This directory
└── README.md
```

## Architecture Patterns

### Component-Based Organization

The application follows a modular component pattern where `js/app.js` contains:

1. **GreetingComponent**: Time and date display with time-based greeting
2. **FocusTimerComponent**: 25-minute countdown timer
3. **TaskListComponent**: To-do list with CRUD operations
4. **QuickLinksComponent**: Favorite links manager
5. **App**: Main controller that initializes all components

### Component Structure

Each component class follows this pattern:

```javascript
class ComponentName {
  constructor(containerElement, ...config) {
    // Store references and initial state
  }
  
  init() {
    // Load data, set up event listeners, initial render
  }
  
  // State management methods
  loadData() { /* Load from Local Storage */ }
  saveData() { /* Persist to Local Storage */ }
  
  // Business logic methods
  // (add, edit, delete, toggle, etc.)
  
  render() {
    // Update DOM based on current state
  }
  
  destroy() {
    // Clean up intervals and event listeners
  }
}
```

## File Organization Rules

- **Single-file constraint**: All HTML in `index.html`, all CSS in `css/styles.css`, all JS in `js/app.js`
- **No build tools**: Files are served directly without compilation or bundling
- **No external dependencies**: No npm packages, CDN imports, or third-party libraries
- **Component order in app.js**: Define component classes first, then App controller, then initialization code

## Naming Conventions

- **Classes**: PascalCase (e.g., `GreetingComponent`, `TaskListComponent`)
- **Methods**: camelCase (e.g., `addTask`, `formatTime`)
- **DOM IDs**: kebab-case (e.g., `greeting-section`, `task-input`)
- **CSS classes**: kebab-case (e.g., `.task-item`, `.timer-display`)
- **Local Storage keys**: kebab-case with prefix (e.g., `productivity-dashboard-tasks`)
