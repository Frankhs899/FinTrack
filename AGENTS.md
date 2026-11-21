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
- State: single `Context`, created in `src/context/context.js` and provided by `GlobalProvider` in `src/context/GlobalState.jsx` (the context has its own module so the provider file exports a component only — Fast Refresh). `transactions` and `theme` are independent `useState` values persisted to `localStorage` under the same key names. `balance`, `income` and `expense` are derived from `transactions` on read (via `useMemo`); they are never stored. Legacy `localStorage` keys `balance`, `income` and `expense` are ignored and left in place — never deleted, no migration written.
- Theme: Tailwind `darkMode: 'class'`; the provider toggles `dark` on `<html>` via effect, and that is the only place the class is managed — `App.jsx` only reads the `dark:` variants on its wrapper, it never toggles the class. Init prefers stored `theme`, then `prefers-color-scheme`.

## Conventions / gotchas

- Styling: Tailwind utilities plus custom `primary` (purple) / `secondary` (amber) palettes in `tailwind.config.js`; global font is Poppins loaded via Google Fonts in `index.html` and applied as `font-[Poppins]`.
- `vite.config.js` `base` is currently the absolute URL `https://frankhs899.github.io/FinTrack/` — required for asset paths under Pages deploy; changing it breaks deployed assets.
- ESLint uses `jsx-runtime` rules; `React` import is unnecessary in JSX files. `react/jsx-no-target-blank` is off, `react-refresh/only-export-components` is warn.
