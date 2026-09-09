# Expense Tracker - Frontend Application

## 📊 Project Overview
A modern, responsive Single Page Application (SPA) built to track personal expenses. This frontend consumes a RESTful API and provides an intuitive user interface for managing finances. It features state management, derived statistics, and clean component-based architecture.

## ✨ Key Features
* **Expense Management:** Seamlessly add new expenses with form validation and dynamic state lifting.
* **Smart Dashboard:** Real-time calculation of total, one-time, and recurring expenses using derived state.
* **Custom UI Components:** Replaced native browser alerts with custom Tailwind CSS modals for safe record deletion.
* **Error Handling:** Graceful API error handling integrated with React Hot Toast for instant user feedback.

## 🛠️ Tech Stack & Architecture
* **Core Framework:** React (initialized with Vite for lightning-fast HMR and optimized builds).
* **Styling:** Tailwind CSS v4 for a utility-first, fully responsive design without external CSS files.
* **HTTP Client:** Axios configured with a custom instance and environment variables for secure API communication.

---

## 🚀 Getting Started

To run this frontend locally, ensure you have the [Backend API](https://github.com/K-Krupa/expense-tracker-backend) running on port 8080.

1. Clone the repository to your local machine.
2. Run `npm install` to download all necessary dependencies.
3. Create a `.env` file in the root directory and add `VITE_API_URL=http://localhost:8080/api/expenses`.
4. Run `npm run dev` to start the development server on port 5173.
