import { Component } from '@core/Component.js';

export class Footer extends Component {
  render() {
    const {
      sections = [],
      copyright = `© ${new Date().getFullYear()} All rights reserved.`,
    } = this.props;

    const footer = this.createElement(
      'footer',
      { className: 'footer', role: 'contentinfo' },
      this.createElement(
        'div',
        { className: 'footer__container' },
        [
          sections.length > 0 && this._renderContent(sections),
          this._renderBottom(copyright),
        ].filter(Boolean)
      )
    );

    return footer;
  }

  _renderContent(sections) {
    return this.createElement(
      'div',
      { className: 'footer__content' },
      sections.map(section => this._renderSection(section))
    );
  }

  _renderSection(section) {
    return this.createElement(
      'div',
      { className: 'footer__section' },
      [
        this.createElement('h3', { className: 'footer__section-title' }, section.title),
        this.createElement(
          'ul',
          { className: 'footer__section-links' },
          section.links.map(link =>
            this.createElement(
              'li',
              {},
              this.createElement(
                'a',
                {
                  href: link.href,
                  className: 'footer__section-link',
                  target: link.external ? '_blank' : undefined,
                  rel: link.external ? 'noopener noreferrer' : undefined,
                },
                link.text
              )
            )
          )
        ),
      ]
    );
  }

  _renderBottom(copyright) {
    return this.createElement('div', { className: 'footer__bottom' }, copyright);
  }
}
