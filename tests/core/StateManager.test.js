import { StateManager } from '../../src/core/StateManager.js';

describe('StateManager', () => {
  let store;

  beforeEach(() => {
    store = new StateManager({ count: 0, user: null });
  });

  test('should initialize with initial state', () => {
    expect(store.getState()).toEqual({ count: 0, user: null });
  });

  test('should update state', () => {
    store.setState({ count: 1 });
    expect(store.getState().count).toBe(1);
  });

  test('should merge state by default', () => {
    store.setState({ count: 1 });
    store.setState({ user: 'John' });
    expect(store.getState()).toEqual({ count: 1, user: 'John' });
  });

  test('should notify subscribers on state change', () => {
    const subscriber = jest.fn();
    store.subscribe(subscriber);
    store.setState({ count: 1 });
    expect(subscriber).toHaveBeenCalled();
  });

  test('should subscribe to specific path', () => {
    const subscriber = jest.fn();
    store.subscribe('count', subscriber);
    store.setState({ count: 1 });
    expect(subscriber).toHaveBeenCalledWith(1, 0);
  });

  test('should unsubscribe', () => {
    const subscriber = jest.fn();
    const unsubscribe = store.subscribe(subscriber);
    unsubscribe();
    store.setState({ count: 1 });
    expect(subscriber).not.toHaveBeenCalled();
  });

  test('should maintain history', () => {
    store.setState({ count: 1 });
    store.setState({ count: 2 });
    const history = store.getHistory();
    expect(history.length).toBeGreaterThan(0);
  });

  test('should undo state changes', () => {
    store.setState({ count: 1 });
    store.setState({ count: 2 });
    store.undo();
    expect(store.getState().count).toBe(1);
  });

  test('should reset state', () => {
    store.setState({ count: 5 });
    store.reset({ count: 0 });
    expect(store.getState()).toEqual({ count: 0 });
  });
});
