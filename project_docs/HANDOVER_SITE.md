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

## TODO prossimi step
- Rendere strutturale nel repo la `head`/styling per `waitlist/` e pagine legali (evitare fix manuali in cPanel).
- Allineare processo deploy per evitare mismatch hash (upload unico + purge Cloudflare + verifica hash).
- Rendere coerente la CTA Waitlist e collegare "Inizia Ora" a `/waitlist/` (se richiesto).
- Definire gestione link "Coming soon" e route mancanti.

## Dipendenze
- Tooling: Vite + React + TypeScript, Node.js + npm per build.
- Formspree: endpoint waitlist https://formspree.io/f/xqekoorr.
- Hosting: VHosting cPanel File Manager su /home/doptrad1/public_html/.
- CDN/DNS: Cloudflare (purge cache post-deploy).

## Stato attuale (baseline)
- Dev server Vite OK.
- APP_URL reso configurabile via `VITE_APP_URL` (fallback: https://app.doptrading.it/login).
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
