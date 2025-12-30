# HANDOVER_SITE — DopTrading Marketing Site

## Stato attuale (baseline)
- Dev server Vite OK.
- APP_URL reso configurabile via `VITE_APP_URL` (fallback: https://app.doptrading.it/login).
- Fix build applicata: rimosso riferimento rotto `/index.css` da index.html.
- `.env.local` ignorato via `.gitignore`.
- Repo GitHub inizializzata e push completato.
- Waitlist recipient: luca.mazzarello1983@gmail.com (nessuna mailbox @doptrading.it attiva al momento).

## Problema da risolvere
- Lâ€™attuale sito WordPress â€œa metÃ â€ Ã¨ reputazionalmente dannoso.
- Obiettivo: sostituire con il nuovo sito HTML/React, ma SOLO con Waitlist.

## Decisioni PM (vincolanti)
1) Go-live del nuovo sito solo se include Waitlist.
2) Niente pubblicazione â€œwork in progressâ€ senza capture lead.
3) Riduzione rischio: step piccoli, build sempre verificata.

## Gap funzionali (da colmare prima del go-live definitivo)
- Sezione Waitlist (email capture) + consenso + link a Privacy.
- Contenuti minimi: Home (impatto), Platform, Academy, Signals/Segnali (anche teaser), News/Blog minimale.
- Verifica routing e refresh su pagine interne (se SPA path-based).

## Post-go-live backlog (Must-have)
- Must-have: Risk Warning sticky su pagine segnali/consigli. Testo ESATTO: "Non Ã¨ un consiglio di investimento. Tutte le operazioni comportano rischi. Rischia solo il capitale che puoi permetterti di perdere." (sticky bottom, non coprire CTA principali, contrasto alto e leggibile su mobile).

## Prossimi step (ordine consigliato)
1) Implementare Waitlist (provider email o form endpoint) e inserirla in Home + pagina dedicata.
2) Deploy su staging (new/beta subdomain) e QA.
3) Cutover su doptrading.it (sostituzione WP), con piano rollback.

## Log modifiche (append-only)
- 2025-12-29: creati AGENT_SITE.md e HANDOVER_SITE.md (governance).

