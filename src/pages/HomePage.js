import { Component } from '@core/Component.js';
import { Hero } from '@components/organisms/Hero.js';
import { ProjectGrid } from '@components/organisms/ProjectGrid.js';
import { dataService } from '@services/DataService.js';

export class HomePage extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null,
    };
  }

  async onMount() {
    try {
      const data = await dataService.loadPortfolioData();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return this._renderLoading();
    }

    if (this.state.error) {
      return this._renderError();
    }

    const { data } = this.state;
    const container = this.createElement('div', { className: 'home-page' });

    const hero = new Hero({
      title: `Hi, I'm ${data.profile.name}`,
      subtitle: data.profile.title,
      description: data.profile.bio,
      primaryCta: {
        text: 'View Projects',
        onClick: () => {
          document.querySelector('.project-grid')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      secondaryCta: {
        text: 'Contact Me',
        onClick: () => {
          window.location.hash = '#/contact';
        },
      },
    });

    const projectGrid = new ProjectGrid({
      projects: data.projects.filter(p => p.featured),
    });

    container.appendChild(hero.render());
    container.appendChild(projectGrid.render());

    this.children.push(hero, projectGrid);

    return container;
  }

  _renderLoading() {
    return this.createElement(
      'div',
      { className: 'loading-state container' },
      this.createElement('p', {}, 'Loading...')
    );
  }

  _renderError() {
    return this.createElement(
      'div',
      { className: 'error-state container' },
      this.createElement('p', {}, `Error: ${this.state.error}`)
    );
  }
}
