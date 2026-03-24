import { Component } from '@core/Component.js';

export class Button extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      loading: props.loading || false,
    };
  }

  render() {
    const {
      text = 'Button',
      variant = 'primary',
      size = 'md',
      icon = null,
      iconPosition = 'left',
      fullWidth = false,
      disabled = false,
      onClick = null,
      ariaLabel = null,
      type = 'button',
    } = this.props;

    const classes = [
      'btn',
      `btn--${variant}`,
      size !== 'md' && `btn--${size}`,
      fullWidth && 'btn--full',
      icon && !text && 'btn--icon',
    ].filter(Boolean).join(' ');

    const button = this.createElement(
      'button',
      {
        className: classes,
        type,
        disabled: disabled || this.state.loading,
        ariaLabel: ariaLabel || text,
        onClick: onClick || (() => {}),
      },
      this.state.loading
        ? this._renderLoader()
        : [
          icon && iconPosition === 'left' && this._renderIcon(icon),
          text && this.createElement('span', {}, text),
          icon && iconPosition === 'right' && this._renderIcon(icon),
        ].filter(Boolean)
    );

    return button;
  }

  _renderIcon(icon) {
    if (typeof icon === 'string') {
      const iconEl = this.createElement('span', { className: 'btn__icon' });
      iconEl.innerHTML = icon;
      return iconEl;
    }
    return icon;
  }

  _renderLoader() {
    return this.createElement(
      'span',
      { className: 'btn__loader', ariaLabel: 'Loading' },
      '...'
    );
  }

  setLoading(loading) {
    this.setState({ loading });
  }
}
