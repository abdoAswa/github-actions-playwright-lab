# GitHub Actions + Playwright Practice Lab

A deliberately small learning project: a plain HTML/CSS/JavaScript login and task app, nine Playwright TypeScript tests, and a GitHub Actions CI pipeline.

> This is **not** a production authentication app. Credentials are public demo values, and tasks live in browser memory only. The server listens on localhost.

## Requirements
- Node.js 22 or newer, npm
- Git and a GitHub account (for CI)

## Start locally
```bash
npm install
npm run start
```
Open http://127.0.0.1:3000. Demo credentials: `qa@example.com` / `Password123!`.

## Run tests
In another terminal:
```bash
npx playwright install chromium
npm test
```
You can also run `npm run test:ui`, `npm run test:headed`, and `npm run report`.
The Playwright config automatically starts the web server if it is not running, so `npm test` also works without the separate `npm start` terminal.

## Learn GitHub Actions: exercises
1. **Run locally:** execute `npm test`, inspect the nine tests under `tests/`.
2. **Upload to GitHub:** create an empty GitHub repository and push these project files (including `.github/workflows/playwright.yml`) to branch `main`.
3. **Inspect the workflow:** on GitHub, open **Actions → Playwright CI**, click the run, and inspect each step.
4. **Trigger by PR:** create a branch, modify a heading in `public/index.html`, push it, and open a pull request against `main`.
5. **Make it fail:** in `public/app.js`, replace `Invalid email or password.` with `Incorrect login.` and push. The invalid-login test should fail.
6. **Debug:** open the failed run, inspect the error and download `playwright-report` or `test-results` under Artifacts.
7. **Fix it:** restore the original message and push again; observe the green run.
8. **Experiment:** try adding a new test, using a schedule trigger, or adding a second browser project (install that browser in the workflow first).

## Why these files matter
- `server.js`: tiny Node HTTP server
- `public/`: the application being tested
- `tests/login.spec.ts`: login scenarios
- `tests/tasks.spec.ts`: task CRUD scenarios
- `playwright.config.ts`: test runner, browser, report, webServer setup
- `.github/workflows/playwright.yml`: GitHub CI workflow on push/PR/manual trigger

## Quick upload example
```bash
git init
git add .
git commit -m "Add Playwright CI practice project"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```
Use a newly created empty repository and replace the URL above with your own.
