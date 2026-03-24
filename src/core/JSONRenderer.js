import DOMPurify from 'dompurify';

export class JSONRenderer {
  constructor(options = {}) {
    this.sanitize = options.sanitize !== false;
    this.allowedTags = options.allowedTags || null;
    this.allowedAttributes = options.allowedAttributes || null;
    this._componentMap = new Map();
  }

  registerComponent(type, handler) {
    this._componentMap.set(type, handler);
  }

  render(schema, data = {}) {
    if (!schema) {
      console.error('Schema is required');
      return null;
    }

    if (typeof schema === 'string') {
      return this._createTextNode(schema, data);
    }

    if (Array.isArray(schema)) {
      return this._renderArray(schema, data);
    }

    if (typeof schema === 'object') {
      return this._renderObject(schema, data);
    }

    return null;
  }

  _renderObject(schema, data) {
    const { type, props = {}, children = [], component } = schema;

    if (component && this._componentMap.has(component)) {
      const handler = this._componentMap.get(component);
      return handler(schema, data, this);
    }

    if (!type) {
      console.error('Schema object must have a "type" property');
      return null;
    }

    const element = document.createElement(type);

    this._applyProps(element, props, data);

    if (children) {
      const childElements = this.render(children, data);
      if (childElements) {
        if (childElements instanceof DocumentFragment || childElements instanceof Node) {
          element.appendChild(childElements);
        }
      }
    }

    return element;
  }

  _renderArray(schemas, data) {
    const fragment = document.createDocumentFragment();

    schemas.forEach(schema => {
      const element = this.render(schema, data);
      if (element) {
        fragment.appendChild(element);
      }
    });

    return fragment;
  }

  _applyProps(element, props, data) {
    Object.entries(props).forEach(([key, value]) => {
      const resolvedValue = this._resolveValue(value, data);

      if (key === 'className' || key === 'class') {
        element.className = resolvedValue;
      } else if (key === 'style' && typeof resolvedValue === 'object') {
        Object.assign(element.style, resolvedValue);
      } else if (key === 'dataset' && typeof resolvedValue === 'object') {
        Object.entries(resolvedValue).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else if (key.startsWith('on') && typeof resolvedValue === 'function') {
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, resolvedValue);
      } else if (key === 'innerHTML') {
        element.innerHTML = this.sanitize
          ? DOMPurify.sanitize(resolvedValue, {
            ALLOWED_TAGS: this.allowedTags,
            ALLOWED_ATTR: this.allowedAttributes,
          })
          : resolvedValue;
      } else if (key === 'textContent') {
        element.textContent = resolvedValue;
      } else if (key.startsWith('aria')) {
        const ariaKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        element.setAttribute(ariaKey, resolvedValue);
      } else {
        element.setAttribute(key, resolvedValue);
      }
    });
  }

  _resolveValue(value, data) {
    if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
      const path = value.slice(2, -2).trim();
      return this._getValueByPath(data, path) || '';
    }

    if (typeof value === 'function') {
      return value(data);
    }

    return value;
  }

  _getValueByPath(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  _createTextNode(text, data) {
    const resolvedText = this._resolveValue(text, data);
    return document.createTextNode(
      this.sanitize ? DOMPurify.sanitize(resolvedText, { ALLOWED_TAGS: [] }) : resolvedText
    );
  }

  validate(schema) {
    if (!schema) return false;

    if (typeof schema === 'string') return true;

    if (Array.isArray(schema)) {
      return schema.every(item => this.validate(item));
    }

    if (typeof schema === 'object') {
      if (!schema.type && !schema.component) {
        console.error('Schema object must have either "type" or "component" property');
        return false;
      }
      return true;
    }

    return false;
  }
}

export const renderer = new JSONRenderer();
