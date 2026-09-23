# Custom font files

Drop Thamanya's web files here (`.woff2` preferred), then follow the
instructions at the top of [`lib/fonts.ts`](../../lib/fonts.ts) — it is a
two-line switch and nothing else in the codebase needs to change.

Thamanya is published by Thmanyah rather than Google Fonts, so it cannot be
loaded through `next/font/google`. Check its licence covers use on a public
site before shipping it.

Files in this folder are processed by `next/font/local`, which self-hosts and
fingerprints them at build time — no runtime request to a third party.
