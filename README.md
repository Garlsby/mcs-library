# MCS Library App

Welcome to the MCS Library App repository! This application is designed to streamline library management processes. Follow the steps below to set up and run the app on your local machine.

## Setup Instructions

### Step 1: Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/Garlsby/mcs-library.git
```

### Step 2: Open in your IDE

Navigate to the cloned directory and open it in your preferred Integrated Development Environment (IDE).
Step 3: Install Dependencies

In the terminal, run the following command to install the project dependencies:

```bash
npm i
```

### Step 4: Run the App Locally

Start the application locally with the following command:

```bash
npm run dev
```

### Optional: Deploy the App

If you want to deploy the app, use the following command to build the project:

```bash
npm run build
```

## Modification Instructions

To customize the application for your environment, follow the steps below:

1. Open the .env file in the root directory of the project.
2. Update the values for the following variables to match your web API base URLs:
  ```bash
  VITE_BASE_URL = "https://your-web-api-url/api/admin"
  VITE_AUTHENTICATION_URL = "https://your-web-api-url/api/authentication"
  ```
Replace "https://your-web-api-url" with the actual base URL of your web API.

3. Save the changes to the .env file.
