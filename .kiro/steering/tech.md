# Technology Stack

## Core Technologies

- **HTML5**: Semantic markup for structure
- **CSS3**: Styling with modern features (flexbox/grid, CSS variables)
- **Vanilla JavaScript (ES6+)**: No frameworks or libraries

## Browser Support

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Build System

**None required** - This is a static web application with no build step. Files can be opened directly in a browser or served via any static file server.

## Development Commands

Since this is a vanilla JavaScript project with no build tools:

```bash
# Serve locally (if you have Python installed)
python -m http.server 8000

# Or use Node.js http-server (if installed globally)
npx http-server -p 8000

# Then open http://localhost:8000 in your browser
```

## Testing

No test framework is currently configured. If tests are added, consider:
- Jest for unit testing
- Playwright or Cypress for integration testing

## Data Persistence

- **Local Storage API**: Browser-native key-value storage
- **Storage Keys**: 
  - `productivity-dashboard-tasks`: Task array
  - `productivity-dashboard-links`: Links array
- **Format**: JSON-serialized arrays

## Code Conventions

- Use ES6+ features (classes, arrow functions, template literals, destructuring)
- Use `const` and `let`, never `var`
- Component-based architecture with class-based modules
- Each component manages its own state, rendering, and persistence
- No global state - components are self-contained
