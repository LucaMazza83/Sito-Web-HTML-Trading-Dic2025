# AGENT_SITE — DopTrading Marketing Site (HTML/React)

## Scopo
Documento operativo per qualunque agente (Codex/Perplexity/AI Studio) che deve lavorare sul sito marketing.
Riduce errori, evita modifiche fuori ambito, rende ripetibile il deploy.

## Repo e percorsi
- Repo GitHub: LucaMazza83/Sito-Web-HTML-Trading-Dic2025
- Working dir Windows: C:\\_DoptradingWeb
- Branch: main

## Stack
- Vite + React + TypeScript
- Entry: index.html, index.tsx, App.tsx
- Pagine attuali: Home, Platform, Academy
- Build output: dist/ (index.html + assets/*)

## Config runtime (non hardcoded)
- APP_URL deve essere configurabile via env:
  — Variabile: VITE_APP_URL
  — Default fallback: https://app.doptrading.it/login
- Nota: .env.local Ã¨ SOLO locale e non deve andare in repo.

## Obiettivo di business (prioritÃ )
1) Mettere online il NUOVO sito (sostituisce lâ€™attuale WP â€œa metÃ â€).
2) Prima del go-live: aggiungere Waitlist con iscrizione email + conferma.
3) CTA principali: â€œAccediâ€ (porta alla piattaforma Next quando pronta) e â€œWaitlistâ€.

## Domini e ambienti
- Marketing PROD: doptrading.it (sostituzione WP)
- Staging consigliato: new.doptrading.it oppure beta.doptrading.it
- App (Next): URL da confermare; finchÃ© non disponibile usare VITE_APP_URL.

## Deploy VHosting + Cloudflare (minimo e ripetibile)
- Si pubblica SOLO dist/:
  — Caricare index.html + assets/ nella document root (public_html o httpdocs).
- Cloudflare:
  — SSL: Full (strict se certificato valido).
  — Cache: TTL lungo su /assets/*.
- Attenzione SPA routing:
  — Se vengono introdotte route tipo /platform serve regola rewrite su hosting.

## Regole operative (anti-danno)
- Mai andare live su doptrading.it senza Waitlist funzionante.
- Nessun â€œrefactor creativoâ€: fix minimi, verificabili.
- Ogni modifica deve avere commit Git e nota in HANDOVER_SITE.md.
- Non assumere che esistano email @doptrading.it; usare luca.mazzarello1983@gmail.com finchÃ© non viene attivata la posta di dominio.

## Compliance UI — Risk Warning (Signals/Advice)
- Obbligatorio sulle pagine con "segnali" e "consigli", incluse eventuali future landing.
- Banner Risk Warning sticky bottom (sempre visibile durante scroll).
- Non deve coprire CTA principali (layout responsive).
- Contrasto alto, leggibile mobile.
- Testo ESATTO (copia-incolla, senza variazioni):
  "Non Ã¨ un consiglio di investimento. Tutte le operazioni comportano rischi. Rischia solo il capitale che puoi permetterti di perdere."

## Checklist release (OK/FAIL)
- `npm run build` OK senza warning.
- dist/ contiene index.html + assets/*.
- CTA â€œAccediâ€ usa VITE_APP_URL.
- Waitlist: form funziona + link Privacy/consenso.

