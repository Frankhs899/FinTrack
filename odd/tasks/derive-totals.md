# Derive transaction totals from the transaction list

Slice: stop maintaining `balance`, `income` and `expense` as independent state. They become derived values of `transactions`, the only source of truth, so they cannot drift.

## Specs

- **S1** — `balance`, `income` and `expense` are computed from `transactions`. The provider keeps no independent `useState` for any of them and writes no `localStorage` key for any of them.
- **S2** — The computation is: `income` = sum of `value` over transactions with `type === 'income'`; `expense` = sum of `value` over transactions with `type === 'expense'`; `balance` = `income - expense`. Sums are computed once per `transactions` change (`useMemo`), not per render of a consumer.
- **S3** — Existing `localStorage` keys `balance`, `income` and `expense` are never written and never deleted by this change. They are simply no longer read. Stale values in them must not affect anything rendered.
- **S4** — `addTransaction(type, data)` only appends the transaction. It no longer calls `setIncome`, `setExpense` or `setBalance`; the totals update as a consequence of the list changing.
- **S5** — `readStoredNumber` is removed from `src/lib/transactions.js` if nothing uses it after S1. No dead exports are left behind, and no new module is introduced for a two-file change.
- **S6** — Documentation matches the new behavior: in `AGENTS.md` the sentence that says totals are stored and not derived is rewritten to state that totals are derived from `transactions` on read and that the legacy `balance`/`income`/`expense` keys are ignored; in `README.md` the feature bullet that claims `balance`, `income` and `expense` totals are persisted is corrected to say the transaction list is persisted and the totals are derived from it.
- **S7** — Verification is `npm run lint` (0 errors) and `npm run build` (exit 0). No test runner is added to this repository.
- **S8** — A missing, unparseable or non-array `transactions` value yields `income = 0`, `expense = 0`, `balance = 0`. Legacy stored totals never resurface as a fallback.
- **S9** — The `Context.Provider` value shape is unchanged: `theme`, `handleChangeTheme`, `transactions`, `balance`, `income`, `expense`, `addTransaction`. Consumers (`src/components/balance/`, `src/pages/`) are not edited.

## Tasks

| ID | Specs | Route | Commit |
| --- | --- | --- | --- |
| T1 | S1–S9 | writer → independent verifier | `eed929e` |

## Log

- **L1** (user, verbatim): "Merge del PR #2 y arranca con el slice de totales pero en una nueva rama"
- **L2** (user, verbatim): "Dime que sigue para la mejora?"
- **L3** (coordinator, accepted by the user through L1): the pending slice recorded from the previous session was "Stored totals are still hand-maintained; deriving them from `transactions` with `useMemo` is the pending next slice." Risk classified as item 1 (persisted format change) and item 3 (documented contract in `AGENTS.md` / `README.md`), so the work unit gets an independent verifier.
- **L4** (coordinator): base `origin/main` at `2919f73` (merge of PR #2), branch `refactor/derive-totals`.
- **L5** (verification, `eed929e`): independent verifier returned pass on S1–S9 with zero blockers. Advisories, all accepted as-is: (a) `normalizeType` defaults an unknown stored type to `income`, so a hand-edited record inflates income — unreachable through the app's own writers, which are all covered by `TYPE_ALIASES`; (b) summing `income - expense` can differ from the old interleaved running total in the last float bits, the same class of imprecision the baseline rendered, and strictly better because totals can no longer diverge from the list; (c) `TRANSACTION_TYPES` was already an unused export at `2919f73`. Probe scripts were offered for `odd/probes/` and deliberately not committed, to keep this slice's diff to the four spec'd files.
