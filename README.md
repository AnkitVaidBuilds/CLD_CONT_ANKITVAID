# Email Form Application

A web application with a React frontend form that collects user information and sends it via email using a Node.js backend.

## Features

- React frontend with a beautiful, responsive form
- Node.js/Express backend API
- Email sending functionality using Nodemailer and Gmail
- Form validation and user feedback

## Setup Instructions

### 1. Configure Gmail Settings

Before running the application, you need to set up Gmail for sending emails:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. **Update the server configuration**:
   - Open `/server/index.js`
   - Replace `yourgmail@gmail.com` with your Gmail address
   - Replace `your-app-password` with the generated app password
   - Replace `recipient@gmail.com` with the email address where you want to receive form submissions

### 2. Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

### 3. Start the React Frontend

In a new terminal:

```bash
cd client
npm start
```

The React app will run on `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Fill out the form with First Name, Last Name, and Email Address
3. Click "Send Email" to submit the form
4. The form data will be sent to the configured recipient email address

## Project Structure

```
email-form-app/
├── client/          # React frontend
│   ├── src/
│   │   ├── App.js   # Main form component
│   │   └── App.css  # Styling
│   └── package.json
├── server/          # Node.js backend
│   ├── index.js     # Express server with email API
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React, CSS3
- **Backend**: Node.js, Express, Nodemailer
- **Email Service**: Gmail SMTP 