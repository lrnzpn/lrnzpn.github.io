import './styles/main.scss';
import { Router } from '@core/Router.js';
import { createStore } from '@core/StateManager.js';
import { Header } from '@components/molecules/Header.js';
import { Footer } from '@components/molecules/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ProjectsPage } from './pages/ProjectsPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { analytics } from '@services/AnalyticsService.js';
import { lazyLoadImages } from '@utils/lazyLoad.js';
import { a11y } from '@utils/accessibility.js';

class App {
  constructor() {
    this.store = createStore({
      theme: 'light',
      user: null,
    });

    this.router = new Router(
      [
        { path: '/', component: HomePage },
        { path: '/about', component: AboutPage },
        { path: '/projects', component: ProjectsPage },
        { path: '/contact', component: ContactPage },
      ],
      {
        container: '#app-content',
        mode: 'hash',
      }
    );

    this.init();
  }

  init() {
    this.setupAccessibility();
    this.setupAnalytics();
    this.renderLayout();
    this.setupPerformanceMonitoring();
  }

  setupAccessibility() {
    const skipLink = a11y.createSkipLink('Skip to main content', 'app-content');
    document.body.insertBefore(skipLink, document.body.firstChild);

    if (a11y.hasReducedMotion()) {
      document.documentElement.classList.add('reduce-motion');
    }
  }

  setupAnalytics() {
    this.router.afterEach(route => {
      analytics.trackPageView(route.path, document.title);
    });

    window.addEventListener('load', () => {
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;

        analytics.trackPerformance({
          pageLoadTime,
          connectTime,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        });
      }
    });
  }

  renderLayout() {
    const app = document.getElementById('app');
    if (!app) {
      console.error('App container not found');
      return;
    }

    const header = new Header({
      logo: 'LP',
      links: [
        { text: 'Home', href: '#/' },
        { text: 'About', href: '#/about' },
        { text: 'Projects', href: '#/projects' },
        { text: 'Contact', href: '#/contact' },
      ],
    });

    const main = document.createElement('main');
    main.id = 'app-content';
    main.setAttribute('role', 'main');

    const footer = new Footer({
      sections: [
        {
          title: 'Navigation',
          links: [
            { text: 'Home', href: '#/' },
            { text: 'About', href: '#/about' },
            { text: 'Projects', href: '#/projects' },
            { text: 'Contact', href: '#/contact' },
          ],
        },
        {
          title: 'Social',
          links: [
            { text: 'GitHub', href: 'https://github.com/lrnzpn', external: true },
            { text: 'LinkedIn', href: 'https://linkedin.com/in/lrnzpn', external: true },
            { text: 'Twitter', href: 'https://twitter.com/lrnzpn', external: true },
          ],
        },
        {
          title: 'Legal',
          links: [
            { text: 'Privacy Policy', href: '#/privacy' },
            { text: 'Terms of Service', href: '#/terms' },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Lorenzo Pinaroc. All rights reserved.`,
    });

    app.appendChild(header.render());
    app.appendChild(main);
    app.appendChild(footer.render());

    this.router.subscribe(() => {
      setTimeout(() => {
        lazyLoadImages(main);
      }, 100);
    });
  }

  setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            analytics.trackPerformance({ lcp: entry.renderTime || entry.loadTime });
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new App());
} else {
  new App();
}
