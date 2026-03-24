import DOMPurify from 'dompurify';

export class DataService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = 5 * 60 * 1000;
  }

  async fetchData(url, options = {}) {
    const cacheKey = `${url}-${JSON.stringify(options)}`;

    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() - cached.timestamp < this.cacheExpiry) {
        return cached.data;
      }
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const sanitizedData = this.sanitizeData(data);

      this.cache.set(cacheKey, {
        data: sanitizedData,
        timestamp: Date.now(),
      });

      return sanitizedData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }

  sanitizeData(data) {
    if (typeof data === 'string') {
      return DOMPurify.sanitize(data, { ALLOWED_TAGS: [] });
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeData(item));
    }

    if (typeof data === 'object' && data !== null) {
      const sanitized = {};
      Object.keys(data).forEach(key => {
        sanitized[key] = this.sanitizeData(data[key]);
      });
      return sanitized;
    }

    return data;
  }

  clearCache() {
    this.cache.clear();
  }

  async loadPortfolioData() {
    try {
      const response = await fetch('/src/data/portfolio.json');
      const data = await response.json();
      return this.sanitizeData(data);
    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      return this.getFallbackData();
    }
  }

  getFallbackData() {
    return {
      profile: {
        name: 'Portfolio',
        title: 'Developer',
        bio: 'Welcome to my portfolio',
      },
      projects: [],
      skills: [],
      experience: [],
    };
  }
}

export const dataService = new DataService();
