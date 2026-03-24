import { Component } from '@core/Component.js';

export class Card extends Component {
  render() {
    const {
      title = null,
      subtitle = null,
      image = null,
      imageAlt = '',
      children = null,
      footer = null,
      variant = 'default',
      interactive = false,
      onClick = null,
    } = this.props;

    const classes = [
      'card',
      variant !== 'default' && `card--${variant}`,
      interactive && 'card--interactive',
    ].filter(Boolean).join(' ');

    const card = this.createElement(
      'div',
      {
        className: classes,
        onClick: interactive && onClick ? onClick : undefined,
        role: interactive ? 'button' : undefined,
        tabindex: interactive ? '0' : undefined,
      },
      [
        image && this._renderImage(image, imageAlt),
        (title || subtitle) && this._renderHeader(title, subtitle),
        children && this._renderBody(children),
        footer && this._renderFooter(footer),
      ].filter(Boolean)
    );

    return card;
  }

  _renderImage(src, alt) {
    return this.createElement('img', {
      className: 'card__image card__image--top',
      src,
      alt,
      loading: 'lazy',
    });
  }

  _renderHeader(title, subtitle) {
    return this.createElement(
      'div',
      { className: 'card__header' },
      [
        title && this.createElement('h3', { className: 'card__title' }, title),
        subtitle && this.createElement('p', { className: 'card__subtitle' }, subtitle),
      ].filter(Boolean)
    );
  }

  _renderBody(children) {
    const body = this.createElement('div', { className: 'card__body' });
    if (typeof children === 'string') {
      body.textContent = children;
    } else if (children instanceof Node) {
      body.appendChild(children);
    }
    return body;
  }

  _renderFooter(footer) {
    const footerEl = this.createElement('div', { className: 'card__footer' });
    if (typeof footer === 'string') {
      footerEl.textContent = footer;
    } else if (footer instanceof Node) {
      footerEl.appendChild(footer);
    }
    return footerEl;
  }
}
