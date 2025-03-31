# Van Alen Institute Public Art Impact Measurement System

## Project Overview
The Van Alen Institute, a nonprofit organization dedicated to inclusive urban design, is launching two community-led public art installations in Spring 2025. To measure the impact of these installations, a data collection application is being developed to facilitate real-time data gathering, survey inputs, and observational logging at installation sites. This system will provide automated data analysis, visualization tools, and reporting capabilities, allowing stakeholders to make data-driven decisions and advocate for further community-focused public art initiatives.

## Features
- **Real-time Data Collection**: Users can input survey responses and observational logs directly from installation sites.
- **Automated Data Analysis**: The system processes collected data to generate meaningful insights.
- **Visualization Tools**: Interactive charts and graphs for a clear representation of engagement metrics.
- **Reporting Capabilities**: Generate reports for stakeholders to assess project impact.
- **User-Friendly Interface**: Intuitive design for ease of use by community partners and researchers.

## Tech Stack
- **Frontend**: React
- **Backend**: Python Flask
- **Database**: Firestore (NoSQL)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js and npm (for React)
- Python and pip (for Flask)

### Setup Instructions
1. Clone the repository:
   ```sh
   git clone https://github.com/iden-a/VAI-DataSystem.git
   cd VAI-DataSystem
   ```
2. Install frontend dependencies:
   ```sh
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```sh
   cd ../backend
   pip install -r requirements.txt
   ```
4. Set up Firebase Firestore:
   - Create a Firebase project.
   - Enable Firestore database.
   - Set up Firebase credentials and place them in the backend.

5. Run the application:
   - Start the backend:
     ```sh
     cd backend
     flask run
     ```
   - Start the frontend:
     ```sh
     cd frontend
     npm start
     ```

