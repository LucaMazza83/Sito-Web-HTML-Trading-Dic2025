import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Language } from '@/types';

type LegalPageProps = {
  titleIt: string;
  titleEn: string;
  bodyIt: string;
  bodyEn: string;
};

type LegalLink = {
  href: string;
  label: string;
};

const LEGAL_LINKS: LegalLink[] = [
  { href: '/privacy-policy/', label: 'Privacy Policy' },
  { href: '/cookie-policy/', label: 'Cookie Policy' },
  { href: '/termini-e-condizioni/', label: 'Termini e Condizioni' },
  { href: '/disclaimer-trading/', label: 'Disclaimer Trading' },
];

const LegalPageContent: React.FC<LegalPageProps> = ({ titleIt, titleEn, bodyIt, bodyEn }) => {
  const { language } = useLanguage();
  const title = language === Language.IT ? titleIt : titleEn;
  const body = language === Language.IT ? bodyIt : bodyEn;
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const links = LEGAL_LINKS.filter((link) => link.href !== currentPath);

  return (
    <section className="max-w-3xl mx-auto px-6">
      <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">{title}</h1>
      <p className="text-gray-400 text-lg mb-6">{body}</p>
      <div className="space-y-3 text-sm text-gray-300">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="block text-brand-teal hover:text-white transition-colors">
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export const mountLegalPage = (props: LegalPageProps) => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Could not find root element to mount to');
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <LanguageProvider>
        <StaticPageLayout>
          <LegalPageContent {...props} />
        </StaticPageLayout>
      </LanguageProvider>
    </React.StrictMode>
  );
};
