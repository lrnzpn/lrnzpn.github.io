export class Router {
  constructor(routes = [], options = {}) {
    this.routes = routes;
    this.currentRoute = null;
    this.container = options.container || '#app';
    this.mode = options.mode || 'hash';
    this.notFoundHandler = options.notFoundHandler || this._defaultNotFound;
    this._listeners = [];
    this._beforeHooks = [];
    this._afterHooks = [];
    this._init();
  }

  _init() {
    window.addEventListener('popstate', () => this._handleRouteChange());
    if (this.mode === 'hash') {
      window.addEventListener('hashchange', () => this._handleRouteChange());
    }
    this._handleRouteChange();
  }

  _getPath() {
    if (this.mode === 'hash') {
      return window.location.hash.slice(1) || '/';
    }
    return window.location.pathname;
  }

  _handleRouteChange() {
    const path = this._getPath();
    this.navigate(path, { replace: true, trigger: true });
  }

  beforeEach(hook) {
    this._beforeHooks.push(hook);
  }

  afterEach(hook) {
    this._afterHooks.push(hook);
  }

  async navigate(path, options = {}) {
    const { replace = false, trigger = true, state = {} } = options;

    for (const hook of this._beforeHooks) {
      const result = await hook(path, this.currentRoute);
      if (result === false) return;
      if (typeof result === 'string') {
        path = result;
      }
    }

    const route = this._matchRoute(path);

    if (!route) {
      this.notFoundHandler(path);
      return;
    }

    if (this.currentRoute?.component?.unmount) {
      this.currentRoute.component.unmount();
    }

    this.currentRoute = {
      path,
      route,
      params: route.params,
      query: this._parseQuery(path),
      state,
    };

    if (trigger) {
      this._updateURL(path, replace, state);
    }

    await this._loadRoute(route);

    this._notifyListeners(this.currentRoute);

    for (const hook of this._afterHooks) {
      await hook(this.currentRoute);
    }
  }

  _matchRoute(path) {
    const [pathname] = path.split('?');

    for (const route of this.routes) {
      const params = this._extractParams(route.path, pathname);
      if (params) {
        return { ...route, params };
      }
    }
    return null;
  }

  _extractParams(routePath, actualPath) {
    const routeParts = routePath.split('/').filter(Boolean);
    const actualParts = actualPath.split('/').filter(Boolean);

    if (routeParts.length !== actualParts.length) {
      return null;
    }

    const params = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        const paramName = routeParts[i].slice(1);
        params[paramName] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }

    return params;
  }

  _parseQuery(path) {
    const [, queryString] = path.split('?');
    if (!queryString) return {};

    return queryString.split('&').reduce((acc, pair) => {
      const [key, value] = pair.split('=');
      acc[decodeURIComponent(key)] = decodeURIComponent(value || '');
      return acc;
    }, {});
  }

  async _loadRoute(route) {
    const container = document.querySelector(this.container);
    if (!container) {
      console.error(`Container ${this.container} not found`);
      return;
    }

    container.innerHTML = '';

    if (typeof route.component === 'function') {
      const ComponentClass = route.lazy ? await route.component() : route.component;
      const component = new ComponentClass({ params: route.params });
      component.mount(container);
      this.currentRoute.component = component;
    } else if (typeof route.component === 'string') {
      container.innerHTML = route.component;
    }
  }

  _updateURL(path, replace, state) {
    const url = this.mode === 'hash' ? `#${path}` : path;

    if (replace) {
      window.history.replaceState(state, '', url);
    } else {
      window.history.pushState(state, '', url);
    }
  }

  _defaultNotFound(path) {
    const container = document.querySelector(this.container);
    if (container) {
      container.innerHTML = `<h1>404 - Page Not Found</h1><p>Path: ${path}</p>`;
    }
  }

  subscribe(listener) {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }

  _notifyListeners(route) {
    this._listeners.forEach(listener => listener(route));
  }

  addRoute(route) {
    this.routes.push(route);
  }

  getCurrentRoute() {
    return this.currentRoute;
  }
}
