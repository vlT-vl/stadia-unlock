# Changelog

## 2026-10-20

- Sezione "Come funziona" in home page con il diagramma del flusso di sblocco in cinque passi (Verifica, Sblocco, Download, Installazione, Bluetooth attivo).
- Guida passo passo in una finestra dedicata, in italiano e inglese: sequenze dei pulsanti, esiti possibili, pairing, legenda della spia di stato e recupero dai problemi; apribile da ogni passo del diagramma e dal pulsante della sezione, con accesso diretto all'avvio dello sblocco.
- Pubblicazione automatica su GitHub Pages a ogni push su `sourcecode`.
- Versione 0.1.0, build R201026.

## 2026-10-16

- Avvio del progetto StadiaUnlock: README in inglese, descrizione in italiano, licenza MIT e documento di riferimento del flusso di unlock ([FLOW.md](FLOW.md)).
- Piano di migrazione del frontend a React + react-icons + Vite ([plan.md](plan.md)).
- Home page riscritta come applicazione React + Vite alla root del repository: intestazione, hero, "Important things to know", FAQ, nota legale e footer.
- Interfaccia in inglese e italiano, con selettore della lingua nella barra superiore e scelta ricordata tra le visite.
- Finestra Info con versione, build, data e versioni delle librerie; finestra della licenza MIT.
- Finestre di avviso per browser non supportato, contesto non sicuro e istruzioni di pairing Bluetooth.
- Link utili verso privacy, termini, compatibilità e guida ufficiale del controller.
- Animazioni della pagina (ingresso, controller, pulsante principale) che rispettano le preferenze di movimento ridotto.
- Logo animato StadiaUnlock in intestazione, hero, footer e finestra Info; logo vlT nel footer. Nessun riferimento o link Google nel footer.
- Il pulsante "Switch to Bluetooth mode" verifica il supporto WebHID/WebUSB e apre il flusso di aggiornamento dentro la SPA, con tema dell'app e testi in italiano o inglese.
- Motore di flashing originale di Google preservato invariato in `public/flash/`, insieme ai suoi file firmware, e usato dietro la nuova interfaccia.
- Pulsanti del flusso di aggiornamento animati come quello della home (bagliore, riflesso, freccia), pronti all'azione, e card e barra inferiore allineate su desktop e mobile.
- Modali di errore del flusso (batteria scarica, controller scollegato o ancora sbloccato, uso da un'altra scheda, regole Linux) tradotti in italiano, con le icone corrette.
- Tutti i testi del flusso di aggiornamento usano la stessa terminologia italiana del resto dell'app, con un controllo automatico che segnala ogni testo del motore ancora senza traduzione.
- Controllo di integrità del motore e dei firmware prima di ogni aggiornamento: se qualcosa non corrisponde, al controller non viene inviato nulla.
- Durante download e installazione non si può chiudere il flusso né uscire dalla pagina senza un avviso.
- Titolo della pagina e favicon impostati su StadiaUnlock.
- Mirror statico originale spostato nella cartella locale `original/`, esclusa dal controllo di versione.
