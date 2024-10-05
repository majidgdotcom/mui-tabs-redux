React Dynamic Tabs Project (mui-tabs-redux)

This project is a dynamic tab-based interface built using React, Redux Toolkit, and Material-UI. It allows users to manage multiple tabs dynamically, add new tabs, and display information for different entities like Products and Customers. This project showcases my front-end development skills and is designed to be simple yet flexible enough to be expanded further.

Features

	•	Dynamic Tabs: Users can add and remove tabs dynamically.
	•	Persistent Tabs: Tabs state is stored in localStorage, ensuring persistence across page reloads.
	•	Mock Data: Pre-populated mock data, displayed within a dedicated tab.
	•	Responsive UI: The interface is responsive, using Material-UI for styling.
	•	State Management: Redux Toolkit is used for managing tab state (adding/removing tabs).


Tech Stack

	•	React: Frontend framework for building the user interface.
	•	Redux Toolkit: For state management, specifically for handling dynamic tab operations.
	•	TypeScript: Strongly typed JavaScript to ensure better code quality.
	•	Material-UI: For styling and creating a responsive, professional-looking UI.
	•	localStorage: Used to persist tab state across reloads.
	•	Mock Data: Demonstrates handling data such as product lists.

Getting Started

To get a local copy of the project up and running, follow these steps.

Prerequisites

Ensure you have Node.js and npm (or yarn) installed.

Installation

	1.	Clone the repository:

git clone https://github.com/majidgdotcom/mui-tabs-redux.git


	2.	Navigate to the project directory:

cd mui-tabs-redux


	3.	Install the dependencies:

npm install


	4.	Start the development server:

npm start


	5.	Open http://localhost:3000 to view it in the browser.


Project Structure

src/
│
├── components/
│   ├── tab/
│   │   └── TabsComponent.tsx       # Your Tabs component
│   ├── product/
│   │   ├── Products.tsx   # Products listing component
│   │   └── Product.tsx    # Individual Product component
│   └── customer/
│       ├── Customers.tsx   # Customers listing component
│       └── Customer.tsx    # Individual Customer component
│
├── stateManagement/
│   ├── slices/
│   │   └── tabsSlice.ts            # Redux slice for managing tabs
│   └── store.ts                    # Main Redux store configuration
│
├── interfaces/
│   ├── ITab.ts                      # Types/interfaces for Tabs data
│   ├── IProduct.ts                  # Types/interfaces for Products data
│   └── ICustomer.ts                  # Types/interfaces for Customers data
│
├── index.tsx                        # Entry point for the React app
└── App.tsx                          # Main app component
