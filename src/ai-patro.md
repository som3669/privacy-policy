# AI Patro — Privacy Policy

**Last updated:** September 5, 2026

AI Patro ("we", "our", or "us") operates the AI Patro mobile application (the
"App"). This page explains our policies regarding the collection, use and
disclosure of personal data when you use the App.

## Information we do not collect

AI Patro does **not** collect, store or transmit any personally identifiable
information. No account registration is required, and there is no analytics,
advertising or tracking of any kind.

## Data stored on your device

The App stores the following locally on your device:

- Your selected calendar date and display preferences
- A cached copy of remotely fetched holiday and configuration data (refreshed
  periodically)
- Your Groq API key, if you choose to enter one in Settings

This locally stored data never leaves your device except as described in the two
sections below.

## Remote data fetching

On launch, the App fetches holiday and configuration data from a remote server
to keep festival and tithi information up to date. This request:

- Is an outbound HTTPS GET request to a content delivery endpoint
- Does **not** include any personal or device-identifying information in the
  request body
- Transmits standard HTTP headers (IP address, User-Agent) as a normal
  consequence of any internet request — this data is handled by the CDN provider
  (GitHub/Microsoft) under their own privacy policy
- Is cached locally for up to 24 hours; no request is made if the cache is fresh

## AI features and Groq

The AI assistant, panchang explanations, rashifal, greetings and name
suggestions are the only other network activity in the App. They are served by
**Groq**, a third-party inference provider.

When you use one of those features — and only then — the App sends an HTTPS
request to `api.groq.com` containing:

- The text of your request. For the assistant, this is the message you type and
  the earlier messages in that conversation. For panchang explanations,
  rashifal, greetings and name suggestions, it is the already-computed values
  the App is asking to have explained, plus any name or selection you supplied.
- The requested language and length, and formatting instructions.
- An API key for authentication.

What is **not** sent: your identity, your device identifiers, your location, or
any of your stored preferences or calendar history. There is no account, so
requests are not tied to a profile.

Groq processes these requests on its own servers under
[Groq's privacy policy](https://groq.com/privacy-policy/), and its handling of
the request is governed by that policy rather than this one. Do not type
anything into the assistant that you would not want to send to a third-party
service.

**Every other feature works fully offline** — the calendar, tithi, panchang,
holidays, muhurat, date converter and widget are all computed on your device and
never send anything anywhere.

You may enter your own free Groq API key in Settings (get one at
[console.groq.com/keys](https://console.groq.com/keys)); it is stored only on
your device and is used only to authenticate your own requests. Leaving the AI
features unused means no request to Groq is ever made.

## Internet permission

The App declares the `INTERNET` permission for the two purposes described above:
fetching holiday and configuration data, and the AI features. No other network
activity occurs.

## Third-party services

The App uses no third-party analytics, advertising SDKs or tracking libraries.
Two third parties receive requests:

| Service | What it receives | When |
|---|---|---|
| GitHub (content delivery) | A plain HTTPS GET, plus standard request headers | On launch, at most once every 24 hours |
| Groq (AI inference) | The text of your AI request, as described above | Only when you use an AI feature |

Each provider's own privacy policy applies to requests made to their servers.

## Children's privacy

The App does not knowingly collect any personally identifiable information from
children under 13. The App is suitable for all ages. Note that the AI features
send text to a third-party service; a parent who would rather avoid that can
simply not use them.

## Changes to this policy

We may update this privacy policy from time to time. Changes will be posted on
this page with an updated date.

## Contact

Questions about this privacy policy: [somshrestha3669@gmail.com](mailto:somshrestha3669@gmail.com)
