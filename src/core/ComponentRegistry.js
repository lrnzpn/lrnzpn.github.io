export class ComponentRegistry {
  constructor() {
    this._components = new Map();
    this._instances = new WeakMap();
  }

  register(name, ComponentClass, options = {}) {
    if (this._components.has(name)) {
      console.warn(`Component "${name}" is already registered. Overwriting.`);
    }

    this._components.set(name, {
      ComponentClass,
      options: {
        singleton: options.singleton || false,
        lazy: options.lazy || false,
        ...options,
      },
    });
  }

  unregister(name) {
    return this._components.delete(name);
  }

  has(name) {
    return this._components.has(name);
  }

  get(name) {
    return this._components.get(name);
  }

  create(name, props = {}) {
    const component = this._components.get(name);

    if (!component) {
      throw new Error(`Component "${name}" is not registered`);
    }

    const { ComponentClass, options } = component;

    if (options.singleton) {
      if (!this._instances.has(ComponentClass)) {
        const instance = new ComponentClass(props);
        this._instances.set(ComponentClass, instance);
        return instance;
      }
      return this._instances.get(ComponentClass);
    }

    return new ComponentClass(props);
  }

  async createAsync(name, props = {}) {
    const component = this._components.get(name);

    if (!component) {
      throw new Error(`Component "${name}" is not registered`);
    }

    const { ComponentClass, options } = component;

    if (options.lazy && typeof ComponentClass === 'function') {
      const LoadedComponent = await ComponentClass();
      return new LoadedComponent(props);
    }

    return this.create(name, props);
  }

  getAll() {
    return Array.from(this._components.keys());
  }

  clear() {
    this._components.clear();
  }
}

export const registry = new ComponentRegistry();
