# FinTrack

A simple personal finance tracker to record income and expenses, built with React and deployed as a static site on GitHub Pages.

## Features

- Record income and expense transactions with date, description, and amount
- Transaction history sorted by date
- Balance, income, and expense totals persisted in `localStorage`
- Dark / light theme (stored preference, falls back to `prefers-color-scheme`)
- Client-side routing with `HashRouter` for static hosting

## Stack

- Vite 5 + React 18 (JSX, no TypeScript) + SWC (`@vitejs/plugin-react-swc`)
- Tailwind CSS v3 (`darkMode: 'class'`) + Poppins font
- `react-router-dom` v6

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start local dev server with HMR          |
| `npm run build`  | Production build to `dist/`              |
| `npm run preview`| Preview the production build locally     |
| `npm run lint`   | Run ESLint (`eslint .`)                  |
| `npm run deploy` | Build and publish `dist/` via `gh-pages` |

No test runner is configured. Verify changes with `npm run build` and `npm run lint`.

## Project Structure

```
src/
  main.jsx              # Entry point, mounts GlobalProvider
  App.jsx               # HashRouter + layout (Navbar, Routes, Footer)
  context/
    GlobalState.jsx     # Single Context: transactions, balance, income, expense, theme
  pages/                # Home, Income, Expense, Transactions, About
  components/
    balance/ forms/ navbar/ footer/ transactions/
```

## State Notes

- `transactions`, `balance`, `income`, `expense`, and `theme` are independent `useState` values, each persisted to `localStorage` under the same key.
- Totals are stored, not derived. Any change to transactions must also update the matching totals or they drift.
- Transaction amounts must be positive numbers; non-positive values are rejected at the form level.

## Theme

Dark mode uses Tailwind's `class` strategy. The `dark` class is toggled on `<html>` by the provider effect in `GlobalState.jsx`. Do not rely on a `dark` class on inner containers: `dark:` variants require the class on an ancestor.

## Routing & Deployment

- `HashRouter` is required for GitHub Pages static hosting. Do not switch to `BrowserRouter`.
- `vite.config.js` `base` must stay as the absolute Pages URL (`https://frankhs899.github.io/FinTrack/`) so deployed asset paths resolve correctly.
