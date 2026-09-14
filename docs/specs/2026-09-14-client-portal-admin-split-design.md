# Client Portal / Admin Split — Design

Status: approved, not yet implemented.

## Problem

The public client-information site (`terms.html`) currently has the
Website Sale & Transfer Agreement's fields — price, names, dates, support
terms — directly editable on the page the client signs. Nothing stops a
client from changing those values before signing. There's also no way for
Toby to prep a client's contract without either editing the live public
page (visible to whoever's using it) or maintaining a private copy
somewhere else.

## Goal

Split into two deployments:

1. **Client site** (existing repo `clientwebsit`, unchanged public URL) —
   read-only for visitors. Shows whichever client's contract is currently
   "published," or a plain "no active client" message if none is.
2. **Admin site** (new, separate repo, password-gated, only Toby uses it)
   — where Toby fills in / edits the current client's contract details,
   publishes them (client site updates immediately, same URL), and clears
   them when done (client site reverts to "no active client").

One "current client" slot at a time — starting a new client before the
previous one has signed overwrites what they see. This is accepted as a
known workflow constraint, not a bug.

## Architecture

```
┌─────────────────────┐         ┌──────────────────────────┐
│   Admin site         │         │   Client site (existing) │
│   (new repo, private)│         │   (clientwebsit repo)    │
│                       │         │                          │
│  index.html           │         │  terms.html               │
│  - contract fields     │         │  - GET /api/client-data    │
│  - "My Signature" pad   │         │    on load                  │
│  - Publish (+password)   │         │  - renders read-only if    │
│  - Clear (+password)      │──POST──▶│    data present, else       │
│                             │  auth   │    "no active client"        │
│  api/publish.js              │  via   │                                │
│  - checks ADMIN_PASSWORD      │secret  │  api/client-data.js             │
│    server-side                 │ header │  - GET: public, returns         │
│  - forwards to client site's    │       │    current blob (or null)        │
│    /api/client-data with         │       │  - POST: requires                 │
│    CLIENT_API_SECRET header        └──────▶  x-api-secret header             │
│                                                matching CLIENT_API_SECRET       │
│                                                env var; overwrites the blob     │
│                                                                                  │
│                                              Storage: small Vercel-native        │
│                                              key-value store holding one JSON     │
│                                              object (exact product — Global        │
│                                              Config vs Blob — decided during        │
│                                              implementation per Vercel's current      │
│                                              guidance)                                 │
└─────────────────────┘         └──────────────────────────┘
```

## Data shape (the published blob)

```json
{
  "client": {
    "sellerName": "", "sellerAddress": "",
    "buyerName": "", "buyerAddress": "",
    "date": "", "projectName": "", "previewUrl": "", "demoDate": "",
    "delivered": "", "totalPrice": "", "depositAmount": "", "depositPercent": "",
    "balanceTerms": "", "paymentMethod": "", "lateDays": "", "jurisdiction": "",
    "support": "", "sellerPrint": "", "buyerPrint": ""
  },
  "sellerSignaturePng": "data:image/png;base64,..."
}
```

`client` is `null` when cleared (client site shows "no active client").
`sellerSignaturePng` persists independently — Clear does not wipe it,
since Toby's own signature doesn't change per client. It's set via its own
"My Signature" section on the admin page, saved whenever redrawn.

## Client site changes (`terms.html`)

- Remove the "Agreement details" editable input grid and the Seller
  signature pad entirely from this page.
- On load: `fetch('/api/client-data')`.
  - If `client` is null/missing: show a plain message, no contract, no
    signature pad.
  - Else: render the contract (reusing the existing `contractHtml` /
    `contractPlainText` functions, fed from the fetched data instead of
    live inputs) as plain read-only text. Show the seller's signature as
    a static `<img>` from `sellerSignaturePng`. Show one signature pad —
    Buyer only.
- PDF generation (`jsPDF`) unchanged in mechanism, just sources seller
  signature from the fetched PNG instead of a live canvas, and buyer
  signature from the one remaining pad.
- "Email a copy" mailto button unchanged.

New: `api/client-data.js` (Vercel serverless function)
- `GET`: public, no auth, returns the current blob (or `{client: null}`).
- `POST`: requires header `x-api-secret` matching `CLIENT_API_SECRET` env
  var (Vercel Production env, not exposed to any browser bundle). Body is
  the new blob (or `{client: null}` to clear the client while keeping
  `sellerSignaturePng`, or a full clear). Returns 401 if the header is
  missing/wrong.

## Admin site (new repo)

Single page, `index.html`:
- The same contract-field inputs currently on `terms.html`, unchanged
  behavior (live-updating a preview of the rendered contract so Toby can
  see what he's about to publish).
- "My Signature" section: one signature pad + Clear, with a note that
  this is saved once and reused for every client until redrawn.
- A password `<input type="password">` field, always visible.
- **Publish** button → `POST /api/publish` (on the admin site itself)
  with `{ password, client: {...fields}, sellerSignaturePng }`.
- **Clear** button → `POST /api/publish` with `{ password, client: null }`
  (keeps whatever `sellerSignaturePng` is already stored, per the data
  shape above — the admin function must fetch-merge rather than blindly
  overwrite, so clearing the client doesn't also wipe the signature).

New: `api/publish.js` (Vercel serverless function on the admin repo)
- Checks `password` against `ADMIN_PASSWORD` env var (Vercel Production
  env). 401 if wrong.
- If correct: forwards the payload to the client site's
  `POST https://client-information-iota.vercel.app/api/client-data` with
  header `x-api-secret: <CLIENT_API_SECRET>` (same env var value, set on
  both projects).
- No session/cookie — password is checked fresh on every Publish/Clear
  call, since this is used occasionally, not continuously.

## Storage backend

A small Vercel-native key-value/blob store holding exactly one JSON
object. Exact product (Global Config vs Vercel Blob vs a Marketplace KV)
to be selected during implementation using Vercel's current guidance
(`vercel:marketplace` / `vercel:vercel-storage` skills) rather than
locked in here — both are simple enough for this single-object use case.

## Explicitly out of scope

- Multiple concurrent in-progress clients (single slot, as noted above).
- Any login/session persistence on the admin site.
- Encrypting the stored blob — it holds contract terms for a client
  Toby is already dealing with directly, not a secret.
- Changes to `questionnaire.html` or `workflow.html` — this only affects
  `terms.html` and its editable fields.
