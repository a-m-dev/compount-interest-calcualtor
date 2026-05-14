# Compound Interest Calculator

A React-based calculator that projects how an investment grows over time with monthly compounding and optional monthly contributions.

## Features

- **Inputs**: Initial principal, time horizon (years), annual growth rate, and optional monthly contribution
- **Final amount card**: Large, prominent display of the projected end value
- **Stacked area chart**: Year-by-year visualization showing principal, accumulated contributions, and interest earned
- **Yearly breakdown list**: Tabular view showing the total value at the end of each year
- **Summary cards**: Total contributions and total interest earned

## How the Calculation Works

The app uses **monthly compounding** to mirror how most real-world investment accounts grow.

### Future Value of the Initial Principal

```
FV_principal = P × (1 + r/12)^(t × 12)
```

Where `P` is the principal, `r` is the annual rate (as a decimal), and `t` is the number of years.

### Future Value of Monthly Contributions (annuity formula)

```
FV_contributions = PMT × [((1 + r/12)^(t × 12) - 1) / (r/12)]
```

Where `PMT` is the monthly contribution amount. This accounts for each monthly payment earning interest over the months that remain after it is deposited.

### Final Amount

```
Final = FV_principal + FV_contributions
```

The yearly breakdown applies the same formulas with `t` set to each individual year (1, 2, 3, …) so the chart and list can show the growth curve.

## Project Structure

```
src/
├── App.tsx                       # Top-level state and layout
├── App.css                       # Global styles (card, form, results grid)
├── components/
│   ├── Form.tsx                  # Inputs and Calculate button
│   ├── NumberInput.tsx           # Input with thousands-separator formatting
│   ├── Results.tsx               # Composes the results section
│   ├── Chart.tsx                 # Recharts stacked area chart
│   ├── Chart.css                 # Chart-specific styles
│   ├── YearlyList.tsx            # Year-by-year list of totals
│   └── YearlyList.css            # List-specific styles
└── utils/
    ├── calculations.ts           # Compound interest math + yearly breakdown
    └── formatting.ts             # Swedish locale number/currency formatting
```

## Tech Stack

- **React 18** with **TypeScript**
- **Vite** for the dev server and build
- **Recharts** for the stacked area chart
- Plain CSS (no UI library) with component-scoped stylesheets for Chart and YearlyList

## Running Locally

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Formatting Notes

Numbers are displayed using the Swedish locale (`sv-SE`), so thousands are separated by spaces and the decimal point is a comma. Currency values are suffixed with `kr`.
