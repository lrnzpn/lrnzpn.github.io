import { Component } from '../../src/core/Component.js';

describe('Component', () => {
  let component;

  beforeEach(() => {
    component = new Component({ testProp: 'value' });
  });

  afterEach(() => {
    if (component.element) {
      component.unmount();
    }
  });

  test('should initialize with props', () => {
    expect(component.props.testProp).toBe('value');
  });

  test('should update state', () => {
    component.setState({ count: 1 });
    expect(component.state.count).toBe(1);
  });

  test('should notify observers on state change', () => {
    const observer = jest.fn();
    component.subscribe(observer);
    component.setState({ count: 1 });
    expect(observer).toHaveBeenCalledWith({ count: 1 });
  });

  test('should create element with attributes', () => {
    const element = component.createElement('div', { className: 'test', id: 'test-id' });
    expect(element.className).toBe('test');
    expect(element.id).toBe('test-id');
  });

  test('should create element with children', () => {
    const element = component.createElement('div', {}, 'Hello', ' ', 'World');
    expect(element.textContent).toBe('Hello World');
  });

  test('should mount to container', () => {
    const container = document.createElement('div');
    component.mount(container);
    expect(container.children.length).toBeGreaterThan(0);
  });

  test('should unmount and cleanup', () => {
    const container = document.createElement('div');
    component.mount(container);
    component.unmount();
    expect(component.element.parentNode).toBeNull();
  });
});
