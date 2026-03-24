export class StateManager {
  constructor(initialState = {}) {
    this._state = initialState;
    this._observers = new Map();
    this._middleware = [];
    this._history = [];
    this._maxHistory = 50;
  }

  getState(path = null) {
    if (!path) return { ...this._state };

    return path.split('.').reduce((obj, key) => obj?.[key], this._state);
  }

  setState(updates, options = {}) {
    const { silent = false, merge = true } = options;

    const prevState = { ...this._state };

    this._state = merge ? { ...this._state, ...updates } : updates;

    this._addToHistory(prevState);

    if (!silent) {
      this._runMiddleware(prevState, this._state);
      this._notifyObservers(prevState, this._state);
    }
  }

  subscribe(path, callback) {
    if (typeof path === 'function') {
      callback = path;
      path = '*';
    }

    if (!this._observers.has(path)) {
      this._observers.set(path, []);
    }

    this._observers.get(path).push(callback);

    return () => {
      const observers = this._observers.get(path);
      if (observers) {
        const index = observers.indexOf(callback);
        if (index > -1) {
          observers.splice(index, 1);
        }
      }
    };
  }

  _notifyObservers(prevState, newState) {
    this._observers.forEach((callbacks, path) => {
      if (path === '*') {
        callbacks.forEach(callback => callback(newState, prevState));
      } else {
        const prevValue = this._getValueByPath(prevState, path);
        const newValue = this._getValueByPath(newState, path);

        if (prevValue !== newValue) {
          callbacks.forEach(callback => callback(newValue, prevValue));
        }
      }
    });
  }

  _getValueByPath(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  use(middleware) {
    this._middleware.push(middleware);
  }

  _runMiddleware(prevState, newState) {
    this._middleware.forEach(middleware => {
      middleware(prevState, newState, this);
    });
  }

  _addToHistory(state) {
    this._history.push({
      state: { ...state },
      timestamp: Date.now(),
    });

    if (this._history.length > this._maxHistory) {
      this._history.shift();
    }
  }

  undo() {
    if (this._history.length > 0) {
      const previous = this._history.pop();
      this._state = previous.state;
      this._notifyObservers({}, this._state);
    }
  }

  getHistory() {
    return [...this._history];
  }

  clearHistory() {
    this._history = [];
  }

  reset(initialState = {}) {
    const prevState = { ...this._state };
    this._state = initialState;
    this._history = [];
    this._notifyObservers(prevState, this._state);
  }
}

export const createStore = (initialState = {}) => {
  return new StateManager(initialState);
};
