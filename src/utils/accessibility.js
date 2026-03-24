export const a11y = {
  trapFocus(element) {
    const focusableElements = element.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), ' +
      'input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleTabKey = e => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);

    return () => element.removeEventListener('keydown', handleTabKey);
  },

  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  setAriaExpanded(element, expanded) {
    element.setAttribute('aria-expanded', String(expanded));
  },

  setAriaHidden(element, hidden) {
    element.setAttribute('aria-hidden', String(hidden));
  },

  enableKeyboardNav(element, callback) {
    const handleKeyPress = e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback(e);
      }
    };

    element.addEventListener('keypress', handleKeyPress);
    element.setAttribute('tabindex', '0');

    return () => {
      element.removeEventListener('keypress', handleKeyPress);
      element.removeAttribute('tabindex');
    };
  },

  manageFocus(element) {
    const previouslyFocused = document.activeElement;

    element.focus();

    return () => {
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    };
  },

  hasReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  prefersColorScheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'no-preference';
  },

  skipToContent(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus();
      target.addEventListener('blur', () => {
        target.removeAttribute('tabindex');
      }, { once: true });
    }
  },

  createSkipLink(text, targetId) {
    const skipLink = document.createElement('a');
    skipLink.href = `#${targetId}`;
    skipLink.textContent = text;
    skipLink.className = 'skip-link';
    skipLink.addEventListener('click', e => {
      e.preventDefault();
      this.skipToContent(targetId);
    });
    return skipLink;
  },

  validateColorContrast(foreground, background) {
    const getLuminance = color => {
      const rgb = color.match(/\d+/g).map(Number);
      const [r, g, b] = rgb.map(val => {
        val = val / 255;
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(foreground);
    const l2 = getLuminance(background);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    return {
      ratio: ratio.toFixed(2),
      AA: ratio >= 4.5,
      AAA: ratio >= 7,
      AALarge: ratio >= 3,
      AAALarge: ratio >= 4.5,
    };
  },
};

export class FocusManager {
  constructor() {
    this.stack = [];
  }

  push(element) {
    const previousFocus = document.activeElement;
    this.stack.push(previousFocus);

    if (element && element.focus) {
      element.focus();
    }
  }

  pop() {
    const previousFocus = this.stack.pop();
    if (previousFocus && previousFocus.focus) {
      previousFocus.focus();
    }
  }

  clear() {
    this.stack = [];
  }
}

export const focusManager = new FocusManager();
