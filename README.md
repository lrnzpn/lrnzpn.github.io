# Vanilla Architecture Portfolio

[![CI/CD Pipeline](https://github.com/lrnzpn/portfolio/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/lrnzpn/portfolio/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> Production-grade personal portfolio demonstrating senior frontend engineering practices using vanilla JavaScript

## 🎯 Project Overview

This portfolio showcases a **schema-driven component architecture** built entirely with vanilla JavaScript, demonstrating enterprise-level frontend engineering without relying on frameworks. It implements modern web development best practices including:

- Component-based architecture with ES6 classes
- JSON-driven templating engine
- Custom routing and state management
- Comprehensive design system (BEM + SCSS)
- Full accessibility compliance (WCAG 2.1 AA)
- Security-first approach (XSS prevention, CSP headers)
- Performance optimization (< 40KB bundle, lazy loading)
- Automated CI/CD pipeline

## 🏗️ Architecture

### Core Framework

```
src/core/
├── Component.js          # Base component class with lifecycle methods
├── Router.js             # Client-side routing with hash/history API
├── StateManager.js       # Observable state management
├── ComponentRegistry.js  # Factory pattern for component instantiation
├── JSONRenderer.js       # Schema-to-DOM renderer with sanitization
└── EventBus.js          # Event-driven communication
```

### Design System (7-1 SCSS Architecture)

```
src/styles/
├── abstracts/           # Variables, mixins, functions
├── base/                # Reset, typography, utilities
├── components/          # Button, card, input components
├── layout/              # Header, footer layouts
└── pages/               # Page-specific styles
```

### Component Hierarchy

```
Atoms (Button, Card)
  ↓
Molecules (Header, Footer)
  ↓
Organisms (Hero, ProjectGrid)
  ↓
Pages (HomePage, AboutPage, ProjectsPage, ContactPage)
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/lrnzpn/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:3000`

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build production bundle with optimizations |
| `npm test` | Run unit tests with Jest |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |
| `npm run lint` | Run ESLint and Stylelint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run analyze` | Analyze bundle size |

## 📦 Build Output

Production build generates:

- **main.[hash].js** - Main application bundle (< 40KB gzipped)
- **vendors.[hash].js** - Third-party dependencies
- **main.[hash].css** - Compiled and minified styles
- **runtime.[hash].js** - Webpack runtime

All files include content hashing for cache busting.

## 🎨 Design System

### Color Tokens

```scss
$color-primary: #2563eb;
$color-secondary: #7c3aed;
$color-accent: #f59e0b;
```

### Spacing Scale (8px base)

```scss
$spacing-xs: 4px
$spacing-sm: 8px
$spacing-md: 16px
$spacing-lg: 24px
$spacing-xl: 32px
```

### Typography

- **Font Family**: System font stack for optimal performance
- **Fluid Typography**: Responsive font sizes using `clamp()`
- **Line Heights**: 1.25 (tight), 1.5 (normal), 1.75 (relaxed)

## 🔒 Security Features

### XSS Prevention

- **DOMPurify** integration for all user-generated content
- HTML entity encoding for dynamic content
- Input validation with whitelist approach

### Security Headers

```http
Content-Security-Policy: default-src 'self'; script-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

### Data Sanitization

All JSON data is sanitized before rendering:

```javascript
import { dataService } from '@services/DataService.js';
const data = await dataService.loadPortfolioData(); // Auto-sanitized
```

## ♿ Accessibility

### WCAG 2.1 Level AA Compliance

- ✅ Semantic HTML5 elements
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Color contrast ratio >= 4.5:1
- ✅ Skip navigation links
- ✅ Focus visible indicators
- ✅ Reduced motion support

### Usage Example

```javascript
import { a11y } from '@utils/accessibility.js';

// Announce to screen readers
a11y.announceToScreenReader('Form submitted successfully', 'polite');

// Trap focus in modal
const cleanup = a11y.trapFocus(modalElement);

// Check user preferences
if (a11y.hasReducedMotion()) {
  // Disable animations
}
```

## ⚡ Performance Optimization

### Metrics Targets

| Metric | Target | Actual |
|--------|--------|--------|
| First Contentful Paint | < 1.8s | ✅ |
| Largest Contentful Paint | < 2.5s | ✅ |
| First Input Delay | < 100ms | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |
| Bundle Size (gzipped) | < 40KB | ✅ |

### Optimization Techniques

1. **Code Splitting**: Route-based lazy loading
2. **Tree Shaking**: Dead code elimination
3. **Image Optimization**: WebP/AVIF with fallbacks
4. **Lazy Loading**: Intersection Observer for images
5. **Critical CSS**: Inlined above-the-fold styles
6. **Font Optimization**: WOFF2 with `font-display: swap`

## 🧪 Testing

### Unit Tests

```bash
npm test
```

Tests are written with Jest and @testing-library/dom:

```javascript
import { Component } from '@core/Component.js';

test('should update state', () => {
  const component = new Component();
  component.setState({ count: 1 });
  expect(component.state.count).toBe(1);
});
```

### Test Coverage

Current coverage: **70%+** across all metrics

```bash
npm run test:coverage
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

**CI Pipeline** (`.github/workflows/ci.yml`)
1. Lint & format check
2. Run unit tests
3. Build production bundle
4. Validate bundle size < 40KB
5. Deploy to GitHub Pages (main branch only)

**Lighthouse CI** (`.github/workflows/lighthouse.yml`)
- Automated performance audits on PRs
- Enforces performance budgets
- Generates accessibility reports

## 📁 Project Structure

```
vanilla-arch-portfolio/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── config/
│   ├── webpack.common.js   # Shared webpack config
│   ├── webpack.dev.js      # Development config
│   ├── webpack.prod.js     # Production config
│   ├── babel.config.js     # Babel configuration
│   ├── jest.config.js      # Jest configuration
│   └── .eslintrc.json      # ESLint rules
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── assets/             # Images, fonts, icons
│   ├── components/         # Reusable UI components
│   │   ├── atoms/          # Basic building blocks
│   │   ├── molecules/      # Composite components
│   │   └── organisms/      # Complex components
│   ├── core/               # Framework code
│   ├── data/               # JSON schemas and data
│   ├── pages/              # Page components
│   ├── services/           # Business logic
│   ├── styles/             # SCSS files (7-1 pattern)
│   ├── utils/              # Helper functions
│   └── index.js            # Application entry point
├── tests/
│   ├── __mocks__/          # Jest mocks
│   ├── core/               # Core framework tests
│   └── setup.js            # Test environment setup
├── package.json
└── README.md
```

## 🎓 Key Engineering Patterns

### 1. Component Pattern

```javascript
import { Component } from '@core/Component.js';

export class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return this.createElement('div', {}, 
      `Count: ${this.state.count}`
    );
  }

  onMount() {
    // Component mounted
  }

  onUnmount() {
    // Cleanup
  }
}
```

### 2. Observer Pattern (State Management)

```javascript
import { createStore } from '@core/StateManager.js';

const store = createStore({ user: null });

store.subscribe('user', (newUser, oldUser) => {
  console.log('User changed:', newUser);
});

store.setState({ user: { name: 'John' } });
```

### 3. Factory Pattern (Component Registry)

```javascript
import { registry } from '@core/ComponentRegistry.js';

registry.register('button', Button);
const button = registry.create('button', { text: 'Click me' });
```

### 4. JSON-Driven Rendering

```javascript
import { renderer } from '@core/JSONRenderer.js';

const schema = {
  type: 'div',
  props: { className: 'card' },
  children: [
    { type: 'h2', props: {}, children: '{{title}}' },
    { type: 'p', props: {}, children: '{{description}}' }
  ]
};

const element = renderer.render(schema, {
  title: 'Hello',
  description: 'World'
});
```

## 🌐 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)

Polyfills included for ES6+ features in legacy browsers.

## 📝 License

MIT © Lorenzo Pinaroc

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

## 📧 Contact

- **Email**: lorenzo@example.com
- **GitHub**: [@lrnzpn](https://github.com/lrnzpn)
- **LinkedIn**: [Lorenzo Pinaroc](https://linkedin.com/in/lrnzpn)

---

**Built with ❤️ using Vanilla JavaScript**
