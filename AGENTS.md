# AGENTS.md — FinTrack

Vite 5 + React 18 (JSX, no TypeScript) + Tailwind CSS v3 + `react-router-dom` v6. SWC via `@vitejs/plugin-react-swc`. No tests, no typecheck, no CI.

## Commands

- `npm run dev` — local dev server (HMR via SWC).
- `npm run build` / `npm run preview` — build to `dist/` / preview it.
- `npm run lint` — `eslint .` (flat config, `dist` ignored only).
- `npm run deploy` — runs `predeploy` (`npm run build`) then `gh-pages -d dist`. Publish target is GitHub Pages.

No test runner is configured — don't add test infra unprompted; verify with `build` + `lint`.

## Architecture

- Entry: `src/main.jsx` → `src/App.jsx`. `GlobalProvider` (in `src/context/GlobalState.jsx`) must wrap `App`.
- Routing: `HashRouter` in `App.jsx` is **required** for GitHub Pages static hosting. Do not switch to `BrowserRouter`.
- Pages in `src/pages/` (Home, Income, Expense, Transactions, About); shared UI in `src/components/{balance,forms,navbar,footer,transactions}/`.
- State: single `Context` in `src/context/GlobalState.jsx`. `transactions`, `balance`, `income`, `expense`, `theme` are independent `useState` values each persisted to `localStorage` under the same key names. Totals are stored, not derived — any change to transactions must also update the matching totals or they drift.
- Theme: Tailwind `darkMode: 'class'`; the provider toggles `dark` on `<html>` via effect, and `App.jsx` also toggles it on the wrapper div. Keep both in sync; init prefers stored `theme`, then `prefers-color-scheme`.

## Conventions / gotchas

- Styling: Tailwind utilities plus custom `primary` (purple) / `secondary` (amber) palettes in `tailwind.config.js`; global font is Poppins loaded via Google Fonts in `index.html` and applied as `font-[Poppins]`.
- `vite.config.js` `base` is currently the absolute URL `https://frankhs899.github.io/FinTrack/` — required for asset paths under Pages deploy; changing it breaks deployed assets.
- ESLint uses `jsx-runtime` rules; `React` import is unnecessary in JSX files. `react/jsx-no-target-blank` is off, `react-refresh/only-export-components` is warn.
