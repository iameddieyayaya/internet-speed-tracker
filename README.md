# Internet Speed Tracker

This project is an Internet Speed Tracker that performs speed tests every hour and logs the results. It provides a web interface built with React for visualizing the speed test data, allowing users to filter results by day, week, or month.

## Features

- Periodic speed tests (download speed, upload speed, and ping)
- Data visualization using line and bar charts
- Filtering options for daily, weekly, and monthly data

## Technologies Used

- **Backend**: Python, Flask, SQLite
- **Frontend**: React, Recharts
- **Data Visualization**: Recharts
- **Scheduling**: Schedule
- **Containerization**: Docker (if applicable)

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- Docker (if using)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd internet-speed-tracker
   ```

2.	Set up the backend:

    Navigate to the backend directory:
    ```bash
    cd backend
    ```

    Create a virtual environment:
    ```bash
    python3 -m venv .venv
    ```
 
    Activate the virtual environment:
    ```bash
    source .venv/bin/activate   
    ```

    Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```

    Run
    ```bash
    python3 main.py
    ```
3.	Set up the frontend:
	
    Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

    ```bash
    npm install
    ```

    Run
    ```bash
    npm start
    ```


OR

Run with Docker