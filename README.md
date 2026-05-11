# MUI Tabs Redux

A dynamic master-detail tab interface built with React, Redux Toolkit, and Material UI. Clicking a row in a list opens a detail tab; saving closes it and refreshes the parent — a pattern common in ERP and CRM-style applications.

## Live Demo

[https://majidgdotcom.github.io/mui-tabs-redux/](https://majidgdotcom.github.io/mui-tabs-redux/)

## Features

- **Dynamic tabs** — open and close tabs at runtime; non-closable base tabs always remain
- **Master-detail navigation** — list tabs open detail tabs for editing; saving auto-closes the detail and refreshes the list
- **Persistent state** — tab layout survives page reloads via localStorage
- **Lazy loading** — tab content is code-split with `React.lazy` + `Suspense`
- **Typed Redux** — fully typed store and selectors with `RootState`

## Tech Stack

| Concern | Library |
|---|---|
| UI components | Material UI v6 |
| State management | Redux Toolkit |
| Language | TypeScript |
| Persistence | localStorage |

## Getting Started

```bash
git clone https://github.com/majidgdotcom/mui-tabs-redux.git
cd mui-tabs-redux
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm start       # dev server
npm test        # run tests
npm run build   # production build
npm run deploy  # deploy to GitHub Pages
```

## Project Structure

```
src/
├── components/
│   ├── tab/
│   │   └── TabsComponent.tsx       # dynamic tab shell
│   ├── customer/
│   │   ├── Customers.tsx           # customer list tab
│   │   └── Customer.tsx            # customer detail tab
│   └── product/
│       ├── Products.tsx            # product list tab
│       └── Product.tsx             # product detail tab
├── stateManagement/
│   ├── slices/
│   │   └── tabsSlice.ts            # add / remove / activate tabs
│   └── store.ts
├── interfaces/                     # TypeScript types
└── mockData/                       # sample customers and products
```
