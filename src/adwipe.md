# Privacy Policy — Adwipe

**Last updated:** July 12, 2026

Adwipe is built to protect your privacy. This policy explains exactly what the extension does and does not do with your information.

## Summary

**Adwipe does not collect, store, transmit, or sell any personal data. Everything runs locally in your browser.**

## What data the extension accesses

To block ads and trackers, Adwipe needs to inspect network requests and page content in your browser. This happens **entirely on your device**:

- **Network requests** — matched against a local blocklist to decide what to block. Chrome's `declarativeNetRequest` engine performs this locally; the extension never sees a log of your browsing.
- **Page content** — content scripts hide leftover ad elements and skip YouTube video ads. This runs in the page and sends nothing anywhere.

## What data the extension stores

The following is saved **locally** using Chrome's `storage.local` API and never leaves your device:

- Whether protection is on or off
- Your per-site allowlist (sites where you chose to disable blocking)
- A count of how many ads have been blocked

You can erase all of it at any time by removing the extension.

## What the extension does NOT do

- ❌ No personal data collection
- ❌ No browsing history collection
- ❌ No tracking or analytics
- ❌ No telemetry
- ❌ No data sent to any server
- ❌ No data sold or shared with third parties
- ❌ No account or sign-up required

## Permissions explained

| Permission | Why it is needed |
|------------|------------------|
| `declarativeNetRequest` | Block ad and tracker requests locally |
| `declarativeNetRequestFeedback` | Count how many requests were blocked |
| `storage` | Remember your settings and allowlist |
| `tabs` | Show the correct blocked count for the active tab |
| `alarms` | Periodically refresh the blocked-count total |
| `host_permissions` (`<all_urls>`) | Apply ad blocking on the sites you visit |

Host access is used **only** to block ads and clean pages. No page data is recorded or transmitted.

## Third parties

Adwipe uses **no** third-party services, SDKs, or analytics providers.

## Changes to this policy

If this policy changes, the "Last updated" date above will change and the new version will be published at the same URL.

## Contact

Questions about this policy: **somshrestha3669@gmail.com**
