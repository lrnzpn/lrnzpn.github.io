export const dom = {
  query(selector, context = document) {
    return context.querySelector(selector);
  },

  queryAll(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  },

  create(tag, attributes = {}, ...children) {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        const event = key.substring(2).toLowerCase();
        element.addEventListener(event, value);
      } else if (key === 'dataset' && typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => {
          element.dataset[k] = v;
        });
      } else {
        element.setAttribute(key, value);
      }
    });

    children.flat().forEach(child => {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (child !== null && child !== undefined) {
        element.appendChild(document.createTextNode(String(child)));
      }
    });

    return element;
  },

  addClass(element, ...classes) {
    element.classList.add(...classes);
  },

  removeClass(element, ...classes) {
    element.classList.remove(...classes);
  },

  toggleClass(element, className, force) {
    return element.classList.toggle(className, force);
  },

  hasClass(element, className) {
    return element.classList.contains(className);
  },

  setAttributes(element, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  },

  removeAttributes(element, ...attributes) {
    attributes.forEach(attr => element.removeAttribute(attr));
  },

  on(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  },

  off(element, event, handler, options) {
    element.removeEventListener(event, handler, options);
  },

  delegate(parent, selector, event, handler) {
    const delegateHandler = e => {
      const target = e.target.closest(selector);
      if (target && parent.contains(target)) {
        handler.call(target, e);
      }
    };
    parent.addEventListener(event, delegateHandler);
    return () => parent.removeEventListener(event, delegateHandler);
  },

  empty(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  isVisible(element) {
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  },

  getOffset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height,
    };
  },
};
