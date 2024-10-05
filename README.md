# React Dynamic Tabs Project (mui-tabs-redux)

This project is a dynamic tab-based interface built using React, Redux Toolkit, and Material-UI. It allows users to manage multiple tabs dynamically, add new tabs, and display information for different entities like Products and Customers. This project is designed to showcase my front-end development skills and can be easily expanded further.

## Releases

You can view the live demo of the project at the following link:

[Live Demo](https://majidgdotcom.github.io/mui-tabs-redux/)

## Features

- **Dynamic Tabs:** Users can add and remove tabs dynamically.
- **Persistent Tabs:** Tabs’ state is stored in localStorage, ensuring persistence across page reloads.
- **Mock Data:** Pre-populated mock data is displayed within dedicated tabs.
- **Responsive UI:** The interface is fully responsive, utilizing Material-UI for modern styling.
- **State Management:** Redux Toolkit manages tab state (adding/removing tabs).

## Tech Stack

- **React:** Frontend library for building the user interface.
- **Redux Toolkit:** State management for handling dynamic tab operations.
- **TypeScript:** Strongly-typed JavaScript, ensuring better code quality and development experience.
- **Material-UI:** Component library for styling and creating a responsive, professional-looking UI.
- **localStorage:** Used to persist tab state across reloads.
- **Mock Data:** Demonstrates handling data like product and customer lists.

## Getting Started

Follow the steps below to get a local copy of the project up and running.

## Prerequisites

Ensure you have Node.js and npm (or yarn) installed on your machine.

## Installation

1.	Clone the repository:

	```
	git clone https://github.com/majidgdotcom/mui-tabs-redux.git

2.	Navigate to the project directory:

	```
	cd mui-tabs-redux

3.	Install the dependencies:

	```
	npm install

4.	Start the development server:

	```
	npm start

5.	Open http://localhost:3000 to view it in the browser.

## Project Structure

	src/
	│
	├── components/
	│   ├── tab/
	│   │   └── TabsComponent.tsx     # Tabs component for handling dynamic tabs
	│   ├── product/
	│   │   ├── Products.tsx          # Product listing component
	│   │   └── Product.tsx           # Individual product detail component
	│   └── customer/
	│       ├── Customers.tsx         # Customer listing component
	│       └── Customer.tsx          # Individual customer detail component
	│
	├── stateManagement/
	│   ├── slices/
	│   │   └── tabsSlice.ts          # Redux slice for managing tab operations
	│   └── store.ts                  # Main Redux store configuration
	│
	├── interfaces/
	│   ├── ITab.ts                   # Types/interfaces for Tabs data
	│   ├── IProduct.ts               # Types/interfaces for Products data
	│   └── ICustomer.ts              # Types/interfaces for Customers data
	│
	├── index.tsx                      # Entry point for the React app
	└── App.tsx                        # Main app component
