import { Component } from '@core/Component.js';
import { FormValidator, validators } from '@utils/validators.js';
import { Button } from '@components/atoms/Button.js';

export class ContactPage extends Component {
  constructor(props = {}) {
    super(props);
    this.state = {
      submitted: false,
      errors: {},
    };
    this.validator = null;
  }

  render() {
    const page = this.createElement('div', { className: 'contact-page' });

    const section = this.createElement(
      'section',
      { className: 'contact-section container' },
      [
        this.createElement('h1', {}, 'Get In Touch'),
        this.state.submitted ? this._renderSuccess() : this._renderForm(),
      ]
    );

    page.appendChild(section);
    return page;
  }

  _renderForm() {
    const form = this.createElement('form', {
      className: 'contact-form',
      onSubmit: e => this._handleSubmit(e),
    });

    const nameGroup = this._createFormGroup('name', 'Name', 'text', 'Your name', true);
    const emailGroup = this._createFormGroup('email', 'Email', 'email', 'your@email.com', true);
    const messageGroup = this._createFormGroup('message', 'Message', 'textarea', 'Your message...', true);

    const submitBtn = new Button({
      text: 'Send Message',
      variant: 'primary',
      size: 'lg',
      fullWidth: true,
      type: 'submit',
    });

    form.appendChild(nameGroup);
    form.appendChild(emailGroup);
    form.appendChild(messageGroup);
    form.appendChild(submitBtn.render());

    this.children.push(submitBtn);

    this.validator = new FormValidator(form, {
      name: [
        {
          validator: value => !validators.isEmpty(value),
          message: 'Name is required',
        },
      ],
      email: [
        {
          validator: value => !validators.isEmpty(value),
          message: 'Email is required',
        },
        {
          validator: validators.isEmail,
          message: 'Please enter a valid email',
        },
      ],
      message: [
        {
          validator: value => !validators.isEmpty(value),
          message: 'Message is required',
        },
        {
          validator: value => validators.isLength(value, 10),
          message: 'Message must be at least 10 characters',
        },
      ],
    });

    return form;
  }

  _createFormGroup(name, label, type, placeholder, required) {
    const group = this.createElement('div', { className: 'form-group' });

    const labelEl = this.createElement(
      'label',
      { className: 'form-group__label', for: name },
      label + (required ? ' *' : '')
    );

    let input;
    if (type === 'textarea') {
      input = this.createElement('textarea', {
        id: name,
        name,
        className: 'textarea',
        placeholder,
        required,
      });
    } else {
      input = this.createElement('input', {
        id: name,
        name,
        type,
        className: 'input',
        placeholder,
        required,
      });
    }

    const error = this.createElement('span', {
      className: 'form-group__error',
      id: `${name}-error`,
    });

    group.appendChild(labelEl);
    group.appendChild(input);
    group.appendChild(error);

    return group;
  }

  _handleSubmit(e) {
    e.preventDefault();

    if (!this.validator.validate()) {
      const errors = this.validator.getErrors();
      Object.entries(errors).forEach(([field, messages]) => {
        const errorEl = document.getElementById(`${field}-error`);
        if (errorEl) {
          errorEl.textContent = messages[0];
        }
      });
      return;
    }

    console.log('Form submitted successfully');
    this.setState({ submitted: true });
  }

  _renderSuccess() {
    return this.createElement(
      'div',
      { className: 'success-message' },
      [
        this.createElement('h2', {}, 'Thank you!'),
        this.createElement('p', {}, 'Your message has been sent successfully.'),
      ]
    );
  }
}
