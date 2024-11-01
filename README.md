# Online Banking Application Demo

View the website here: [Banking Challenge](https://banking-challenge.vercel.app/)


## Overview

This project is my submission for an online banking application challenge. The goal was to create a simple yet polished demo of an online banking application. This application was created using React, Vite, TypeScript, Zod, Tanstack React Router, Tanstack React Query, Tailwind CSS, Vitest, and Recharts. The application fetches a list of transactions, displays them in a user-friendly list, and shows detailed information when a transaction is clicked. The app shows the current balance along with a spending breakdown separated by categories (Dining, Groceries, etc.)

## Features

- Fetches a list of transactions from a static file.
- Displays transactions in a list with key details.
- Provides more details upon clicking a transaction.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Vite (SWC)**: Build tool and development server.
- **TypeScript**: Superset of JavaScript for type safety.
- **Zod**: Schema validation library for TypeScript.
- **Tanstack React Router**: Routing library for handling navigation.
- **Tanstack React Query**: Data fetching and caching.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Vitest**: Testing framework.
- **Recharts**: Charting library for visualizing data.

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/online-banking-demo.git
   cd online-banking-demo
   
2. **Install Dependencies**

   ```bash
   npm install

3. **Run the Application**

   To start the development server, run:
    ```bash
   npm run dev

## Known Issues

- **Generate Data Script**: The `generate-data` script intended to auto-generate dummy data is written in JavaScript due to challenges with using Worker Threads in TypeScript. Although Worker Threads are not required for this task, I attempted to implement them for learning purposes. For now, the provided static data file is used.

- **Unique ID for Transactions**: The challenge provided a data format that did not include a unique `id` property for transactions. Although the current code functions properly, a unique identifier is essential for better data management and potential future improvements.


