export class LazyLoader {
  constructor(options = {}) {
    this.options = {
      root: options.root || null,
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0.01,
      ...options,
    };

    this.observer = null;
    this.elements = new Set();
    this._init();
  }

  _init() {
    if (!('IntersectionObserver' in window)) {
      this._loadAllImmediately();
      return;
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this._loadElement(entry.target);
          this.observer.unobserve(entry.target);
          this.elements.delete(entry.target);
        }
      });
    }, this.options);
  }

  observe(element) {
    if (!element) return;

    if (!this.observer) {
      this._loadElement(element);
      return;
    }

    this.elements.add(element);
    this.observer.observe(element);
  }

  unobserve(element) {
    if (this.observer && element) {
      this.observer.unobserve(element);
      this.elements.delete(element);
    }
  }

  _loadElement(element) {
    if (element.tagName === 'IMG') {
      this._loadImage(element);
    } else if (element.dataset.lazySrc) {
      this._loadBackground(element);
    } else if (element.dataset.lazyComponent) {
      this._loadComponent(element);
    }

    element.classList.add('lazy-loaded');
    element.dispatchEvent(new CustomEvent('lazyloaded'));
  }

  _loadImage(img) {
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;

    if (srcset) {
      img.srcset = srcset;
    }

    if (src) {
      img.src = src;
    }

    img.removeAttribute('data-src');
    img.removeAttribute('data-srcset');
  }

  _loadBackground(element) {
    const src = element.dataset.lazySrc;
    if (src) {
      element.style.backgroundImage = `url(${src})`;
      element.removeAttribute('data-lazy-src');
    }
  }

  async _loadComponent(element) {
    const componentPath = element.dataset.lazyComponent;
    if (componentPath) {
      try {
        const module = await import(componentPath);
        const Component = module.default;
        const instance = new Component();
        instance.mount(element);
        element.removeAttribute('data-lazy-component');
      } catch (error) {
        console.error(`Failed to load component: ${componentPath}`, error);
      }
    }
  }

  _loadAllImmediately() {
    this.elements.forEach(element => this._loadElement(element));
    this.elements.clear();
  }

  disconnect() {
    if (this.observer) {
      this.observer.disconnect();
      this.elements.clear();
    }
  }
}

export const lazyLoader = new LazyLoader();

export const lazyLoadImages = (container = document) => {
  const images = container.querySelectorAll('img[data-src]');
  images.forEach(img => lazyLoader.observe(img));
};

export const preloadImage = src => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = sources => {
  return Promise.all(sources.map(src => preloadImage(src)));
};
