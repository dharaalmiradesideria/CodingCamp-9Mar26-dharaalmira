// Node.js test script for Task 6.2 - Link CRUD Operations
// This simulates the browser environment for testing

// Mock localStorage
const localStorage = {
  storage: {},
  getItem(key) {
    return this.storage[key] || null;
  },
  setItem(key, value) {
    this.storage[key] = value;
  },
  removeItem(key) {
    delete this.storage[key];
  },
  clear() {
    this.storage = {};
  }
};

// Mock console for capturing errors
const originalConsoleError = console.error;
let consoleErrors = [];
console.error = (...args) => {
  consoleErrors.push(args.join(' '));
};

// QuickLinksComponent class (copied from app.js)
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
      } else {
        console.error('Failed to save links to Local Storage:', error);
      }
    }
  }

  addLink(name, url) {
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length === 0) {
      console.error('Link name cannot be empty');
      return false;
    }
    if (trimmedName.length > 100) {
      console.error('Link name cannot exceed 100 characters');
      return false;
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      console.error('URL must start with http:// or https://');
      return false;
    }

    const newLink = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: trimmedName,
      url: trimmedUrl,
      createdAt: Date.now()
    };

    this.links.push(newLink);
    this.saveLinks();
    return true;
  }

  editLink(id, newName, newUrl) {
    const linkIndex = this.links.findIndex(link => link.id === id);
    if (linkIndex === -1) {
      console.error('Link not found with id:', id);
      return false;
    }

    const trimmedName = newName.trim();
    if (!trimmedName || trimmedName.length === 0) {
      console.error('Link name cannot be empty');
      return false;
    }
    if (trimmedName.length > 100) {
      console.error('Link name cannot exceed 100 characters');
      return false;
    }

    const trimmedUrl = newUrl.trim();
    if (!trimmedUrl.startsWith('http://') && !trimmedUrl.startsWith('https://')) {
      console.error('URL must start with http:// or https://');
      return false;
    }

    this.links[linkIndex].name = trimmedName;
    this.links[linkIndex].url = trimmedUrl;
    this.saveLinks();
    return true;
  }

  deleteLink(id) {
    const linkIndex = this.links.findIndex(link => link.id === id);
    if (linkIndex === -1) {
      console.error('Link not found with id:', id);
      return false;
    }

    this.links.splice(linkIndex, 1);
    this.saveLinks();
    return true;
  }
}

// Test runner
let passCount = 0;
let failCount = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✓ PASS: ${testName}`);
    passCount++;
  } else {
    console.log(`✗ FAIL: ${testName}`);
    failCount++;
  }
  consoleErrors = []; // Reset errors after each test
}

function createTestComponent() {
  localStorage.clear();
  const storageKey = 'test-links-' + Date.now();
  const component = new QuickLinksComponent({}, storageKey);
  return { component, storageKey };
}

console.log('=== Testing Task 6.2: Link CRUD Operations ===\n');

// Test 1: addLink with valid data
{
  const { component } = createTestComponent();
  const result = component.addLink('GitHub', 'https://github.com');
  assert(
    result === true && 
    component.links.length === 1 && 
    component.links[0].name === 'GitHub' && 
    component.links[0].url === 'https://github.com',
    'addLink() with valid data'
  );
}

// Test 2: addLink with empty name
{
  const { component } = createTestComponent();
  const result = component.addLink('   ', 'https://example.com');
  assert(
    result === false && component.links.length === 0,
    'addLink() rejects empty name'
  );
}

// Test 3: addLink with name > 100 chars
{
  const { component } = createTestComponent();
  const longName = 'a'.repeat(101);
  const result = component.addLink(longName, 'https://example.com');
  assert(
    result === false && component.links.length === 0,
    'addLink() rejects name > 100 characters'
  );
}

// Test 4: addLink with invalid URL (no http/https)
{
  const { component } = createTestComponent();
  const result = component.addLink('Example', 'www.example.com');
  assert(
    result === false && component.links.length === 0,
    'addLink() rejects URL without http:// or https://'
  );
}

// Test 5: addLink with http:// URL
{
  const { component } = createTestComponent();
  const result = component.addLink('Example', 'http://example.com');
  assert(
    result === true && component.links[0].url === 'http://example.com',
    'addLink() accepts http:// URL'
  );
}

// Test 6: editLink with valid data
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  const result = component.editLink(linkId, 'GitLab', 'https://gitlab.com');
  assert(
    result === true && 
    component.links[0].name === 'GitLab' && 
    component.links[0].url === 'https://gitlab.com',
    'editLink() with valid data'
  );
}

// Test 7: editLink with invalid id
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const result = component.editLink('invalid-id', 'GitLab', 'https://gitlab.com');
  assert(
    result === false && component.links[0].name === 'GitHub',
    'editLink() rejects invalid id'
  );
}

// Test 8: editLink with empty name
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  const result = component.editLink(linkId, '  ', 'https://gitlab.com');
  assert(
    result === false && component.links[0].name === 'GitHub',
    'editLink() rejects empty name'
  );
}

// Test 9: editLink with invalid URL
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  const result = component.editLink(linkId, 'GitLab', 'ftp://gitlab.com');
  assert(
    result === false && component.links[0].url === 'https://github.com',
    'editLink() rejects invalid URL'
  );
}

// Test 10: deleteLink with valid id
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  const result = component.deleteLink(linkId);
  assert(
    result === true && component.links.length === 0,
    'deleteLink() with valid id'
  );
}

// Test 11: deleteLink with invalid id
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const result = component.deleteLink('invalid-id');
  assert(
    result === false && component.links.length === 1,
    'deleteLink() rejects invalid id'
  );
}

// Test 12: Verify saveLinks() is called after addLink
{
  const { component, storageKey } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const saved = localStorage.getItem(storageKey);
  const parsed = JSON.parse(saved);
  assert(
    parsed.length === 1 && parsed[0].name === 'GitHub',
    'saveLinks() called after addLink()'
  );
}

// Test 13: Verify saveLinks() is called after editLink
{
  const { component, storageKey } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  component.editLink(linkId, 'GitLab', 'https://gitlab.com');
  const saved = localStorage.getItem(storageKey);
  const parsed = JSON.parse(saved);
  assert(
    parsed[0].name === 'GitLab',
    'saveLinks() called after editLink()'
  );
}

// Test 14: Verify saveLinks() is called after deleteLink
{
  const { component, storageKey } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const linkId = component.links[0].id;
  component.deleteLink(linkId);
  const saved = localStorage.getItem(storageKey);
  const parsed = JSON.parse(saved);
  assert(
    parsed.length === 0,
    'saveLinks() called after deleteLink()'
  );
}

// Test 15: Verify link object structure
{
  const { component } = createTestComponent();
  component.addLink('GitHub', 'https://github.com');
  const link = component.links[0];
  assert(
    link.id && 
    link.name === 'GitHub' && 
    link.url === 'https://github.com' && 
    link.createdAt && 
    typeof link.createdAt === 'number',
    'Link object has correct structure (id, name, url, createdAt)'
  );
}

// Summary
console.log('\n=== Test Summary ===');
console.log(`Total: ${passCount + failCount}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);

if (failCount === 0) {
  console.log('\n✓ All tests passed!');
  process.exit(0);
} else {
  console.log('\n✗ Some tests failed');
  process.exit(1);
}
