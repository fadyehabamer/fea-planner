# Custom font files

`thmanyah/` holds the four Thamanya (thmanyah sans) weights the site ships,
loaded through `next/font/local` in [`lib/fonts.ts`](../../lib/fonts.ts), which
bundles and fingerprints them at build time.

Thamanya's licence allows web use only as part of a packaged product and
forbids redistributing the font files, so add only the weights you use here
and keep the vendor download (OTFs, PDFs) out of the repository.
