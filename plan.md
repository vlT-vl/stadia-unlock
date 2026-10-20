# Piano — Migrazione frontend a React + react-icons + Vite

> **Stato: scaffold, home page, localizzazione e integrazione del flusso originale implementati.**
> Sono fatti: lo scaffold Vite + React alla root del repository (step 1); il component mapping
> della home page (`TopNav`, `Hero`, `KeyThings`, `Faq`, `LegalNotice`, `Footer`, step 2); i modali
> Info/Versione, licenza MIT, browser non supportato, contesto non sicuro, flusso non disponibile e
> pairing Bluetooth (non previsti originariamente da questo piano); la localizzazione IT/EN;
> le animazioni con rispetto di `prefers-reduced-motion`; il pulsante principale che apre il flusso
> di aggiornamento dentro la SPA, con interfaccia propria e motore Google invariato dietro (step 5). Il motore Google non è stato riscritto: è preservato in
> `public/flash/` con `app_combined.js`, asset e firmware. Restano pianificazione aperta: la
> rifinitura della parità CSS pixel-by-pixel (step 3), i casi limite del wiring degli asset
> (step 4), la verifica visiva (step 6) e soprattutto la strategia di compatibilità cross-browser
> per WebUSB (sezione [Il problema reale: WebUSB](#il-problema-reale-webusb)), su cui non è stata
> presa nessuna decisione. Per il dettaglio di cosa è stato fatto vedi
> [CHANGELOG.md](CHANGELOG.md) / [handoff.md](handoff.md); il resto di questo documento descrive
> ancora il piano originale e non è stato riscritto.

## Obiettivo

Riscrivere **solo la pagina principale** (`original/index.html` + `original/app.css` + la parte di UI di
`original/app_combined.js`, escluso il motore di flashing) con lo stack standard già usato in altri
progetti: **React + react-icons + Vite**. Lo scopo finale — non ancora in scope implementativo —
è arrivare a una versione del tool aggiornata e compatibile con tutti i browser principali,
in particolare **Zen** e **Firefox**, che oggi non sono supportati.

## Perimetro di questa fase (cosa NON tocchiamo ancora)

- Il motore di comunicazione con il controller (WebUSB, parsing del flashloader, flash del
  firmware) resta quello originale, intoccato, finché non si decide la strategia di
  compatibilità cross-browser (vedi [Il problema reale: WebUSB](#il-problema-reale-webusb)).
- I file firmware in `original/data/` non vengono modificati.
- Nessuna delle 20 varianti di lingua (`index_xx.html` nel tool originale — qui presente solo
  `original/index.html` in inglese) viene gestita in questa fase: si parte da una sola lingua.
- Nessuno scaffolding verrà creato finché questo piano non viene approvato esplicitamente.

## Analisi dello stato attuale

| Elemento originale | Cosa fa | Destinazione nel riscritto |
|---|---|---|
| `original/index.html` (header, hero, "Important things to know", FAQ, footer con language selector) | Markup statico con `jsaction` custom di Google (Closure) | Componenti React |
| `original/app.css` | ~3700 righe di CSS globale | Da analizzare e portare a CSS module / CSS puro per componente, senza framework CSS aggiuntivo (nessuna dipendenza nuova non richiesta, es. niente Tailwind) |
| Google Symbols (`<span class="CardIcon symbol">toggle_on</span>`, `expand_more`, `arrow_right_alt`, …) | Icone a font Google Material Symbols, caricate da Google Fonts | Sostituite con `react-icons` (famiglia Material Design `md*`, da mappare icona per icona) |
| `original/app_combined.js` | Bundle unico: UI, i18n, routing a step, **e** logica WebUSB | Split: la parte UI/i18n/step-routing viene riscritta in React; la parte WebUSB resta isolata, da trattare in una fase successiva |
| `original/assets/*.svg`, `controller-*.webp` | Già SVG/WebP statici | Riusabili tali e quali come asset importati da Vite |
| Font Google (`Google Sans`, `Google Sans Text`, `Google Symbols` via `fonts.googleapis.com`) | Caricati via `<link>` esterno | Da decidere se mantenere il link esterno o self-host (punto da chiarire prima dell'implementazione) |

## Architettura target

- **Build tool:** Vite, seguendo esattamente lo schema dei progetti React vlT gemelli
  `projetcs/react/examgrid` e `projetcs/react/nxget-app-portal`: React `^19.3.0`, Vite
  `^8.3.4`, `@vitejs/plugin-react` `^6.1.2`, `react-icons` `^5.7.0`, più gli stessi campi di
  metadata in `package.json` (`version`, `build`, `ibuild`, `updated`, `author`) già usati nel
  `package.json` di root di questo repository.
- **UI:** React (function components + hook, nessun framework di state management aggiuntivo:
  lo stato della pagina principale è semplice — step corrente, FAQ aperta/chiusa).
- **Icone:** `react-icons`, preferibilmente il set `react-icons/md` per restare visivamente
  vicino alle Material Symbols originali (`toggle_on`, `calendar_today`, `expand_more`,
  `expand_less`, `arrow_right_alt` → mappare a `MdToggleOn`, `MdCalendarToday`,
  `MdExpandMore`, `MdExpandLess`, `MdArrowForward`/equivalente).
- **Styling:** CSS portato da `original/app.css`, suddiviso per componente; nessuna nuova dipendenza di
  styling se non esplicitamente richiesta.
- **Niente commenti nel codice applicativo**, in linea con la convenzione già seguita negli
  altri progetti React (it-flow, nxget-app-portal).

## Fasi proposte

1. **Scaffold** — creare progetto Vite + React (vanilla, no template extra) direttamente alla
   root di `StadiaUnlock`, stesso layout (nessuna sottocartella) dei progetti vlT gemelli
   `examgrid`/`nxget-app-portal`; il mirror Google originale vive invece in `original/`,
   cartella locale gitignored separata. Aggiungere `react-icons` come unica dipendenza nuova.
2. **Component mapping** — i contenuti/testi di ogni step del flusso sono già raccolti in
   [FLOW.md](FLOW.md) (in inglese, pensato per mappare 1:1 le future pagine/route della SPA);
   da lì si scompone `original/index.html` in componenti:
   - `TopNav` (logo + "Bluetooth® mode")
   - `Hero` (logo-mark, titolo, sottotitolo, CTA, nota requisiti di sistema)
   - `KeyThings` (le due card "Switching is permanent" / "Available until …")
   - `Faq` (lista di `FaqItem` accordion, stato apri/chiudi in React invece di `<details>`
     nativo o mantenendo `<details>` se sufficiente)
   - `LegalNotice`
   - `Footer` (logo, link, language selector — anche se con una sola lingua per ora)
3. **Styling pass** — portare le regole CSS rilevanti da `original/app.css`, verificare parità visiva
   con screenshot a confronto rispetto all'originale.
4. **Asset wiring** — importare SVG/WebP da `original/assets/` tramite Vite (import statico o da
   `public/`, da decidere in base a come Vite gestisce i preload già presenti in `original/index.html`).
5. **Integrazione dell'azione principale** — completata: il bottone "Switch to Bluetooth mode"
   controlla disponibilità WebHID/WebUSB e, su un browser supportato, apre il flusso dentro la
   SPA. Il motore originale (`public/flash/`, firmware serviti localmente da `public/flash/data/`)
   gira invariato in un iframe nascosto stesso-origine: la SPA ne legge il DOM, traduce i testi e
   ne comanda i pulsanti.
6. **Verifica visiva** — confronto manuale pagina nuova vs `original/index.html` originale (nessun dev
   server lasciato in esecuzione a fine sessione, da far testare manualmente).

## Il problema reale: WebUSB

Riscrivere la UI in React **non risolve di per sé** il problema di compatibilità: il blocco è
nell'API browser usata per parlare con il controller via USB, non nel framework di UI.

- `original/app_combined.js` usa `navigator.usb.requestDevice(...)` / `navigator.usb.getDevices()`
  (WebUSB), richiedendo Chrome 108+.
- WebUSB è implementata solo dai browser basati su **Chromium** (Chrome, Edge, Opera, Brave, …).
- **Firefox** non implementa WebUSB (per scelta di design, da anni) né WebHID per questo tipo
  di flusso: **Zen**, essendo basato su Firefox/Gecko, eredita la stessa limitazione.
- Safari (WebKit) non implementa WebUSB.

Questo significa che una vera compatibilità "tutti i browser" richiede una decisione
architetturale che va oltre il semplice redesign frontend. Opzioni da valutare (nessuna
decisa, solo da investigare quando si arriverà a questa fase):

| Opzione | Idea | Pro | Contro |
|---|---|---|---|
| A. Solo Chromium + fallback informativo | Tenere WebUSB, mostrare un avviso chiaro su Firefox/Zen con istruzioni ad usare un browser Chromium | Zero complessità aggiuntiva | Non risolve il requisito "tutti i browser" |
| B. Companion app nativa locale | Piccolo helper locale (es. Tauri/Rust o Node + `node-usb`/`usb`) che apre un bridge WebSocket/HTTP su `localhost`; la pagina React parla con l'helper invece che direttamente con l'USB | Funziona da qualsiasi browser, perché il browser non tocca più l'USB direttamente | Richiede installare/eseguire un eseguibile locale, più superficie da mantenere |
| C. Estensione browser con native messaging | Estensione Firefox/Zen che fa da ponte verso un host nativo | Rimane "dentro" il browser | Più complessa da distribuire, serve firma/pubblicazione estensione |
| D. WebHID | Alternativa a WebUSB per dispositivi HID | — | Stessa limitazione: implementata solo su Chromium, non risolve Firefox/Zen |

La direzione più promettente a prima vista è la **B** (companion app locale), perché è l'unico
approccio che toglie davvero la dipendenza dall'API del browser; va però validato con un piccolo
spike quando si arriverà a questa fase, **non in questo giro**.

## Domande aperte prima di iniziare l'implementazione

- Confermare nome/percorso della cartella del nuovo frontend (`frontend/` dentro
  `StadiaUnlock/` o repo separato?).
- Font Google: self-host o mantenere i link esterni a `fonts.googleapis.com`?
- Si vuole mantenere il multi-lingua (anche solo come struttura) o partire mono-lingua inglese?
- Quando affrontare lo spike sulla companion app (opzione B) rispetto al resto del redesign UI?

## Non-goal espliciti di questo documento

- Nessuna riga di codice applicativo scritta.
- Nessuna decisione presa sull'opzione A/B/C/D per il bypass WebUSB — solo mappatura delle
  alternative.
- Nessun `npm install` / scaffold Vite eseguito.
