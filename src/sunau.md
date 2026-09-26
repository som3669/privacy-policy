# Sunau — Privacy Policy

**Last updated:** 26 September 2026

## Summary

Sunau reads notifications only from apps you choose, turns them into speech on your phone, and
does not upload them anywhere. It has no accounts. The only data that leaves
your phone is the diagnostic information Google ML Kit sends, described below.

## Notification Access

Sunau uses Android's Notification Access permission to read the title and text of notifications
so it can translate and announce them. Only notifications from apps you switch on in "Apps to
Announce" are processed; notifications from every other app are ignored before their content is
read. You can revoke Notification Access at any time in Android settings.

## Sensitive information

Every notification passes a filter before it is translated, spoken or saved. Notifications
containing one-time passwords, verification codes, passwords, PINs, CVVs or card numbers are
blocked completely. Account numbers, reference numbers, phone numbers and links are removed from
what remains.

## Processing on your phone

Language detection and translation use Google ML Kit, which runs on your device. Translation
models are downloaded from Google the first time you enable a language. Speech uses the
text-to-speech engine installed on your phone. If your chosen voice is an online voice provided by
your speech engine, that engine's own privacy policy applies to the speech it generates.

## Diagnostics sent by Google ML Kit

Google ML Kit sends Google diagnostic and usage information: device model and Android version,
Sunau's package name and version, a per-installation identifier, performance metrics and error
codes, and which languages were detected or configured for translation. Google uses it for
diagnostics and usage analytics, encrypts it in transit and does not share it with third parties.
Google's published list of this data does not include the text being detected or translated, and
Sunau never sends notification text anywhere. See
[ML Kit's data disclosure](https://developers.google.com/ml-kit/android-data-disclosure).

## What is stored

Settings are stored on your phone, including any sender names and keywords you add to sender
rules. Sunau also keeps today's number of payments received and their total for the daily summary
and the home-screen widget; these reset every day. If history is on (it can be turned off), Sunau
stores the app name, the time, whether an item was a message, a payment or a blocked notification,
and for payments the type and amount. The text of notifications is never stored. The last
announcement is kept in memory only, so it can be repeated, and is gone when Sunau stops. History
is deleted
automatically after the period you choose and can be cleared at any time. Sunau's data is excluded
from Android cloud backup and device transfer.

## Advertising

The current version of Sunau shows no advertising. A future version may show ads; if it does,
this policy will be updated to describe the advertising provider and the data it uses before that
version is released. Notification text will never be used for advertising.

## Sharing

Sunau does not sell, share or transmit notification content or history to anyone, including the
developer. The developer receives no data from the app.

## Independence

Sunau is not affiliated with any bank, wallet, payment provider or messaging service whose
notifications it reads. Their names and trademarks belong to their owners.

## Children

Sunau is not directed at children under 13.

## Changes and contact

If this policy changes, the new version will be published at the same address with a new date.
Questions: use the developer contact address on Sunau's Google Play listing.
