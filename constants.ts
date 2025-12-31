import { Language, Translations } from './types';

export const APP_URL = (import.meta.env.VITE_APP_URL as string) || "https://app.doptrading.it/login"; // Configurable App URL

export const TRANSLATIONS: Record<Language, Translations> = {
  [Language.EN]: {
    nav: {
      home: "Home",
      platform: "Platform",
      signals: "Signals",
      academy: "Academy",
      blog: "News",
      login: "Login",
    },
    hero: {
      title: "Master the Market with Precision.",
      subtitle: "Advanced algorithmic trading software designed for reliability and speed. Stop guessing, start executing.",
      ctaPrimary: "Start Trading",
      ctaSecondary: "Explore Features",
    },
    features: {
      title: "Why DopTrading?",
      subtitle: "Engineered for performance, designed for traders.",
      items: [
        { title: "Real-time Analytics", description: "Process market data in milliseconds with our proprietary engine.", icon: "activity" },
        { title: "AI-Driven Signals", description: "High-probability entry and exit points powered by machine learning.", icon: "cpu" },
        { title: "Bank-Grade Security", description: "Your data and assets are protected by industry-leading encryption.", icon: "shield" },
      ]
    },
    software: {
      title: "The Interface of Control",
      subtitle: "A unified dashboard for all your trading needs.",
      description: "DopTrading consolidates complex market data into an intuitive, actionable interface. Customize your workspace, set advanced alerts, and automate your strategy without writing a single line of code.",
    },
    footer: {
      rights: "© 2024 DopTrading. All rights reserved.",
      legal: "Legal Disclaimer",
      privacy: "Privacy Policy",
    }
  },
  [Language.IT]: {
    nav: {
      home: "Home",
      platform: "Piattaforma",
      signals: "Segnali",
      academy: "Academy",
      blog: "News",
      login: "Accedi",
    },
    hero: {
      title: "Domina il Mercato con Precisione.",
      subtitle: "Software di trading algoritmico avanzato progettato per affidabilità e velocità. Smetti di indovinare, inizia a eseguire.",
      ctaPrimary: "Inizia Ora",
      ctaSecondary: "Scopri le Funzioni",
    },
    features: {
      title: "Perché DopTrading?",
      subtitle: "Progettato per la performance, pensato per i trader.",
      items: [
        { title: "Analisi in Tempo Reale", description: "Elabora i dati di mercato in millisecondi con il nostro motore proprietario.", icon: "activity" },
        { title: "Segnali AI", description: "Punti di ingresso e uscita ad alta probabilità potenziati dal machine learning.", icon: "cpu" },
        { title: "Sicurezza Bancaria", description: "I tuoi dati e asset sono protetti da crittografia leader del settore.", icon: "shield" },
      ]
    },
    software: {
      title: "L'Interfaccia del Controllo",
      subtitle: "Una dashboard unificata per tutte le tue esigenze di trading.",
      description: "DopTrading consolida dati di mercato complessi in un'interfaccia intuitiva e azionabile. Personalizza il tuo spazio di lavoro, imposta avvisi avanzati e automatizza la tua strategia senza scrivere una riga di codice.",
    },
    footer: {
      rights: "© 2024 DopTrading. Tutti i diritti riservati.",
      legal: "Termini e Condizioni",
      privacy: "Privacy Policy",
    }
  }
};
