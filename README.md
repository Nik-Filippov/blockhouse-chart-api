# Project Description

**Dashboard** is a React-based web application designed to visualize various types of data through interactive charts. The application integrates multiple chart types, including Line, Bar, Pie, and Candlestick charts, each dynamically updated based on data fetched from a backend API. Made by Nikita Filippov (https://github.com/Nik-Filippov) as Blockhouse test assignment.

---

## How to Run

### Prerequisites

1. **Python 3**: Ensure Python 3 is installed on your machine.
2. **Node.js and npm**: Ensure Node.js and npm are installed.

### Backend Setup and Execution

1. **Navigate to the Backend Directory**
   - Open your terminal or command prompt.
   - Change to the root directory of your project:
     ```bash
     cd blockhouse-test/
     ```

2. **Activate the Python Virtual Environment**
   - If a virtual environment is set up for your Python project, activate it using:
     ```bash
     source venv/bin/activate
     ```
   - Note: On Windows, use `venv\Scripts\activate` instead.

3. **Navigate to the Django Project Directory**
   - Change to the directory where your Django project is located:
     ```bash
     cd chart_api
     ```

4. **Run the Django Development Server**
   - Start the Django server with:
     ```bash
     python manage.py runserver
     ```
   - The server will start and listen on `http://127.0.0.1:8000/` by default.

### Frontend Setup and Execution

1. **Navigate to the Frontend Directory**
   - Open a new terminal window or tab.
   - Change to the directory where your frontend project is located:
     ```bash
     cd blockhouse-test/chart-frontend
     ```

2. **Install Frontend Dependencies**
   - Ensure you have installed all required Node.js packages. Run:
     ```bash
     npm install
     ```
   - This command reads from the `package.json` file and installs the dependencies listed.

3. **Run the Frontend Development Server**
   - Start the frontend development server with:
     ```bash
     npm run dev
     ```
   - The server will start and typically listen on `http://localhost:3000` by default.

---

## Key Features

- **Line Chart**: Displays trends over time with a line graph.
- **Bar Chart**: Illustrates data distribution with vertical bars.
- **Pie Chart**: Represents data proportions with a circular graph.
- **Candlestick Chart**: Provides financial data visualization, showing open, high, low, and close prices for a given period.

---

## Technologies Used

- **React**: Frontend library for building the user interface.
- **Chart.js**: Library used for creating Line, Bar, and Pie charts.
- **Lightweight Charts**: Specialized library used for rendering Candlestick charts.
- **Axios**: For making HTTP requests to fetch chart data from the backend.
- **CSS-in-JS**: Used to style components directly in JavaScript.

---

## Implementation Details

The main functionality of the application has been implemented in the following files:

- **Frontend**
  - `index.tsx`: Contains the main React component structure and renders the dashboard with interactive charts.

- **Backend**
  - `views.py`: Handles the logic for fetching and processing data for the charts.
  - `urls.py`: Manages the routing of API endpoints for different types of chart data.

---

## Thought Process and Decisions

### Choosing Chart Libraries

- **Chart.js**: Selected for Line, Bar, and Pie charts due to its extensive support and ease of use for basic chart types.
- **Lightweight Charts**: Opted for Candlestick charts as Chart.js did not natively support advanced financial chart types. Lightweight Charts is optimized for high-performance rendering of financial data, which is crucial for visualizing candlestick charts effectively.

### Challenges with Chart.js and Candlestick Charts

- **Limited Support**: Chart.js lacks native support for complex chart types such as Candlestick charts, which are essential for financial data visualization.
- **Performance Issues**: Even if some workarounds were available, they could lead to performance issues or incomplete implementations for candlestick charts.

### Decision to Switch to Lightweight Charts

- **Specialized Functionality**: Lightweight Charts offers built-in support for candlestick charts, making it a more suitable choice for rendering financial data.
- **Performance**: This library is designed for high performance and can handle large datasets efficiently, providing a smoother user experience for interactive financial charts.

---
