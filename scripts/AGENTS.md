# Repository Guidelines

## Project Structure & Module Organization

This `scripts/` folder holds Playwright automation used to capture tutorial screenshots. Key files live in the repository root relative to this folder:

- `capture-angular.js`, `capture-webapi.js`, `capture-identityserver.js`: component-specific screenshot scripts.
- `package.json`: Playwright dependency and npm scripts.
- `docs/images/{angular|webapi|identityserver}/`: screenshot output directories.
- `README.md`: full runbook, credentials, and troubleshooting.

## Build, Test, and Development Commands

Run from `scripts/`:

- `npm install`: installs Playwright and dependencies.
- `npm run screenshots:angular`: captures Angular app screenshots.
- `npm run screenshots:webapi`: captures Swagger UI screenshot.
- `npm run screenshots:identityserver`: captures IdentityServer admin screenshots.
- `npm run screenshots:all`: runs all three scripts sequentially.

These scripts require the three services to be running locally:

- IdentityServer: `https://localhost:44310`
- API: `https://localhost:44378`
- Angular: `http://localhost:4200`

## Coding Style & Naming Conventions

- Language: Node.js (CommonJS) with Playwright.
- Indentation: 2 spaces (match existing scripts).
- Filenames: `capture-<component>.js`.
- Screenshot names are lowercase kebab-case (for example `employee-list-page.png`).
- Prefer explicit selectors and `waitForTimeout`/`waitForSelector` for stability.

## Testing Guidelines

No automated tests are configured in this folder. Use the scripts above as smoke tests, and validate output in `docs/images/<component>/`.

## Commit & Pull Request Guidelines

Recent commit messages are short, sentence-style summaries (for example `add screenshots`, `Update readme`). Use simple, imperative phrasing and keep messages concise.

PRs should include:

- A short description of what changed and why.
- Links to any related issue or tutorial update.
- Before/after screenshots when you modify capture logic or UI flows.

## Security & Configuration Notes

- Credentials are stored in `README.md` for local usage. Do not reuse them outside this tutorial environment.
- Scripts run with `headless: false` by default to aid debugging; switch to `true` for unattended runs.
