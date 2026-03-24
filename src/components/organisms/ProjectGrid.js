import { Component } from '@core/Component.js';
import { Card } from '@components/atoms/Card.js';

export class ProjectGrid extends Component {
  render() {
    const { projects = [] } = this.props;

    const grid = this.createElement(
      'section',
      { className: 'project-grid', role: 'region', ariaLabel: 'Projects' },
      this.createElement(
        'div',
        { className: 'project-grid__container container' },
        [
          this.createElement('h2', { className: 'project-grid__title' }, 'Featured Projects'),
          this._renderGrid(projects),
        ]
      )
    );

    return grid;
  }

  _renderGrid(projects) {
    const gridContainer = this.createElement('div', { className: 'project-grid__grid' });

    projects.forEach(project => {
      const card = new Card({
        title: project.title,
        subtitle: project.category,
        image: project.image,
        imageAlt: project.title,
        children: project.description,
        interactive: true,
        onClick: () => this._handleProjectClick(project),
      });

      gridContainer.appendChild(card.render());
      this.children.push(card);
    });

    return gridContainer;
  }

  _handleProjectClick(project) {
    window.location.hash = `#/project/${project.id}`;
  }
}
