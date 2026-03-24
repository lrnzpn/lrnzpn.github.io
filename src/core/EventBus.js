export class EventBus {
  constructor() {
    this._events = new Map();
  }

  on(event, callback, options = {}) {
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }

    const listener = {
      callback,
      once: options.once || false,
      priority: options.priority || 0,
    };

    this._events.get(event).push(listener);
    this._events.get(event).sort((a, b) => b.priority - a.priority);

    return () => this.off(event, callback);
  }

  once(event, callback, options = {}) {
    return this.on(event, callback, { ...options, once: true });
  }

  off(event, callback) {
    if (!this._events.has(event)) return;

    const listeners = this._events.get(event);
    const index = listeners.findIndex(listener => listener.callback === callback);

    if (index > -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this._events.delete(event);
    }
  }

  emit(event, data) {
    if (!this._events.has(event)) return;

    const listeners = [...this._events.get(event)];

    listeners.forEach(listener => {
      listener.callback(data);

      if (listener.once) {
        this.off(event, listener.callback);
      }
    });
  }

  clear(event) {
    if (event) {
      this._events.delete(event);
    } else {
      this._events.clear();
    }
  }

  getListeners(event) {
    return this._events.get(event) || [];
  }

  hasListeners(event) {
    return this._events.has(event) && this._events.get(event).length > 0;
  }
}

export const eventBus = new EventBus();
