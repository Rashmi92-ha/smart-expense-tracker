# Smart Expense Tracker

A React app for tracking daily expenses by category, filtering and sorting them, and visualizing spending with a chart. Data persists in the browser using localStorage.

## Features

- **Add expenses** with amount, category, date, and note, with inline validation
- **Categories:** Food, Travel, Bills, Others
- **Summary cards:** total spent overall and per category, updated as expenses change
- **Filters:** category, date range, and amount range
- **Search** by title, note, or category
- **Sorting:** most recent or highest amount
- **Chart:** donut chart of category-wise spending that follows the active filters
- **Delete** expenses
- **Persistence:** data is saved in localStorage and survives refreshes
- **Sample data:** one click loads example expenses when the list is empty
- **Responsive layout** with an accessible, scrollable expense list

## Tech stack

- React (Vite)
- Tailwind CSS
- Recharts
- Vitest

## Getting started

```bash
git clone https://github.com/Rashmi92-ha/smart-expense-tracker.git
cd smart-expense-tracker
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run test:run` | Run the unit tests once |
| `npm test` | Run the tests in watch mode |

## Project structure

```
src/
├── components/
│   ├── dashboard/   # ExpenseSummary, ExpenseFilters, CategoryChart
│   └── expenses/    # ExpenseForm, ExpenseList
├── hooks/           # useLocalStorage
├── utils/           # filtering, summaries, formatting, constants (with tests)
├── data/            # sample expenses
└── pages/           # Dashboard
```

## Design decisions

- **Filtering lives in pure functions** (`utils/expenseFilters.js`), so the logic is unit-tested without rendering the UI.
- **All filters are one state object.** Clearing filters and detecting active filters work for any filter added later.
- **Dates are stored as `YYYY-MM-DD` strings.** They compare and sort correctly and avoid timezone bugs. "Today" is computed from the local date, not UTC.
- **The list and chart use the filtered expenses, while the summary cards show overall totals.**
- **Derived data uses `useMemo`** instead of duplicated state, so the list, cards, and chart can't drift out of sync.
- **`useLocalStorage` fails safely.** Corrupted data or blocked storage falls back to an empty list instead of crashing.
- **Sorting works on a copy** of the filtered list, so React state is never mutated.

## Testing

Unit tests cover:

- Filtering by category, date range, and amount range (including inclusive bounds)
- Search, sorting, and invalid ranges
- Entries saved without a note
- Summary card and chart totals
- Currency formatting

```bash
npm run test:run
```

## Possible improvements

- Edit existing expenses
- Monthly trend bar chart
- Export to CSV
