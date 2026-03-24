import { Component } from '@core/Component.js';
import { a11y } from '@utils/accessibility.js';

export class Header extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      mobileMenuOpen: false,
    };
  }

  render() {
    const { logo = 'Portfolio', links = [] } = this.props;

    const header = this.createElement(
      'header',
      { className: 'header', role: 'banner' },
      this.createElement(
        'div',
        { className: 'header__container' },
        [
          this._renderLogo(logo),
          this._renderNav(links),
          this._renderMobileToggle(),
        ]
      )
    );

    return header;
  }

  _renderLogo(logo) {
    return this.createElement(
      'a',
      {
        href: '#/',
        className: 'header__logo',
        ariaLabel: 'Home',
      },
      logo
    );
  }

  _renderNav(links) {
    const nav = this.createElement(
      'nav',
      {
        className: 'header__nav',
        role: 'navigation',
        ariaLabel: 'Main navigation',
      },
      links.map(link => this._renderLink(link))
    );

    return nav;
  }

  _renderLink(link) {
    const isActive = window.location.hash === link.href;

    return this.createElement(
      'a',
      {
        href: link.href,
        className: `header__link ${isActive ? 'header__link--active' : ''}`,
        ariaCurrent: isActive ? 'page' : undefined,
      },
      link.text
    );
  }

  _renderMobileToggle() {
    return this.createElement(
      'button',
      {
        className: 'header__mobile-toggle',
        ariaLabel: 'Toggle mobile menu',
        ariaExpanded: String(this.state.mobileMenuOpen),
        onClick: () => this._toggleMobileMenu(),
      },
      '☰'
    );
  }

  _toggleMobileMenu() {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen });
    a11y.announceToScreenReader(
      this.state.mobileMenuOpen ? 'Menu opened' : 'Menu closed'
    );
  }

  onMount() {
    window.addEventListener('hashchange', () => this.render());
  }

  onUnmount() {
    window.removeEventListener('hashchange', () => this.render());
  }
}
