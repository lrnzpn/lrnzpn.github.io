import { Component } from '@core/Component.js';
import { dataService } from '@services/DataService.js';

export class AboutPage extends Component {
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
    const page = this.createElement('div', { className: 'about-page' });

    const section = this.createElement(
      'section',
      { className: 'about-section container' },
      [
        this.createElement('h1', {}, 'About Me'),
        this.createElement('p', { className: 'about-bio' }, data.profile.bio),
        this._renderSkills(data.skills),
        this._renderExperience(data.experience),
      ]
    );

    page.appendChild(section);
    return page;
  }

  _renderSkills(skills) {
    if (!skills || skills.length === 0) return null;

    return this.createElement(
      'div',
      { className: 'skills-section' },
      [
        this.createElement('h2', {}, 'Skills'),
        ...skills.map(skillGroup =>
          this.createElement(
            'div',
            { className: 'skill-group' },
            [
              this.createElement('h3', {}, skillGroup.category),
              this.createElement(
                'ul',
                {},
                skillGroup.items.map(skill =>
                  this.createElement('li', {}, skill)
                )
              ),
            ]
          )
        ),
      ]
    );
  }

  _renderExperience(experience) {
    if (!experience || experience.length === 0) return null;

    return this.createElement(
      'div',
      { className: 'experience-section' },
      [
        this.createElement('h2', {}, 'Experience'),
        ...experience.map(exp =>
          this.createElement(
            'div',
            { className: 'experience-item' },
            [
              this.createElement('h3', {}, exp.position),
              this.createElement('p', { className: 'company' }, `${exp.company} • ${exp.period}`),
              this.createElement('p', {}, exp.description),
              exp.achievements && this.createElement(
                'ul',
                {},
                exp.achievements.map(achievement =>
                  this.createElement('li', {}, achievement)
                )
              ),
            ].filter(Boolean)
          )
        ),
      ]
    );
  }
}
