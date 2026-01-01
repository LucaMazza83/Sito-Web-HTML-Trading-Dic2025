# HANDOVER_SITE — DopTrading Marketing Site

## Stato attuale (verità)
- Build statico multipagina configurato con output attesi: /, /waitlist/, /privacy-policy/, /cookie-policy/, /termini-e-condizioni/, /disclaimer-trading/.
- Waitlist: POST via FormData verso Formspree tramite VITE_WAITLIST_ENDPOINT (https://formspree.io/f/xqekoorr, recipient: luca.mazzarello1983@gmail.com), header `Accept: application/json`.
- Deploy previsto su VHosting via cPanel File Manager (webroot: /home/doptrad1/public_html/) con regola NO DELETE (solo MOVE in _deploy_backup_YYYYMMDD_HHMMSS/).
- Dopo deploy: purge cache Cloudflare obbligatorio.

## Stato attuale & Verifiche già eseguite

### 1) Problema principale risolto
- /waitlist pagina bianca documentata in `project_docs/HANDOVER_SITE.md` (sezione "Verifiche & Fix - 2025-12-31 01:11:44"): crash per `t.waitlist` mancante.
- Fix in repo: submit waitlist via FormData a Formspree (`VITE_WAITLIST_ENDPOINT`) con `Accept: application/json`; aggiunte traduzioni `t.waitlist.*` in `components/LanguageContext.tsx` + fallback in `src/entries/waitlist.tsx`.
- Evidenza di hash diversi tra snapshot build: `dist/assets/waitlist-BSKXBe39.js` e `_reports/_dist_ref_20251230-175820/assets/waitlist-DzIkAHBB.js`; se `index.html` e `assets/` non sono allineati allo stesso build si rischia mismatch.

### 2) Scoperte tecniche importanti (hard facts)
- Footer: link legali puntano a `/privacy-policy/`, `/cookie-policy/`, `/termini-e-condizioni/`, `/disclaimer-trading/`; le icone social restano placeholder `href="#"` (`components/Footer.tsx`).
- Footer (Platform/Resources): link interni via hash (`/#/platform`, `/#/signals`, `/#/academy`); voci "Coming soon" restano disabilitate (`components/Footer.tsx`).
- Navbar: rotta `/waitlist/` e CTA "Waitlist" presenti in desktop e mobile (`components/Navbar.tsx`).
- `StaticPageLayout` usa `HashRouter` (`components/StaticPageLayout.tsx`).
- `waitlist.tsx` usa `fetch` POST con `FormData` e header `Accept: application/json` (`src/entries/waitlist.tsx`).

### 3) Verifiche oggettive già presenti in repo (documentate)
- Script `tools/check_urls.ps1` presente con target: `/`, `/waitlist/`, `/privacy-policy/`, `/cookie-policy/`, `/termini-e-condizioni/`, `/disclaimer-trading/`.
- Artefatti di build presenti in `dist/` (es. `dist/waitlist/index.html` e `dist/assets/waitlist-BSKXBe39.js`).
- Snapshot build salvati in `_reports/_dist_ref_20251230-175820` e `_reports/_dist_ref_20251230-175919` (asset `waitlist-DzIkAHBB.js`).

### 4) Verifiche richieste ma NON documentate (nessun log in repo/_reports)
- Esecuzione `tools/check_urls.ps1` con esito 200 OK per le route attese (non risulta log).
- Test Formspree: JSON -> HTTP 400 "Bad form post request" e FormData -> HTTP 200 ok:true (non risulta log).
- HEAD/HTTP_CODE=200 per HTML/JS principali (non risulta log).
- Stato cPanel `public_html` (cartelle `assets`, `waitlist`, `privacy-policy`, `cookie-policy`, `termini-e-condizioni`, `disclaimer-trading`, `_deploy_backup_*`) non documentato in repo.
- Stato live del sito (home + route principali) non documentato in repo.
- Eventuali sostituzioni manuali di `index.html` su cPanel non documentate in repo.

### 5) Stato attuale (baseline)
- Routing multipagina configurato in `vite.config.ts` per `waitlist` + pagine legali; esiste `waitlist/index.html`.
- Le cartelle legali contengono `index (3).html` ma non `index.html`: allineare con gli entrypoint in `vite.config.ts` prima del prossimo build.
- I template legali contengono link a `/note-legali/` ma la cartella non esiste in repo (possibile 404).
- `waitlist/index.html` include solo lo script entry Vite; nessuna evidenza in repo di script Tailwind/Google Fonts aggiunti fuori `<head>`.

### 6) Next steps suggeriti (solo elenco)
- Stabilizzare CTA "Inizia ora" -> `/waitlist/` e rendere sempre visibile il pulsante Waitlist in hero/navbar.
- Ridurre rischio mismatch: procedura deploy unica (upload zip nuovo -> extract -> purge Cloudflare -> smoke URL check).
- Pulizia ordinata dei backup su cPanel (solo policy, nessuna eliminazione ora).

## Verifiche & Scoperte (da non ripetere)

### Repo-verified
- `src/entries/waitlist.tsx`: submit via `FormData` a Formspree con header `Accept: application/json`.
- `components/Navbar.tsx`: CTA "Waitlist" con link `/waitlist/` in desktop e mobile.
- `components/Footer.tsx`: link interni `/#/platform`, `/#/signals`, `/#/academy` e link legali `/privacy-policy/`, `/cookie-policy/`, `/termini-e-condizioni/`, `/disclaimer-trading/`; voci "Coming soon" restano disabilitate.
- `components/LanguageContext.tsx`: traduzioni `t.waitlist.*` per IT/EN incluse nel contesto.

### Evidenze esterne (chat/log operativi, non verificabili nel repo)
- MISMATCH deploy/cache: LOCAL_WAITLIST_JS=waitlist-BSKXBe39.js vs REMOTE_WAITLIST_JS=waitlist-BtmLXrSa.js -> "MISMATCH: deploy/cache non allineati".
- Verifica HTTP da log: `GET /assets/waitlist-BtmLXrSa.js` -> HTTP/1.1 200 OK; nel JS remoto era ancora presente il codice pre-fallback (accesso diretto a `t.waitlist.*`).
- Evidenza cPanel: in `public_html/assets` presente `waitlist-BSKXBe39.js`; struttura live con `assets/` + `waitlist/`, `privacy-policy/`, `cookie-policy/`, `termini-e-condizioni/`, `disclaimer-trading/`; presenti molte cartelle `_deploy_backup_*` + `_wp_backup_*` da NON toccare.
- Sintomo UI: `/waitlist/` "pagina bianca" durante mismatch; dopo deploy corretto "senza grafica" per head/styling mancanti; correzione manuale via cPanel aggiungendo head/styling (Tailwind/Fonts/Style) negli HTML waitlist/legali.
- Comandi/azioni da log: `Select-String` per link Footer/Navbar; `curl` per status code; confronto hash asset dai tag `<script>` HTML.

### 2025-12-31 — LIVE legal pages non allineate alla dist
- Repo pulito, dist check OK.
- LIVE `/` e `/waitlist/` servono build (asset presenti).
- LIVE legali servono HTML diverso (no asset della dist, SHA256 diverso).

| Path | Status | HashMatch | LiveAssets | DistAssets |
| --- | --- | --- | --- | --- |
| /privacy-policy/ | 200 | False | 0 | 4 |
| /cookie-policy/ | 200 | False | 0 | 4 |
| /termini-e-condizioni/ | 200 | False | 0 | 4 |
| /disclaimer-trading/ | 200 | False | 0 | 4 |

Implicazione operativa: prima di qualunque fix grafico, serve riallineare cosa viene servito su quegli slug.

### 2025-12-31 — Fix strutturale in repo: Tailwind head nelle pagine legali + rename label footer
- Commit (main): `2f2735926f06eda18142d9d338e287fd21cd8bce`.
- File toccati (5): `constants.ts`, `privacy-policy/index.html`, `cookie-policy/index.html`, `termini-e-condizioni/index.html`, `disclaimer-trading/index.html`.
- Head legali: aggiunti Tailwind CDN + Google Fonts + base style; build locale verificata con `dist/*/index.html` che contiene `https://cdn.tailwindcss.com`.
- Rename label footer: `legal: "Termini e Condizioni"` (in repo); visibile live solo dopo deploy.
- `npm ci` warning EBADENGINE per `@vitejs/plugin-react` (richiede Node `^20.19.0 || >=22.12.0`); build OK (warning non bloccante).

### Errori ricorrenti PowerShell/CMD (da non ripetere)
- `findstr` con virgolette/regex errate -> "Stringa di ricerca mancante"/"Argomento non trovato dopo /c".
- `foreach(...)` errato -> "Missing variable name after foreach".
- Concatenazioni incomplete: `('Len='+.Length)` senza `$var`.
- `Continue=Stop` non valido: usare `$ErrorActionPreference='Stop'`.
- Assegnazioni con nome che inizia per numero/data (es. `20251231-...=Get-Date...`) non valide.
- Non annidare `pwsh -Command` con doppie virgolette: espande `$f` e genera `if (!` -> ParserError "Missing expression after unary operator '!'."
- Regola progetto: no fix manuali incoerenti su cPanel; ogni correzione deve passare da repo + deploy ripetibile.

## Deploy PROD - 2026-01-01
- Commit deploy: 188dc93.
- Metodo: upload + extract dist/ in public_html (static Vite) con backup MOVE in `backup_20260101-1441/` (NO DELETE).
- Struttura PROD verificata: `assets/`, `waitlist/`, `cookie-policy/`, `privacy-policy/`, `disclaimer-trading/`, `termini-e-condizioni/`, `index.html`, `backup_20260101-1441/`.
- ZIP deploy spostato fuori root pubblica (MOVE in `backup_20260101-1441/`).
- Verifica HTTP (curl): 200 OK su `/` e `/waitlist/` (2026-01-01 14:08 circa); `Last-Modified: 2026-01-01 13:41:02 GMT`.

## File Map & Correlazioni (repo -> dist -> PROD)

### ROOT HTML PAGES (repo)
- `index.html` -> entry principale; carica modulo `/index.tsx`.
- `waitlist/index.html` -> entry waitlist; carica modulo `/src/entries/waitlist.tsx`.
- `cookie-policy/index.html` -> entry legale; carica modulo `/src/entries/cookie-policy.tsx`.
- `privacy-policy/index.html` -> entry legale; carica modulo `/src/entries/privacy-policy.tsx`.
- `disclaimer-trading/index.html` -> entry legale; carica modulo `/src/entries/disclaimer-trading.tsx`.
- `termini-e-condizioni/index.html` -> entry legale; carica modulo `/src/entries/termini-e-condizioni.tsx`.

### SOURCE ENTRYPOINTS (src/entries/*)
- `src/entries/waitlist.tsx` -> render waitlist; usa `LanguageProvider`, `StaticPageLayout`, `Button`; POST a `VITE_WAITLIST_ENDPOINT`; link `/privacy-policy/`.
- `src/entries/LegalPage.tsx` -> definisce `mountLegalPage` (usato dalle entry legali); usa `LanguageProvider` + `StaticPageLayout`.
- `src/entries/cookie-policy.tsx` -> chiama `mountLegalPage` con testi cookie.
- `src/entries/privacy-policy.tsx` -> chiama `mountLegalPage` con testi privacy.
- `src/entries/disclaimer-trading.tsx` -> chiama `mountLegalPage` con testi disclaimer.
- `src/entries/termini-e-condizioni.tsx` -> chiama `mountLegalPage` con testi termini.

### APP ROOT / ROUTING
- `index.tsx` -> monta `<App />` su `#root`.
- `App.tsx` -> `HashRouter` + `Routes`; importa `Navbar`, `Footer`, `LanguageProvider`, pagine `Home`, `Platform`, `Academy`.

### COMPONENTI CORE (chi li importa)
- `components/Navbar.tsx` -> importato da `App.tsx` e `components/StaticPageLayout.tsx`; usa `APP_URL` e `useLanguage`.
- `components/Footer.tsx` -> importato da `App.tsx` e `components/StaticPageLayout.tsx`; usa `useLanguage`.
- `components/LanguageContext.tsx` -> importato da `App.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `pages/Home.tsx`, `pages/Platform.tsx`, `src/entries/waitlist.tsx`, `src/entries/LegalPage.tsx`.
- `components/StaticPageLayout.tsx` -> importato da `src/entries/waitlist.tsx` e `src/entries/LegalPage.tsx`.
- `components/ui/Button.tsx` -> importato da `pages/Home.tsx`, `pages/Platform.tsx`, `src/entries/waitlist.tsx`.

### PAGES (pages/*)
- `pages/Home.tsx` -> usa `useLanguage`, `Button`, `APP_URL` (CTA).
- `pages/Platform.tsx` -> usa `useLanguage`, `Button`, `APP_URL` (CTA).
- `pages/Academy.tsx` -> contenuti Academy (nessuna CTA con `APP_URL`).

### CONFIG/CONSTANTS
- `constants.ts` -> `APP_URL = "/waitlist/"`; impatto: CTA "Start/Join/Inizia/Accedi" che usano `APP_URL` puntano alla waitlist.

### BUILD OUTPUT (dist/) -> PROD mapping
- Manifest deploy locale: `_reports/DEPLOY_manifest_20260101-144103.txt` (non tracciato) + ZIP `_reports/DEPLOY_dist_20260101-144103.zip`.
- `dist/index.html` -> `public_html/index.html`.
- `dist/waitlist/index.html` -> `public_html/waitlist/index.html`.
- `dist/cookie-policy/index.html` -> `public_html/cookie-policy/index.html`.
- `dist/privacy-policy/index.html` -> `public_html/privacy-policy/index.html`.
- `dist/disclaimer-trading/index.html` -> `public_html/disclaimer-trading/index.html`.
- `dist/termini-e-condizioni/index.html` -> `public_html/termini-e-condizioni/index.html`.
- `dist/assets/Button-CGnWXjIr.js` -> `public_html/assets/Button-CGnWXjIr.js`.
- `dist/assets/cookie-policy-DIbpp1dw.js` -> `public_html/assets/cookie-policy-DIbpp1dw.js`.
- `dist/assets/disclaimer-trading-CC3O_N2d.js` -> `public_html/assets/disclaimer-trading-CC3O_N2d.js`.
- `dist/assets/Footer-CqntzcfQ.js` -> `public_html/assets/Footer-CqntzcfQ.js`.
- `dist/assets/LegalPage-CfaOVXTk.js` -> `public_html/assets/LegalPage-CfaOVXTk.js`.
- `dist/assets/main-Drqp_2J2.js` -> `public_html/assets/main-Drqp_2J2.js`.
- `dist/assets/privacy-policy-ULSMA0MJ.js` -> `public_html/assets/privacy-policy-ULSMA0MJ.js`.
- `dist/assets/StaticPageLayout-Dc2EIrfd.js` -> `public_html/assets/StaticPageLayout-Dc2EIrfd.js`.
- `dist/assets/termini-e-condizioni-CMWZVGe-.js` -> `public_html/assets/termini-e-condizioni-CMWZVGe-.js`.
- `dist/assets/waitlist-DuSejMJc.js` -> `public_html/assets/waitlist-DuSejMJc.js`.

## TODO prossimi step
- Rendere strutturale nel repo la `head`/styling per `waitlist/` e pagine legali (evitare fix manuali in cPanel).
- Allineare processo deploy per evitare mismatch hash (upload unico + purge Cloudflare + verifica hash).
- Rendere coerente la CTA Waitlist e collegare "Inizia Ora" a `/waitlist/` (se richiesto).
- Definire gestione link "Coming soon" e route mancanti.

### Prompt di apertura nuova chat (incolla come primo messaggio)
```
NUOVA CHAT — DopTrading Static Site (Vite/React) / Priorità CTA Waitlist

Questa chat è il proseguo ufficiale del progetto DopTrading marketing static site.
Repo: Sito-Web-HTML-Trading-Dic2025 — branch main.

RUOLO
Sei PM + Tech Lead operativo. Decisioni a basso rischio, niente assunzioni.

VINCOLI
Step-by-step: 1 sola azione per volta + STOP.
No distruttivo su cPanel: NO DELETE, solo MOVE in cartelle backup.
Ogni scoperta va in project_docs/HANDOVER_SITE.md con backup+diff+commit.
Codex non ha memoria: istruzioni blindate, scope limitato.

STATO FATTI (repo)

Fix strutturale legali + rename label footer già fatto in repo (commit 2f2735926f06eda18142d9d338e287fd21cd8bce).

Nota: la visibilità live dipende dal prossimo deploy (oggi NON si deploya).

OBIETTIVO UNICO DI QUESTA CHAT (PRIORITÀ ASSOLUTA)
Collegare tutte le CTA e pulsanti “Iscriviti / Inizia ora / Start / Join / Provalo” a /waitlist/ (incluse varianti desktop/mobile, hero, navbar, footer, sezioni marketing).
✅ Regola: nessuna CTA deve puntare a placeholder o route incoerenti.

DOPO (solo se la priorità è completata): STOP lavoro sul sito finché il software non è terminato.

PRIMO STEP OBBLIGATORIO (solo verifica, zero modifiche)
Cerca in repo tutte le occorrenze di link/CTA potenzialmente da riallineare (href, to, navigate, anchor hash) e produci un report con: file, riga, valore attuale, proposta “→ /waitlist/”.
STOP e attendi approvazione prima di modificare.
```

## Dipendenze
- Tooling: Vite + React + TypeScript, Node.js + npm per build.
- Formspree: endpoint waitlist https://formspree.io/f/xqekoorr.
- Hosting: VHosting cPanel File Manager su /home/doptrad1/public_html/.
- CDN/DNS: Cloudflare (purge cache post-deploy).

## Stato attuale (baseline)
- Dev server Vite OK.
- 2026-01-01: APP_URL forzato a `/waitlist/` per riallineare tutte le CTA Start/Join/Inizia/Iscriviti; configurazione via env disattivata in questo step.
- Fix build applicata: rimosso riferimento rotto `/index.css` da index.html.
- `.env.local` ignorato via `.gitignore`.
- Repo GitHub inizializzata e push completato.
- Waitlist recipient: luca.mazzarello1983@gmail.com (nessuna mailbox @doptrading.it attiva al momento).

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

## Post-go-live backlog (Must-have)
- Must-have: Risk Warning sticky su pagine segnali/consigli. Testo ESATTO: "Non è un consiglio di investimento. Tutte le operazioni comportano rischi. Rischia solo il capitale che puoi permetterti di perdere." (sticky bottom, non coprire CTA principali, contrasto alto e leggibile su mobile).

## Prossimi step (ordine consigliato)
1) Implementare Waitlist (provider email o form endpoint) e inserirla in Home + pagina dedicata.
2) Deploy su staging (new/beta subdomain) e QA.
3) Cutover su doptrading.it (sostituzione WP), con piano rollback.

## Log modifiche (append-only)
- 2025-12-29: creati AGENT_SITE.md e HANDOVER_SITE.md (governance).
- 2025-12-31: aggiornata sezione "Stato attuale & Verifiche già eseguite" + dettagli waitlist FormData.


## Verifiche & Fix - 2025-12-31 01:11:44
- Bug: /waitlist pagina bianca -> cause: crash t.waitlist mancante
- Fix: waitlist fail-safe + aggiunte traduzioni + footer links hash + CTA waitlist
- Verifica: build OK + stringhe presenti nel dist
