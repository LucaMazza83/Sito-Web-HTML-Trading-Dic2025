import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { StaticPageLayout } from '@/components/StaticPageLayout';
import { Button } from '@/components/ui/Button';
import { Language } from '@/types';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value);
const CONTACT_EMAIL = 'luca.mazzarello1983@gmail.com';

const WaitlistContent: React.FC = () => {
  const { t, language } = useLanguage();
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
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          consent: true,
          ts: new Date().toISOString(),
          source: 'doptrading.it',
          page: 'waitlist',
        }),
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
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t.waitlist.title}</h1>
        <p className="text-gray-400 text-lg">{t.waitlist.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-300 mb-2">
            {t.waitlist.emailLabel}
          </label>
          <input
            id="waitlist-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t.waitlist.emailPlaceholder}
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
            {t.waitlist.consentPrefix}{' '}
            <a href="/privacy-policy/" className="text-brand-teal hover:text-white transition-colors">
              {t.waitlist.consentLink}
            </a>
          </span>
        </label>

        <div>
          <Button type="submit" variant="secondary" disabled={status === 'loading'} className="px-8 py-3">
            {status === 'loading' ? t.waitlist.submitting : t.waitlist.submit}
          </Button>
        </div>

        {status === 'success' && (
          <div className="rounded-lg border border-brand-teal/30 bg-brand-teal/10 px-4 py-3 text-brand-teal">
            <strong className="block mb-1">{t.waitlist.successTitle}</strong>
            <span>{t.waitlist.successBody}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-300">
            <strong className="block mb-1">{t.waitlist.errorTitle}</strong>
            <div className="space-y-1">
              <span className="block">{t.waitlist.errorBody}</span>
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
