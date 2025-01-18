# Password Manager

## Project Description

This is a full-stack **Password Manager** application built using the MERN stack (MongoDB, Express, React, Node.js). The backend API provides CRUD operations for managing credentials, while the frontend offers a user-friendly interface for interacting with the application. The app is secured with CORS and features seamless database interaction using Mongoose.

## Features

- **Frontend**: Built with React to provide an interactive and responsive user experience.
- **Backend**: Built with Express and Node.js, with structured routes, middleware, and controllers.
- **Database**: MongoDB for storing and retrieving user credentials.
- **RESTful API**: Fully functional API for creating, reading, updating, and deleting passwords.
- **CORS Enabled**: Ensures secure cross-origin requests.
- **Environment Config**: Utilizes `dotenv` for managing environment variables.

## Project Structure

```plaintext
├── backend
│   ├── controllers
│   │   └── credentialController.js   # Handles all business logic for credentials
│   ├── middleware
│   │   └── errorMiddleware.js        # Middleware for error handling
│   ├── models
│   │   └── credential.model.js       # Mongoose schema and model definition
│   ├── routes
│   │   └── credentialRoutes.js       # Route definitions for credentials API
│   ├── server.js                     # Main entry point for backend server
├── frontend
│   ├── public
│   │   └── index.html                # Main HTML file for React app
│   ├── src
│   │   ├── components                # Reusable React components
│   │   ├── pages                     # React pages for routing
│   │   ├── App.js                    # Main React component
│   │   ├── index.js                  # React DOM rendering
│   │   └── api.js                    # API utility for making requests to backend
├── .env                              # Environment variables (e.g., database URL)
├── .gitignore                        # Files and folders to ignore in Git
├── README.md                         # Project documentation
├── package.json                      # Node.js dependencies for backend
├── frontend/package.json             # Node.js dependencies for frontend
```

## Requirements

- Node.js
- MongoDB Atlas or Local MongoDB
- React
- npm or yarn
