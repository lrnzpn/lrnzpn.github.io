import { Component } from '@core/Component.js';
import { Button } from '@components/atoms/Button.js';

export class Hero extends Component {
  render() {
    const {
      title = 'Welcome',
      subtitle = '',
      description = '',
      primaryCta = null,
      secondaryCta = null,
    } = this.props;

    const hero = this.createElement(
      'section',
      { className: 'hero', role: 'region', ariaLabel: 'Hero section' },
      this.createElement(
        'div',
        { className: 'hero__container container' },
        [
          this.createElement('h1', { className: 'hero__title' }, title),
          subtitle && this.createElement('p', { className: 'hero__subtitle' }, subtitle),
          description && this.createElement('p', { className: 'hero__description' }, description),
          (primaryCta || secondaryCta) && this._renderActions(primaryCta, secondaryCta),
        ].filter(Boolean)
      )
    );

    return hero;
  }

  _renderActions(primaryCta, secondaryCta) {
    const actions = this.createElement('div', { className: 'hero__actions' });

    if (primaryCta) {
      const primaryBtn = new Button({
        text: primaryCta.text,
        variant: 'primary',
        size: 'lg',
        onClick: primaryCta.onClick,
      });
      actions.appendChild(primaryBtn.render());
      this.children.push(primaryBtn);
    }

    if (secondaryCta) {
      const secondaryBtn = new Button({
        text: secondaryCta.text,
        variant: 'outline',
        size: 'lg',
        onClick: secondaryCta.onClick,
      });
      actions.appendChild(secondaryBtn.render());
      this.children.push(secondaryBtn);
    }

    return actions;
  }
}
