# Unlock flow — reference content

> **Purpose:** this file is the source-of-truth content for the step-by-step unlock flow,
> written to be mapped 1:1 onto the navigable step pages/routes of the future React SPA
> (see [plan.md](plan.md)). It's a content reference, not a spec of UI components or code —
> no implementation decision is made here.

The flow below is reconstructed from the original wizard in `app_combined.js` / `index.html`.
Each top-level heading is a candidate page/route in the rewritten SPA; sub-steps within a page
are candidate panel/state transitions on that same page.

## 0. Home

Entry point. Two primary actions:

- **Switch to Bluetooth mode** → starts the main flow (steps 1–4 below).
- **Check mode and updates** → starts the [check-mode flow](#5-check-mode-and-updates) instead.

Key facts shown here: switching is **permanent** (no going back to Wi‑Fi mode on Stadia), and
the feature was available until Dec 31, 2023 on the original Google-hosted tool.

## 1. Verify

Goal: confirm Chrome can see the controller over USB before doing anything else.

1. **Plug in controller** — "First, plug your Stadia Controller into your computer."
   (illustration: `Verify_Plug_in_controller.svg`)
2. Button: **Allow Chrome to verify** → opens the browser's USB device picker.
   (illustration: `Chrome_dialog_Verify.svg`)
3. On success — **Chrome verified your Stadia Controller** → "Go to the next step to unlock
   your controller." (illustration: `Verify_Chrome_verified_your_controller.svg`)

## 2. Unlock

Goal: put the controller into a state where firmware can be written to it. No Chrome dialog in
this step — it's purely physical actions on the controller, done in sequence:

1. **Unplug your controller to power it off.** If it turns back on, hold the Stadia button for
   4 seconds to power it off. (illustration: `Unlock_Unplug.svg`)
2. **Hold the Menu button while plugging in your controller.** The status light should stay
   off — if it turns on, unplug and retry. (illustration: `Unlock_Option_Plug.svg`)
3. **Press the Menu, Google Assistant, A, and Y buttons at the same time.** There's no
   controller feedback for this; the next step confirms whether it worked.
   (illustration: `Unlock_Four_buttons.svg`)

## 3. Download

Goal: download the Bluetooth-mode firmware update to the controller.

1. Button: **Allow Chrome to download** → pick the controller again from the device list.
   (illustration: `Chrome_dialog_Download.svg`)
2. Progress: "Downloading Bluetooth mode update. Don't unplug your controller."
3. Branch — **no compatible device found**: the controller may still be locked → link back to
   [Unlock](#2-unlock).
4. On success — **Download complete** → "You're almost done! Go to the final step to install
   the latest version of Bluetooth mode." (illustration: `Download_Download_complete.svg`)

## 4. Install

Goal: flash the downloaded update onto the controller.

1. Button: **Allow Chrome to install** → pick the controller one more time, installation
   starts automatically.
2. Progress: "Installing Bluetooth mode update. Don't unplug your controller." (progress bar)
3. Outcome A — **confirmed success**: "Your controller is in Bluetooth mode and can pair to
   Bluetooth devices. You can now unplug your controller." (illustration:
   `Finish_Bluetooth_enabled.svg`)
   - Secondary actions: *Update another Stadia Controller*, *Learn how to use Bluetooth mode*
     (opens the [pairing help](#6-pairing-help) content), *Return home*.
4. Outcome B — **unconfirmed success**: "Chrome couldn't automatically confirm if installation
   worked." (illustration: `Finished_but_needs_confirmation.svg`)
   - Action: **Check controller mode** → goes to [Check mode and updates](#5-check-mode-and-updates).

## 5. Check mode and updates

Goal: let the user check the controller's current mode/firmware version without running the
full switch flow. Reachable both from Home and as a recovery path from step 4.

Three possible outcomes once the controller is read:

- **Up to date in Bluetooth mode** → action: *Reinstall Bluetooth mode*.
- **Outdated Bluetooth mode** — "A new version of Bluetooth mode is available… this should only
  take a few minutes." → action: *Update to latest version* (re-enters [Download](#3-download)/[Install](#4-install)).
- **Still in Wi‑Fi mode** — "This is the best way to play on Stadia. Switch to Bluetooth mode to
  play on more devices and services." → action: *Switch to Bluetooth mode* (re-enters the main
  flow from [Verify](#1-verify)).

## 6. Pairing help

Reference content shown in a "Getting started with Bluetooth" modal, reachable from the finish
state of [Install](#4-install) or from the FAQ.

- **How to pair:** hold "Y + Stadia" for 2 seconds until the status light flashes orange — the
  controller is now in pairing mode and visible to other devices. (illustration:
  `Pairing_mode.svg`)

**LED status legend** (also worth its own always-reachable reference page):

| LED state | Meaning | Illustration |
|---|---|---|
| Flashing orange | Pairing mode, visible to other devices | `LED_Flashing_Orange.svg` |
| Flashing white | Connecting to the last paired device | `LED_Flashing_White.svg` |
| Solid white | Connected and ready to play | `LED_Solid_White.svg` |

## 7. Error & recovery states

These aren't a linear step but interrupts that can happen at almost any point in steps 1–4.
Worth modeling as shared, reusable panels rather than per-page copies:

- **Controller unplugged mid-step** — "Plug in the controller, then restart this step."
- **Controller not unlocked** (hit during Download) — "Return to the Unlock step and try again."
  → action: *Return to Unlock step*.
- **Update interrupted** — "The update was interrupted and your controller needs to be reset."
- **Still unlocked after a failed reset** — "This can cause issues… only go to the next step if
  your controller won't reset properly."
- **Manual reset** — "Unplug your controller, then hold the Stadia button for 10 seconds to
  reset it." + a confirmation checkbox ("I confirm that I unplugged and reset my controller")
  before continuing.
- **Linux-only**: "Manually update Linux udev rules to continue" — opens an external help
  article in a new tab, then the user restarts the current step.
- **Unsupported browser** — "You need to use Chrome version 108 or later…" with actions to
  *Download Chrome* / *Update Chrome to the latest version*. This is the exact panel that the
  cross-browser rewrite (see [plan.md](plan.md)) is meant to eventually replace for
  Firefox/Zen users, once a compatibility strategy is chosen.

## 8. Wi‑Fi revert (internal/dogfood only)

The original tool also contains a reverse flow ("Revert to Wi‑Fi mode") gated behind a
"Dogfood only" label, i.e. not meant for the public build. It mirrors steps 3–4 but installs a
"gotham" (Wi‑Fi) image instead of "bruce" (Bluetooth), ending in: "Your controller is now in
Wi‑Fi mode. Enjoy gaming on Stadia… hold the Stadia button for 4 seconds to turn it on and
enter linking mode." (illustration: `Finish_Wi_Fi_enabled.svg`). Listed here for completeness;
not expected to be part of the public-facing rewrite unless explicitly requested.

## FAQ content

The existing FAQ in `index.html` ("How do I pair…", "What devices are supported?", "Is audio
supported…", "Can I remap the Assistant and Capture buttons?", "How do I verify my
controller's mode?", "I can't complete a step. What should I do?", "My controller isn't
working. What should I do?", "Something else is wrong. Who do I contact?") stays as reference
content for its own page/section and isn't duplicated here.
