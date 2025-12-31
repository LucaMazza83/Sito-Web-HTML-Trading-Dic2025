import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Button } from '@/components/ui/Button';
import { Language } from '@/types';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
const CONTACT_EMAIL = 'luca.mazzarello1983@gmail.com';
const WAITLIST_FALLBACK = {
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

const WaitlistContent: React.FC = () => {
  const { t, language } = useLanguage();
  const wt = (t as any).waitlist ?? WAITLIST_FALLBACK[language];
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [endpointMissing, setEndpointMissing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEndpointMissing(false);

    if (!isValidEmail(email) || !consent) {
      setStatus('error');
      return;
    }

    const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT;
    if (!endpoint) {
      setStatus('error');
      setEndpointMissing(true);
      return;
    }

    try {
      setStatus('loading');
      const formData = new FormData();
      formData.append('email', email);
      formData.append('message', `Waitlist ${new Date().toISOString()}`);
      formData.append('consent', 'true');
      formData.append('ts', new Date().toISOString());
      formData.append('source', 'doptrading.it');
      formData.append('page', 'waitlist');
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-3xl mx-auto px-6">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{wt.title}</h1>
        <p className="text-gray-400 text-lg">{wt.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-300 mb-2">
            {wt.emailLabel}
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={wt.emailPlaceholder}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-brand-teal focus:outline-none"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5"
          />
          <span>
            {wt.consentPrefix}{' '}
            <a href="/privacy-policy/" className="text-brand-teal hover:text-white transition-colors">
              {wt.consentLink}
            </a>
          </span>
        </label>

        <div>
          <Button type="submit" variant="secondary" disabled={status === 'loading'} className="px-8 py-3">
            {status === 'loading' ? wt.submitting : wt.submit}
          </Button>
        </div>

        {status === 'success' && (
          <div className="rounded-lg border border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-brand-teal">
            <strong className="block mb-1">{wt.successTitle}</strong>
            <span>{wt.successBody}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300">
            <strong className="block mb-1">{wt.errorTitle}</strong>
            <div className="space-y-1">
              <span className="block">{wt.errorBody}</span>
              {endpointMissing && (
                <span className="block text-sm text-gray-200">
                  {language === Language.IT ? `Per info: ${CONTACT_EMAIL}` : `For info: ${CONTACT_EMAIL}`}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </section>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <StaticPageLayout>
        <WaitlistContent />
      </StaticPageLayout>
    </LanguageProvider>
  </React.StrictMode>
);
