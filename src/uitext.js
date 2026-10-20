export const UI_TEXT = {
  en: {
    document: {
      title: 'StadiaUnlock — Stadia Controller Bluetooth mode',
      description: 'Switch your Stadia Controller to Bluetooth mode and keep using it wirelessly with compatible devices.',
    },
    nav: { product: 'Bluetooth® mode', info: 'Project information', language: 'Select language' },
    hero: {
      title: 'Play wirelessly with Bluetooth',
      subtitle: 'Switch your Stadia Controller to Bluetooth mode to keep gaming wirelessly on your favorite devices and services after Stadia shuts down.',
      action: 'Switch to Bluetooth mode',
      updateNote: 'Switching to Bluetooth mode downloads a software update',
      requirements: 'System requirements: Chrome 108 or newer',
      imageAlt: 'A Stadia Controller with a hand-drawn rocket flying out of the top alongside pulsing Bluetooth radio waves.',
    },
    keyThings: {
      title: 'Important things to know', permanentTitle: 'Switching is permanent',
      permanentBody: 'Once you switch your controller to Bluetooth mode, you can’t change it back to use Wi-Fi on Stadia. You can still play wired with USB in Bluetooth mode.',
      switchAction: 'Switch to Bluetooth mode',
      availabilityTitle: 'The original service closed on December 31, 2024',
      availabilityBody: 'Google’s web tool is no longer available. StadiaUnlock is preserving the experience, but its React flashing workflow is still being rebuilt.',
      modeAction: 'Check controller mode',
    },
    faq: {
      title: 'Find the answers you need',
      items: [
        { question: 'How do I pair my controller using Bluetooth?', answer: 'After switching your controller into Bluetooth mode, press and hold the Y + Stadia buttons for 2 seconds. The status light will flash orange. Open Bluetooth settings on your device and select the device containing “Stadia”. Once connected, the controller light will turn solid white.', linkLabel: 'Learn how to use Bluetooth mode', action: 'pairing' },
        { question: 'What devices are supported?', answer: 'Compatibility varies between Bluetooth devices. The Stadia Controller uses Bluetooth Low Energy, so features such as pass-through audio aren’t available wirelessly. Google tested Windows 10 and 11 with Steam, macOS 13 with Steam, ChromeOS and Android.', linkLabel: 'List of supported devices', href: 'https://support.google.com/stadia/answer/13067284#zippy=%2Cwhich-devices-are-compatible-with-the-stadia-controller' },
        { question: 'Is audio supported in Bluetooth mode?', answer: 'When the controller is used wirelessly in Bluetooth mode, its 3.5 mm and USB ports can’t be used for headphones. With a wired USB connection, you can use headphones through the controller’s 3.5 mm port.' },
        { question: 'Can I remap the Assistant and Capture buttons?', answer: 'Yes. By default, the Google Assistant and Capture buttons don’t do anything in Bluetooth mode until they are remapped with a compatible button-mapping service.' },
        { question: 'How do I verify my controller’s mode?', answer: 'Connect the controller to your computer with a USB data cable, then start the controller-mode check. This also checks for Bluetooth-mode updates.', linkLabel: 'Check controller mode', action: 'check' },
        { question: 'I can’t complete a step. What should I do?', answer: 'Charge the controller for at least 30 minutes and use a USB data cable that can transfer data. The cable supplied with the controller will work.', linkLabel: 'Open the Bluetooth mode Help Center', href: 'https://support.google.com/stadia/answer/13067284' },
        { question: 'My controller isn’t working. What should I do?', answer: 'Charge it for at least 30 minutes. Unplug it and hold the Stadia button for 10 seconds to reset it. If that fails, hold the Google Assistant and Capture buttons for 6 seconds to perform a factory reset.', linkLabel: 'Open the Bluetooth mode Help Center', href: 'https://support.google.com/stadia/answer/13067284' },
        { question: 'Something else is wrong. Who do I contact?', answer: 'Customer support is no longer available for Bluetooth mode. The archived Stadia help article contains the remaining troubleshooting guidance.', linkLabel: 'Open the Bluetooth mode Help Center', href: 'https://support.google.com/stadia/answer/13067284' },
      ],
    },
    howItWorks: {
      title: 'How it works',
      subtitle: 'Five steps take your controller from Wi-Fi to Bluetooth mode. The whole process takes a few minutes.',
      listLabel: 'Unlock flow steps',
      stepHint: 'Open the guide for this step',
      steps: [
        { id: 'verify', title: 'Verify', summary: 'Plug in the controller and let Chrome recognize it.' },
        { id: 'unlock', title: 'Unlock', summary: 'Press a button sequence to make it ready for the update.' },
        { id: 'download', title: 'Download', summary: 'Chrome downloads the Bluetooth mode update.' },
        { id: 'install', title: 'Install', summary: 'The update is written to the controller. Keep it plugged in.' },
        { id: 'pairing', title: 'Bluetooth on', summary: 'Pair with Y + Stadia and play wirelessly.' },
      ],
      guideAction: 'Read the full guide',
    },
    flowGuide: {
      eyebrow: 'Step-by-step guide',
      title: 'How the unlock works',
      intro: 'Switching to Bluetooth mode takes four phases: Verify, Unlock, Download and Install. Keep the controller plugged in with a USB data cable throughout, and use Chrome 108 or newer.',
      tocLabel: 'Guide sections',
      close: 'Close',
      start: 'Start the unlock',
      sections: [
        { id: 'verify', title: '1. Verify', intro: 'Check that Chrome can see your controller before changing anything.', steps: [
          'Plug your Stadia Controller into your computer with a USB data cable.',
          'Click “Allow Chrome to verify” and choose the controller in the device picker that Chrome shows.',
          'When “Chrome verified your Stadia Controller” appears, go on to the next step.',
        ] },
        { id: 'unlock', title: '2. Unlock', intro: 'This step happens only on the controller. Chrome shows no dialog.', steps: [
          'Unplug the controller to power it off. If it turns back on, hold the Stadia button for 4 seconds to switch it off.',
          'Hold the Menu button while plugging the controller back in. The status light must stay off. If it turns on, unplug the controller and try again.',
          'Press Menu, Google Assistant, A and Y at the same time. The controller gives no feedback; the next step tells you whether it worked.',
        ] },
        { id: 'download', title: '3. Download', intro: 'The Bluetooth mode update is downloaded to the controller.', steps: [
          'Click “Allow Chrome to download” and select the controller from the device list again.',
          'Wait while the update downloads. Do not unplug the controller.',
          'When “Download complete” appears, go on to the installation.',
        ], note: 'If Chrome finds no compatible device, the controller is probably not unlocked. Go back to Unlock and repeat the button sequence.' },
        { id: 'install', title: '4. Install', intro: 'The downloaded update is written to the controller.', steps: [
          'Click “Allow Chrome to install” and select the controller one more time. The installation starts by itself.',
          'Wait for the progress bar to complete. Do not unplug the controller or close the page.',
          'Check the result shown on screen, described below.',
        ] },
        { id: 'outcomes', title: 'Possible outcomes', items: [
          { title: 'Success confirmed', body: 'Your controller is in Bluetooth mode and you can unplug it. You can update another controller, read the pairing guide or return to the home page.' },
          { title: 'Success not confirmed', body: 'Chrome could not confirm automatically that the installation worked. Use “Check controller mode” to see the actual state of the controller.' },
        ] },
        { id: 'pairing', title: 'Pair over Bluetooth', intro: 'After the switch, pair the controller with your device.', steps: [
          'Turn on the controller and hold Y + Stadia for 2 seconds until the status light flashes orange. It is now in pairing mode and visible to other devices.',
          'Open the Bluetooth settings of your device and select the one containing “Stadia”.',
          'When the status light turns solid white, the controller is connected and ready to play.',
        ], note: 'Once paired, the controller reconnects automatically to the last paired device when you turn it on.', table: {
          title: 'Status light',
          head: ['Light', 'Meaning'],
          rows: [
            { tone: 'orange', led: 'Flashing orange', meaning: 'Pairing mode. The controller is visible to other devices.' },
            { tone: 'white-blink', led: 'Flashing white', meaning: 'Reconnecting to the last paired device.' },
            { tone: 'white', led: 'Solid white', meaning: 'Connected and ready to play.' },
          ],
        } },
        { id: 'check', title: 'Check mode and updates', intro: 'You can see the current mode and version of the controller without running the full switch. Plug it in and start “Check controller mode” from the home page.', items: [
          { title: 'Bluetooth mode, up to date', body: 'Nothing to do. You can reinstall Bluetooth mode if you want.' },
          { title: 'Bluetooth mode, outdated', body: 'A new version is available. Update to the latest version; it only takes a few minutes.' },
          { title: 'Still in Wi-Fi mode', body: 'Switch to Bluetooth mode to start the full process from Verify.' },
        ] },
        { id: 'errors', title: 'Problems and recovery', items: [
          { title: 'Controller unplugged midway', body: 'Plug it back in, then restart the current step.' },
          { title: 'Controller not unlocked', body: 'It usually appears during Download. Go back to Unlock and repeat the button sequence.' },
          { title: 'Update interrupted', body: 'The controller needs a reset. Unplug it and hold the Stadia button for 10 seconds, then confirm the reset in the flow before continuing.' },
          { title: 'Still unlocked after a failed reset', body: 'This can cause issues. Go on to the next step only if the controller will not reset properly.' },
          { title: 'Linux: udev rules', body: 'On Linux you may need to update the udev rules manually. Follow the help article that opens in a new tab, then restart the step.' },
          { title: 'Browser not supported', body: 'You need Chrome 108 or newer, or another Chromium-based browser, on a secure connection (HTTPS or localhost). Firefox, Zen and Safari cannot talk to the controller.' },
        ] },
      ],
    },
    legal: 'The Bluetooth® word mark and logos are registered trademarks owned by Bluetooth SIG, Inc. Other trademarks and trade names are those of their respective owners. StadiaUnlock is an independent project and is not affiliated with Google.',
    footer: { projectBy: 'An independent project by', language: 'Select language' },
    flasher: {
      title: 'Controller update',
      close: 'Close',
      closeLocked: 'Closing is disabled while the controller is being updated',
      verifying: 'Checking the integrity of the flashing files…',
      loading: 'Starting the flashing engine…',
      busyNotice: 'Do not unplug the controller or close this page until the update has finished.',
      integrityTitle: 'Flashing is blocked',
      integrityBody: 'The flashing engine or the firmware files do not match the expected checksums. To protect your controller, nothing will be sent to it.',
      integrityDetail: 'Files that failed the check',
      engineTitle: 'The flashing engine did not start',
      engineBody: 'Nothing was sent to your controller. Reload the page and try again.',
      reload: 'Reload page',
    },
    modal: {
      close: 'Close',
      unsupported: { eyebrow: 'Browser not supported', title: 'WebHID or WebUSB is not available', body: 'This controller operation requires WebHID and WebUSB, available in current Chromium-based browsers such as Chrome, Edge, Brave and Opera.', insecureBody: 'WebHID and WebUSB only work in a secure context. Open StadiaUnlock over HTTPS or on localhost, using a current Chromium-based browser.', note: 'Firefox, Zen and Safari do not currently expose the required browser hardware APIs, so they cannot communicate directly with the controller.', action: 'Download Chrome' },
      unavailable: { eyebrow: 'Work in progress', title: 'The flashing workflow is not connected yet', body: 'Your browser supports the required hardware APIs, but the flashing workflow is not currently available.', note: 'No request was sent to your controller and no firmware was changed.', action: 'Read the official controller guide' },
      pairing: { eyebrow: 'Bluetooth help', title: 'Pair your Stadia Controller', body: 'With the controller on, hold Y + Stadia for 2 seconds until the status light flashes orange. Open your device’s Bluetooth settings and select the device containing “Stadia”.', note: 'A solid white status light means the controller is connected and ready to use.', action: 'Open the full guide' },
      info: { eyebrow: 'Info', version: 'Version', build: 'Build', updated: 'Updated', notice: 'StadiaUnlock — Stadia Controller Bluetooth-mode unlock tool.', license: 'View MIT License', copyright: '© 2026 vlT by Veronesi Lorenzo. All rights reserved.' },
      license: {
        eyebrow: 'Open-source license', title: 'MIT License', close: 'Close', back: 'Back to About',
        intro: 'The vlT-authored parts of StadiaUnlock are distributed under the MIT License.',
        terms: `MIT License

Copyright (c) 2026 Veronesi Lorenzo (vlT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
        scope: 'Google-authored mirrored firmware, flashloader binaries, markup, code and assets are excluded. Stadia and Bluetooth® trademarks remain the property of their respective owners.',
      },
    },
  },
  it: {
    document: {
      title: 'StadiaUnlock — Modalità Bluetooth del controller Stadia',
      description: 'Passa il controller Stadia alla modalità Bluetooth e continua a usarlo senza fili con i dispositivi compatibili.',
    },
    nav: { product: 'Modalità Bluetooth®', info: 'Informazioni sul progetto', language: 'Seleziona la lingua' },
    hero: {
      title: 'Gioca senza fili con il Bluetooth',
      subtitle: 'Passa il controller Stadia alla modalità Bluetooth per continuare a giocare senza fili sui tuoi dispositivi e servizi preferiti dopo la chiusura di Stadia.',
      action: 'Passa alla modalità Bluetooth',
      updateNote: 'Il passaggio alla modalità Bluetooth installa un aggiornamento software',
      requirements: 'Requisiti di sistema: Chrome 108 o versioni successive',
      imageAlt: 'Un controller Stadia con un razzo disegnato a mano e onde radio Bluetooth pulsanti.',
    },
    keyThings: {
      title: 'Informazioni importanti', permanentTitle: 'Il passaggio è permanente',
      permanentBody: 'Dopo il passaggio alla modalità Bluetooth non potrai ripristinare la modalità Wi-Fi di Stadia. Potrai comunque giocare via cavo USB.',
      switchAction: 'Passa alla modalità Bluetooth',
      availabilityTitle: 'Il servizio originale è terminato il 31 dicembre 2024',
      availabilityBody: 'Lo strumento web di Google non è più disponibile. StadiaUnlock ne conserva l’esperienza, ma il flusso di aggiornamento React è ancora in ricostruzione.',
      modeAction: 'Controlla la modalità del controller',
    },
    faq: {
      title: 'Trova le risposte che cerchi',
      items: [
        { question: 'Come associo il controller tramite Bluetooth?', answer: 'Dopo il passaggio alla modalità Bluetooth, tieni premuti i pulsanti Y + Stadia per 2 secondi. La spia di stato lampeggerà in arancione. Apri le impostazioni Bluetooth del dispositivo e seleziona quello che contiene “Stadia”. Una volta connesso, la spia diventerà bianca fissa.', linkLabel: 'Scopri come usare la modalità Bluetooth', action: 'pairing' },
        { question: 'Quali dispositivi sono supportati?', answer: 'La compatibilità varia tra i dispositivi Bluetooth. Il controller Stadia usa Bluetooth Low Energy, quindi funzioni come l’audio pass-through non sono disponibili senza fili. Google ha testato Windows 10 e 11 con Steam, macOS 13 con Steam, ChromeOS e Android.', linkLabel: 'Elenco dei dispositivi supportati', href: 'https://support.google.com/stadia/answer/13067284#zippy=%2Cwhich-devices-are-compatible-with-the-stadia-controller' },
        { question: 'L’audio è supportato in modalità Bluetooth?', answer: 'Quando il controller è usato senza fili, le porte da 3,5 mm e USB non possono essere utilizzate per le cuffie. Con una connessione USB via cavo puoi usare le cuffie tramite la porta da 3,5 mm del controller.' },
        { question: 'Posso rimappare i pulsanti Assistente e Acquisisci?', answer: 'Sì. Per impostazione predefinita, in modalità Bluetooth questi pulsanti non eseguono alcuna azione finché non vengono rimappati con un servizio compatibile.' },
        { question: 'Come verifico la modalità del controller?', answer: 'Collega il controller al computer con un cavo dati USB, quindi avvia il controllo della modalità. Verrà verificata anche la presenza di aggiornamenti Bluetooth.', linkLabel: 'Controlla la modalità del controller', action: 'check' },
        { question: 'Non riesco a completare un passaggio. Cosa posso fare?', answer: 'Carica il controller per almeno 30 minuti e usa un cavo dati USB in grado di trasferire dati. Il cavo fornito con il controller è compatibile.', linkLabel: 'Apri il Centro assistenza Bluetooth', href: 'https://support.google.com/stadia/answer/13067284' },
        { question: 'Il controller non funziona. Cosa posso fare?', answer: 'Caricalo per almeno 30 minuti. Scollegalo e tieni premuto il pulsante Stadia per 10 secondi per reimpostarlo. Se non basta, tieni premuti Assistente Google e Acquisisci per 6 secondi per ripristinare i dati di fabbrica.', linkLabel: 'Apri il Centro assistenza Bluetooth', href: 'https://support.google.com/stadia/answer/13067284' },
        { question: 'Ho un altro problema. Chi posso contattare?', answer: 'L’assistenza clienti per la modalità Bluetooth non è più disponibile. L’articolo archiviato del Centro assistenza Stadia contiene le indicazioni ancora disponibili.', linkLabel: 'Apri il Centro assistenza Bluetooth', href: 'https://support.google.com/stadia/answer/13067284' },
      ],
    },
    howItWorks: {
      title: 'Come funziona',
      subtitle: 'Cinque passaggi portano il controller dalla modalità Wi-Fi alla modalità Bluetooth. L’intero processo richiede pochi minuti.',
      listLabel: 'Passaggi del flusso di sblocco',
      stepHint: 'Apri la guida per questo passaggio',
      steps: [
        { id: 'verify', title: 'Verifica', summary: 'Collega il controller e lascia che Chrome lo riconosca.' },
        { id: 'unlock', title: 'Sblocco', summary: 'Premi una sequenza di pulsanti per predisporlo all’aggiornamento.' },
        { id: 'download', title: 'Download', summary: 'Chrome scarica l’aggiornamento della modalità Bluetooth.' },
        { id: 'install', title: 'Installazione', summary: 'L’aggiornamento viene scritto nel controller. Lascialo collegato.' },
        { id: 'pairing', title: 'Bluetooth attivo', summary: 'Associa con Y + Stadia e gioca senza fili.' },
      ],
      guideAction: 'Leggi la guida completa',
    },
    flowGuide: {
      eyebrow: 'Guida passo passo',
      title: 'Come funziona lo sblocco',
      intro: 'Il passaggio alla modalità Bluetooth si svolge in quattro fasi: Verifica, Sblocco, Download e Installazione. Tieni il controller collegato con un cavo dati USB per tutto il tempo e usa Chrome 108 o successivo.',
      tocLabel: 'Sezioni della guida',
      close: 'Chiudi',
      start: 'Avvia lo sblocco',
      sections: [
        { id: 'verify', title: '1. Verifica', intro: 'Controlla che Chrome riesca a vedere il controller prima di modificare qualsiasi cosa.', steps: [
          'Collega il controller Stadia al computer con un cavo dati USB.',
          'Fai clic su “Consenti a Chrome di verificare” e scegli il controller nel selettore dei dispositivi mostrato da Chrome.',
          'Quando compare “Chrome ha verificato il controller Stadia”, passa al passaggio successivo.',
        ] },
        { id: 'unlock', title: '2. Sblocco', intro: 'Questo passaggio si svolge solo sul controller. Chrome non mostra alcuna finestra.', steps: [
          'Scollega il controller per spegnerlo. Se si riaccende, tieni premuto il pulsante Stadia per 4 secondi per spegnerlo.',
          'Tieni premuto il pulsante Menu mentre ricolleghi il controller. La spia di stato deve restare spenta. Se si accende, scollega il controller e riprova.',
          'Premi contemporaneamente Menu, Assistente Google, A e Y. Il controller non dà alcun segnale; il passaggio successivo ti dirà se ha funzionato.',
        ] },
        { id: 'download', title: '3. Download', intro: 'L’aggiornamento della modalità Bluetooth viene scaricato nel controller.', steps: [
          'Fai clic su “Consenti a Chrome di scaricare” e seleziona di nuovo il controller dall’elenco dei dispositivi.',
          'Attendi il download dell’aggiornamento. Non scollegare il controller.',
          'Quando compare “Download completato”, passa all’installazione.',
        ], note: 'Se Chrome non trova alcun dispositivo compatibile, probabilmente il controller non è sbloccato. Torna allo Sblocco e ripeti la sequenza di pulsanti.' },
        { id: 'install', title: '4. Installazione', intro: 'L’aggiornamento scaricato viene scritto nel controller.', steps: [
          'Fai clic su “Consenti a Chrome di installare” e seleziona il controller ancora una volta. L’installazione parte da sola.',
          'Attendi che la barra di avanzamento si completi. Non scollegare il controller e non chiudere la pagina.',
          'Controlla l’esito mostrato a schermo, descritto qui sotto.',
        ] },
        { id: 'outcomes', title: 'Esiti possibili', items: [
          { title: 'Successo confermato', body: 'Il controller è in modalità Bluetooth e puoi scollegarlo. Puoi aggiornare un altro controller, leggere la guida all’associazione o tornare alla home.' },
          { title: 'Successo non confermato', body: 'Chrome non è riuscito a confermare automaticamente che l’installazione sia andata a buon fine. Usa “Controlla la modalità del controller” per vedere lo stato reale del controller.' },
        ] },
        { id: 'pairing', title: 'Associazione Bluetooth', intro: 'Dopo il passaggio, associa il controller al tuo dispositivo.', steps: [
          'Accendi il controller e tieni premuti Y + Stadia per 2 secondi finché la spia di stato lampeggia in arancione. Il controller è ora in modalità di associazione e visibile agli altri dispositivi.',
          'Apri le impostazioni Bluetooth del dispositivo e seleziona quello che contiene “Stadia”.',
          'Quando la spia diventa bianca fissa, il controller è connesso e pronto per giocare.',
        ], note: 'Dopo l’associazione, il controller si riconnette in automatico all’ultimo dispositivo associato quando lo accendi.', table: {
          title: 'Spia di stato',
          head: ['Spia', 'Significato'],
          rows: [
            { tone: 'orange', led: 'Arancione lampeggiante', meaning: 'Modalità di associazione. Il controller è visibile agli altri dispositivi.' },
            { tone: 'white-blink', led: 'Bianca lampeggiante', meaning: 'Riconnessione all’ultimo dispositivo associato.' },
            { tone: 'white', led: 'Bianca fissa', meaning: 'Connesso e pronto per giocare.' },
          ],
        } },
        { id: 'check', title: 'Controllo di modalità e aggiornamenti', intro: 'Puoi vedere modalità e versione attuali del controller senza eseguire l’intero passaggio. Collegalo e avvia “Controlla la modalità del controller” dalla home.', items: [
          { title: 'Modalità Bluetooth aggiornata', body: 'Non devi fare nulla. Se vuoi, puoi reinstallare la modalità Bluetooth.' },
          { title: 'Modalità Bluetooth obsoleta', body: 'È disponibile una nuova versione. Aggiorna all’ultima versione: bastano pochi minuti.' },
          { title: 'Ancora in modalità Wi-Fi', body: 'Passa alla modalità Bluetooth per avviare l’intero processo dalla Verifica.' },
        ] },
        { id: 'errors', title: 'Problemi e ripristino', items: [
          { title: 'Controller scollegato a metà', body: 'Ricollegalo, poi riavvia il passaggio in corso.' },
          { title: 'Controller non sbloccato', body: 'Di solito compare durante il Download. Torna allo Sblocco e ripeti la sequenza di pulsanti.' },
          { title: 'Aggiornamento interrotto', body: 'Il controller va reimpostato. Scollegalo e tieni premuto il pulsante Stadia per 10 secondi, poi conferma il ripristino nel flusso prima di continuare.' },
          { title: 'Ancora sbloccato dopo un ripristino non riuscito', body: 'Questo può causare problemi. Passa al passaggio successivo solo se il controller non si reimposta correttamente.' },
          { title: 'Linux: regole udev', body: 'Su Linux potrebbe essere necessario aggiornare manualmente le regole udev. Segui l’articolo di aiuto che si apre in una nuova scheda, poi riavvia il passaggio.' },
          { title: 'Browser non supportato', body: 'Serve Chrome 108 o successivo, oppure un altro browser basato su Chromium, su una connessione sicura (HTTPS o localhost). Firefox, Zen e Safari non possono comunicare con il controller.' },
        ] },
      ],
    },
    legal: 'Il marchio denominativo e i loghi Bluetooth® sono marchi registrati di Bluetooth SIG, Inc. Gli altri marchi e nomi commerciali appartengono ai rispettivi proprietari. StadiaUnlock è un progetto indipendente e non è affiliato a Google.',
    footer: { projectBy: 'Un progetto indipendente di', language: 'Seleziona la lingua' },
    flasher: {
      title: 'Aggiornamento del controller',
      close: 'Chiudi',
      closeLocked: 'La chiusura è disattivata mentre il controller viene aggiornato',
      verifying: 'Controllo dell’integrità dei file di flash…',
      loading: 'Avvio del motore di flash…',
      busyNotice: 'Non scollegare il controller e non chiudere questa pagina finché l’aggiornamento non è terminato.',
      integrityTitle: 'Flash bloccato',
      integrityBody: 'Il motore di flash o i file del firmware non corrispondono ai checksum attesi. Per proteggere il controller, non gli verrà inviato nulla.',
      integrityDetail: 'File che non hanno superato il controllo',
      engineTitle: 'Il motore di flash non si è avviato',
      engineBody: 'Al controller non è stato inviato nulla. Ricarica la pagina e riprova.',
      reload: 'Ricarica la pagina',
    },
    modal: {
      close: 'Chiudi',
      unsupported: { eyebrow: 'Browser non supportato', title: 'WebHID o WebUSB non sono disponibili', body: 'Questa operazione richiede WebHID e WebUSB, disponibili nei browser aggiornati basati su Chromium, come Chrome, Edge, Brave e Opera.', insecureBody: 'WebHID e WebUSB funzionano solo in un contesto sicuro. Apri StadiaUnlock tramite HTTPS o localhost con un browser Chromium aggiornato.', note: 'Firefox, Zen e Safari al momento non espongono le API hardware necessarie e non possono comunicare direttamente con il controller.', action: 'Scarica Chrome' },
      unavailable: { eyebrow: 'Lavori in corso', title: 'Il flusso di aggiornamento non è disponibile', body: 'Il browser supporta le API hardware necessarie, ma il flusso di aggiornamento non è al momento disponibile.', note: 'Non è stata inviata alcuna richiesta al controller e il firmware non è stato modificato.', action: 'Leggi la guida ufficiale del controller' },
      pairing: { eyebrow: 'Guida Bluetooth', title: 'Associa il controller Stadia', body: 'Con il controller acceso, tieni premuti Y + Stadia per 2 secondi finché la spia non lampeggia in arancione. Apri le impostazioni Bluetooth del dispositivo e seleziona quello che contiene “Stadia”.', note: 'La spia bianca fissa indica che il controller è connesso e pronto all’uso.', action: 'Apri la guida completa' },
      info: { eyebrow: 'Informazioni', version: 'Versione', build: 'Build', updated: 'Aggiornato', notice: 'StadiaUnlock — strumento per la modalità Bluetooth del controller Stadia.', license: 'Visualizza la licenza MIT', copyright: '© 2026 vlT di Veronesi Lorenzo. Tutti i diritti riservati.' },
      license: {
        eyebrow: 'Licenza open source', title: 'Licenza MIT', close: 'Chiudi', back: 'Torna alle informazioni',
        intro: 'Le parti di StadiaUnlock realizzate da vlT sono distribuite con licenza MIT.',
        terms: `MIT License

Copyright (c) 2026 Veronesi Lorenzo (vlT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`,
        scope: 'Firmware, flashloader, markup, codice e asset speculari creati da Google sono esclusi. I marchi Stadia e Bluetooth® restano di proprietà dei rispettivi titolari.',
      },
    },
  },
}

export function getInitialLanguage() {
  try {
    const savedLanguage = window.localStorage.getItem('stadiaunlock-language')
    if (UI_TEXT[savedLanguage]) return savedLanguage
  } catch {}
  return window.navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en'
}

export function saveLanguage(language) {
  try {
    window.localStorage.setItem('stadiaunlock-language', language)
  } catch {}
}
