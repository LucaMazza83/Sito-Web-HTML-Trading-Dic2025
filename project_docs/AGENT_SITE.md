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
- Per il marketing site, APP_URL e' forzato a `/waitlist/` (configurazione via env disattivata in questo step).
- Nota: .env.local è SOLO locale e non deve andare in repo.

## Obiettivo di business (priorità)
1) Mettere online il NUOVO sito (sostituisce l’attuale WP “a metà”).
2) Prima del go-live: aggiungere Waitlist con iscrizione email + conferma.
3) CTA principali: “Accedi” (porta alla piattaforma Next quando pronta) e “Waitlist”.

## Domini e ambienti
- Marketing PROD: doptrading.it (sostituzione WP)
- Staging consigliato: new.doptrading.it oppure beta.doptrading.it
- App (Next): URL da confermare; per ora CTA marketing puntano a `/waitlist/` (APP_URL forzato).

## Deploy VHosting + Cloudflare (minimo e ripetibile)
- Si pubblica SOLO dist/:
  — Caricare index.html + assets/ nella document root (public_html o httpdocs).
- Cloudflare:
  — SSL: Full (strict se certificato valido).
  — Cache: TTL lungo su /assets/*.
- Attenzione SPA routing:
  — Se vengono introdotte route tipo /platform serve regola rewrite su hosting.

## SOP Deploy VHosting (static build)
### Step
1) Esegui `npm run build` in locale.
2) Apri cPanel File Manager e vai alla webroot: `/home/doptrad1/public_html/`.
3) Crea cartella backup `_deploy_backup_YYYYMMDD_HHMMSS/` e SPOSTA dentro i file esistenti (NO DELETE).
4) Carica in webroot il contenuto di `dist/`: `index.html`, `assets/` e le cartelle slug.
5) Verifica che gli URL attesi rispondano.
6) Esegui purge cache su Cloudflare.

### Checklist (OK/FAIL)
- OK/FAIL: `npm run build` completato senza errori.
- OK/FAIL: in `dist/` presenti `index.html`, `assets/`, `waitlist/`, `privacy-policy/`, `cookie-policy/`, `termini-e-condizioni/`, `disclaimer-trading/`.
- OK/FAIL: upload completato nella webroot `/home/doptrad1/public_html/`.
- OK/FAIL: URL attesi online: `/`, `/waitlist/`, `/privacy-policy/`, `/cookie-policy/`, `/termini-e-condizioni/`, `/disclaimer-trading/`.
- OK/FAIL: cache Cloudflare purgata dopo upload.

### Stop conditions
- Build fallisce o produce output incompleto.
- Mancano file in `dist/` o file non caricati in webroot.
- Si richiede una cancellazione (NO DELETE): fermarsi e chiedere.
- Gli URL attesi non rispondono dopo il deploy.

## Regole operative (anti-danno)
- Mai andare live su doptrading.it senza Waitlist funzionante.
- Nessun “refactor creativo”: fix minimi, verificabili.
- Ogni modifica deve avere commit Git e nota in HANDOVER_SITE.md.
- Non assumere che esistano email @doptrading.it; usare luca.mazzarello1983@gmail.com finché non viene attivata la posta di dominio.

## Compliance UI — Risk Warning (Signals/Advice)
- Obbligatorio sulle pagine con "segnali" e "consigli", incluse eventuali future landing.
- Banner Risk Warning sticky bottom (sempre visibile durante scroll).
- Non deve coprire CTA principali (layout responsive).
- Contrasto alto, leggibile mobile.
- Testo ESATTO (copia-incolla, senza variazioni):
  "Non è un consiglio di investimento. Tutte le operazioni comportano rischi. Rischia solo il capitale che puoi permetterti di perdere."

## Checklist release (OK/FAIL)
- `npm run build` OK senza warning.
- dist/ contiene index.html + assets/*.
- CTA “Accedi” usa `/waitlist/` (APP_URL forzato).
- Waitlist: form funziona + link Privacy/consenso.

## Prompt template (mini)
- Scope: [elenco file/folder consentiti]
- Divieti: [elenco divieti]
- Backup: crea `.bak.YYYYMMDD-HHMMSS` per ogni file modificato
- Verify: [comandi + expected output]
- Stop: se qualcosa non combacia o si esce dallo scope

