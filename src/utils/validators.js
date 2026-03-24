export const validators = {
  isEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isURL(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  isPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
  },

  isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  },

  isLength(value, min, max) {
    const length = value ? value.length : 0;
    return length >= min && (max === undefined || length <= max);
  },

  matches(value, pattern) {
    if (typeof pattern === 'string') {
      pattern = new RegExp(pattern);
    }
    return pattern.test(value);
  },

  isAlphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value);
  },

  isNumeric(value) {
    return /^\d+$/.test(value);
  },

  isAlpha(value) {
    return /^[a-zA-Z]+$/.test(value);
  },

  inRange(value, min, max) {
    const num = Number(value);
    return !isNaN(num) && num >= min && num <= max;
  },
};

export class FormValidator {
  constructor(form, rules) {
    this.form = form;
    this.rules = rules;
    this.errors = {};
  }

  validate() {
    this.errors = {};
    const formData = new FormData(this.form);

    Object.entries(this.rules).forEach(([field, fieldRules]) => {
      const value = formData.get(field);
      const fieldErrors = [];

      fieldRules.forEach(rule => {
        const { validator, message, params = [] } = rule;

        if (typeof validator === 'function') {
          if (!validator(value, ...params)) {
            fieldErrors.push(message);
          }
        } else if (typeof validator === 'string' && validators[validator]) {
          if (!validators[validator](value, ...params)) {
            fieldErrors.push(message);
          }
        }
      });

      if (fieldErrors.length > 0) {
        this.errors[field] = fieldErrors;
      }
    });

    return Object.keys(this.errors).length === 0;
  }

  getErrors(field) {
    if (field) {
      return this.errors[field] || [];
    }
    return this.errors;
  }

  clearErrors(field) {
    if (field) {
      delete this.errors[field];
    } else {
      this.errors = {};
    }
  }
}
