import { Component } from '@core/Component.js';
import { Card } from '@components/atoms/Card.js';
import { dataService } from '@services/DataService.js';

export class ProjectsPage extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      data: null,
      loading: true,
    };
  }

  async onMount() {
    const data = await dataService.loadPortfolioData();
    this.setState({ data, loading: false });
  }

  render() {
    if (this.state.loading) {
      return this.createElement('div', { className: 'container' }, 'Loading...');
    }

    const { data } = this.state;
    const page = this.createElement('div', { className: 'projects-page' });

    const section = this.createElement(
      'section',
      { className: 'projects-section container' },
      [
        this.createElement('h1', {}, 'All Projects'),
        this._renderProjectsGrid(data.projects),
      ]
    );

    page.appendChild(section);
    return page;
  }

  _renderProjectsGrid(projects) {
    const grid = this.createElement('div', { className: 'projects-grid' });

    projects.forEach(project => {
      const footer = this.createElement('div', { className: 'project-footer' });

      if (project.github) {
        const githubLink = this.createElement(
          'a',
          {
            href: project.github,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'btn btn--sm btn--outline',
          },
          'GitHub'
        );
        footer.appendChild(githubLink);
      }

      if (project.demo) {
        const demoLink = this.createElement(
          'a',
          {
            href: project.demo,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'btn btn--sm btn--primary',
          },
          'Live Demo'
        );
        footer.appendChild(demoLink);
      }

      const card = new Card({
        title: project.title,
        subtitle: project.category,
        image: project.image,
        imageAlt: project.title,
        children: project.description,
        footer,
      });

      grid.appendChild(card.render());
      this.children.push(card);
    });

    return grid;
  }
}
