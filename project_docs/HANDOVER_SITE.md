# HANDOVER_SITE — DopTrading Marketing Site

## Stato attuale (baseline)
- Dev server Vite OK.
- APP_URL reso configurabile via `VITE_APP_URL` (fallback: https://app.doptrading.it/login).
- Fix build applicata: rimosso riferimento rotto `/index.css` da index.html.
- `.env.local` ignorato via `.gitignore`.
- Repo GitHub inizializzata e push completato.

## Problema da risolvere
- L’attuale sito WordPress “a metà” è reputazionalmente dannoso.
- Obiettivo: sostituire con il nuovo sito HTML/React, ma SOLO con Waitlist.

## Decisioni PM (vincolanti)
1) Go-live del nuovo sito solo se include Waitlist.
2) Niente pubblicazione “work in progress” senza capture lead.
3) Riduzione rischio: step piccoli, build sempre verificata.

## Gap funzionali (da colmare prima del go-live definitivo)
- Sezione Waitlist (email capture) + consenso + link a Privacy.
- Contenuti minimi: Home (impatto), Platform, Academy, Signals/Segnali (anche teaser), News/Blog minimale.
- Verifica routing e refresh su pagine interne (se SPA path-based).

## Prossimi step (ordine consigliato)
1) Implementare Waitlist (provider email o form endpoint) e inserirla in Home + pagina dedicata.
2) Deploy su staging (new/beta subdomain) e QA.
3) Cutover su doptrading.it (sostituzione WP), con piano rollback.

## Log modifiche (append-only)
- 2025-12-29: creati AGENT_SITE.md e HANDOVER_SITE.md (governance).
