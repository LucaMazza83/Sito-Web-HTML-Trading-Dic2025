export enum Language {
  EN = 'EN',
  IT = 'IT'
}

export interface NavItem {
  label: string;
  path: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Translations {
  nav: {
    home: string;
    platform: string;
    signals: string;
    academy: string;
    blog: string;
    login: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Feature[];
  };
  software: {
    title: string;
    subtitle: string;
    description: string;
  };
  footer: {
    rights: string;
    legal: string;
    privacy: string;
  }
}