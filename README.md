<p align="center">
  <img src="public/flash/assets/logo-mark.svg" width="64" height="43" alt="Stadia logo mark" />
</p>

<h1 align="center">StadiaUnlock</h1>

<p align="center">A vlT project by Veronesi Lorenzo</p>

<p align="center">
  A preserved, locally-hosted tool that switches a Stadia Controller from Wi‑Fi mode to
  Bluetooth mode.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-0.1.0--R201026-b23b3f?style=flat-square" alt="version"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license"/>
</p>

---

## What this is

Google shut down Stadia, but the Stadia Controller can still be switched from Wi‑Fi mode
to Bluetooth Low Energy mode to keep using it with other devices. This repository keeps
that switching tool alive and runnable outside of Google's infrastructure.

The tool works entirely in the browser through the original Google **WebHID/WebUSB** flashing
workflow: it talks directly to the controller, verifies it, then flashes a signed firmware image
that enables Bluetooth mode.

## Contents

`original/` is a local, gitignored reference copy of the upstream Google mirror. The deployable
copy of the original flashing page, its assets and firmware lives under `public/flash/` so Vite
ships it untouched alongside the React home page.

| Path | Purpose |
|---|---|
| [original/index.html](original/index.html) | Main page markup (hero, FAQ, language selector) |
| [original/app_combined.js](original/app_combined.js) | Original Google JS bundle — WebUSB flashing flow, i18n, UI logic |
| [original/app.css](original/app.css) | Original stylesheet |
| [original/assets/](original/assets/) | Logos, illustrations and step-by-step diagrams (SVG/WebP) |
| [original/data/](original/data/) | Signed firmware images and flashloader binaries used during the unlock flow |
| [public/flash/](public/flash/) | Preserved Google flashing engine (`app_combined.js`), page, assets and firmware, unmodified; loaded invisibly behind the React interface |
| [src/flasher/](src/flasher/) | Integrity check of the bundled files, engine bridge and Italian translations of the flashing flow |
| [FLOW.md](FLOW.md) | Reference content describing the step-by-step unlock flow, written to be navigable page-by-page in the future React SPA |
| [index.html](index.html), [src/](src/), [vite.config.js](vite.config.js), [package.json](package.json) | The React app — Vite + React rewrite of the home page (header, hero, "Important things to know", FAQ, legal notice, footer), at the repo root, same layout as the other vlT React apps |

## Local Development

The runnable app lives directly at the repo root — `index.html`, `src/`, `vite.config.js` and
`package.json` with its own real `dependencies`/`devDependencies` — same layout as the other vlT
React apps (`examgrid`, `nxget-app-portal`), no subfolder and no proxying:

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
npm run check:i18n  # verify every text of the flashing engine has an Italian translation
```

## Browser support

Controller operations require **WebHID and WebUSB** (`navigator.hid` / `navigator.usb`), which
are available in Chromium-based browsers (Chrome 108+, Edge, Opera, Brave, …). The React
interface detects unsupported browsers or insecure contexts and displays an explanatory modal;
Firefox, Zen and Safari cannot communicate directly with the controller because they do not
expose the required browser hardware APIs. On a supported browser, the CTA opens the update flow
inside the React interface, which drives the original Google workflow with local firmware files.
Before anything is sent to the controller the page verifies the bundled engine and firmware, and
it blocks the update if they do not match. Closing the flow is disabled while an update is running.

Removing this limitation — by rewriting the frontend and evaluating a cross-browser-compatible
way to talk to the controller — is tracked as a separate, planning-only effort in [plan.md](plan.md).
No implementation for that part has started yet.

## Status

A local, gitignored [original/](original/) folder still holds an unmodified copy of the upstream
tool for reference. Alongside it, a React rewrite of the home page now lives directly at the
repo root — a standalone Vite + React app
that ports `original/index.html`'s content (header, hero, "Important things to know", FAQ, legal notice,
footer) with react-icons in place of Google Material Symbols. It now includes English/Italian
localization, working resource links, compatibility and pairing modals, an animated project
header, progressive entrance effects and a larger animated primary CTA. The CTA opens the
multi-step unlock flow inside the React interface, in English or Italian and in the app theme.
The original Google engine runs unmodified behind it and its firmware and flashloader files are
served locally from `public/flash/data/`. Hardware flashing still needs manual verification with
a real controller in a Chromium browser.

The home page includes a "How it works" section with a five-step diagram (Verify, Unlock, Download, Install, Bluetooth on). Each step, and a dedicated button, opens an in-app step-by-step guide for end users, in English or Italian, covering the button sequences, possible outcomes, pairing, the status-light legend and recovery from problems.

## Deployment

A GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) builds the app and publishes it to GitHub Pages on every push to `sourcecode`, under the `/stadia-unlock/` path.
See [CHANGELOG.md](CHANGELOG.md) for what has actually shipped and [handoff.md](handoff.md) for
session-level detail.

## License

This repository is open source under the [MIT License](LICENSE).

## Credits & disclaimer

StadiaUnlock is maintained by vlT (Veronesi Lorenzo). The underlying firmware tool was
originally built by Google LLC and hosted at `stadia.google.com/controller`; all original
code, assets and firmware images remain the property of Google LLC. This copy was initially
mirrored from [ChristopherKlay/stadiacontroller](https://github.com/ChristopherKlay/stadiacontroller).
This project is not affiliated with, endorsed by, or sponsored by Google. "Stadia" and the
Bluetooth® word mark/logo are trademarks of their respective owners.
