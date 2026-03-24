export class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
    this.element = null;
    this.children = [];
    this._observers = [];
  }

  setState(newState) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.onStateChange(prevState, this.state);
    this._notifyObservers();
    this.render();
  }

  onStateChange(prevState, newState) {}

  subscribe(observer) {
    this._observers.push(observer);
    return () => {
      this._observers = this._observers.filter(obs => obs !== observer);
    };
  }

  _notifyObservers() {
    this._observers.forEach(observer => observer(this.state));
  }

  mount(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }
    if (!container) {
      console.error('Mount container not found');
      return;
    }
    this.element = this.render();
    if (this.element) {
      container.appendChild(this.element);
      this.onMount();
    }
  }

  unmount() {
    this.onUnmount();
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    this.children.forEach(child => child.unmount && child.unmount());
    this.children = [];
    this._observers = [];
  }

  onMount() {}

  onUnmount() {}

  render() {
    return document.createElement('div');
  }

  createElement(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key.startsWith('on') && typeof value === 'function') {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key === 'dataset' && typeof value === 'object') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else if (key === 'ariaLabel') {
        element.setAttribute('aria-label', value);
      } else if (key.startsWith('aria')) {
        const ariaKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        element.setAttribute(ariaKey, value);
      } else {
        element.setAttribute(key, value);
      }
    });

    children.flat().forEach(child => {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (child !== null && child !== undefined && child !== false) {
        element.appendChild(document.createTextNode(String(child)));
      }
    });

    return element;
  }

  createFragment(...children) {
    const fragment = document.createDocumentFragment();
    children.flat().forEach(child => {
      if (child instanceof Node) {
        fragment.appendChild(child);
      } else if (child !== null && child !== undefined && child !== false) {
        fragment.appendChild(document.createTextNode(String(child)));
      }
    });
    return fragment;
  }
}
