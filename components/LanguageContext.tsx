import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../types';
import { TRANSLATIONS } from '../constants';

type WaitlistTranslations = {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  consentPrefix: string;
  consentLink: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
};

const WAITLIST_TRANSLATIONS: Record<Language, WaitlistTranslations> = {
  [Language.IT]: {
    title: 'Entra in Waitlist',
    subtitle: 'Lascia la tua email per ricevere accesso prioritario e aggiornamenti sul lancio.',
    emailLabel: 'Email',
    emailPlaceholder: 'nome@dominio.com',
    consentPrefix: 'Acconsento al trattamento dei dati secondo la',
    consentLink: 'Privacy Policy',
    submit: 'Iscrivimi',
    submitting: 'Invio...',
    successTitle: 'Ricevuto',
    successBody: 'Grazie! Ti avviseremo appena la piattaforma sarà disponibile.',
    errorTitle: 'Errore',
    errorBody: 'Controlla email e consenso e riprova.'
  },
  [Language.EN]: {
    title: 'Join the Waitlist',
    subtitle: 'Leave your email to get early access and launch updates.',
    emailLabel: 'Email',
    emailPlaceholder: 'name@domain.com',
    consentPrefix: 'I agree to the data processing as described in the',
    consentLink: 'Privacy Policy',
    submit: 'Join',
    submitting: 'Sending...',
    successTitle: 'Received',
    successBody: "Thanks! We'll notify you when the platform is available.",
    errorTitle: 'Error',
    errorBody: 'Check your email and consent, then try again.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations & { waitlist: WaitlistTranslations };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.IT); // Default to IT as per target

  const value = {
    language,
    setLanguage,
    t: {
      ...TRANSLATIONS[language],
      waitlist: WAITLIST_TRANSLATIONS[language]
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
