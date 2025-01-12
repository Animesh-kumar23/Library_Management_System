# Library Management System

A web-based Library Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). This system helps libraries manage books, users, transactions, and administrative tasks like adding, deleting, and updating book details.

## Live website-
- I deployed this site's frontend using Heroku backend using Render.
- https://powerful-tundra-83274-2fcf468e691d.herokuapp.com/

## Features

### Admin Features
- Add, edit, and delete books.
- View all books in the library with their details.
- Manage transactions, such as borrowing and returning books.


### User Features
- Browse and view books available in the library.
- Borrow and return books.
- Track borrowed books and their status.

### Common Features
- User authentication via login (JWT-based).
- Real-time updates to the book status (availability) after borrowing or returning.
- Responsive user interface designed with React.
- Protected routes based on user roles (Admin/User).

## Tech Stack

- **Frontend**: React.js, React Router, Bootstrap (or Tailwind CSS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Other**: Axios (for API requests), JWT Decode (for decoding tokens)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (with npm)
- MongoDB (running locally or using a cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository**

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/your-username/library-management-system.git
Install dependencies for both frontend and backend

### Navigate to the project directory:

```bash
Copy code
cd library-management-system
```
### First, install the backend dependencies:

```bash
Copy code
cd backend
npm install
```
### Install express
```bash
Copy code
cd backend
npm install express
```

### Install jsonwebtoken and bcrypt
```bash
Copy code
cd backend
npm install jsonwebtoken bcrypt
```


### Install nodemon as dev dependency
```bash
Copy code
cd backend
npm i nodemon
```

### Install other dependencies
```bash
Copy code
cd backend
npm install cors dotenv mongoose express-validator
```
Then, navigate to the frontend directory and install its dependencies:

```bash
Copy code
cd ../frontend
npm install
```
### Install jwt-decode
```bash
Copy code
cd backend
npm install jwt-decode
```
### Install other dependencies
```bash
Copy code
cd backend
npm install assert axios bootstrap browserify-zlib concurrently cra-template dotenv https-browserify react react-dom react-router-dom react-scripts stream-browserify stream-http url util
```
Running the Application
To run the application, follow these steps:

#Start the Backend

In the backend directory:
first adjust in code where you want to run the backend, at which port.

```bash
Copy code
cd backend
nodemon .\app.js
```


#Start the Frontend
- first adjust in code where you want to run the frontend, at which port.
- then adjust the port of backend.

In the frontend directory:
- if you are running both frontend and backend on your local host, use this command
```bash
Copy code
cd frontend
npm run both
```

# Environment Variables
You will need to set up the following environment variables for both backend and frontend.
JWT secret key
port for backend
mongodb database connection link

### Backend
Create a .env file in the backend directory and add:
```
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
###Frontend

If you are using environment variables on the frontend, create a .env file in the frontend directory and add:
```
env
Copy code
REACT_APP_API_URL=http://localhost:5000/api
```
### Database Setup
Make sure you have MongoDB running locally, or use a cloud MongoDB provider like MongoDB Atlas. Create a database called library and ensure the correct connection string is placed in the .env file.

### API Endpoints
#Authentication
POST /api/auth/login

## Login to the system.
Request Body: { email, password }
Response: JWT token.
POST /api/auth/register (Admin Only)


## Register a new user.
Request Body: { email, password, role (admin/user) }
Response: Success message.
Books
GET /api/books

## Get the list of all books.
Response: Array of books with details.
POST /api/books (Admin Only)

## Add a new book to the library.
Request Body: { title, author, genre, publicationYear, availabilityStatus, totalCopies }
Response: Added book details.
PUT /api/books/:id (Admin Only)

## Edit a book's details.
Request Body: { title, author, genre, publicationYear, availabilityStatus, totalCopies }
Response: Updated book details.
DELETE /api/books/:id (Admin Only)

## Delete a book from the library.
Response: Success message.
Transactions
POST /api/transaction/borrow

## Borrow a book.
Request Body: { bookId, userId }
Response: Success message.
POST /api/transaction/return

## Return a borrowed book.
Request Body: { bookId, userId }
Response: Success message.
Frontend Components

## Home
A landing page that introduces the system and its features.
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060055.png)


## Login
A login page where users can authenticate themselves.
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060352.png)

## BookList
Displays the list of books with options to borrow or return books.
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060307.png)

## BookCard
Displays individual book details and borrow/return buttons.
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060307.png)

## Add new book (admin only)
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060143.png)

## Delete Book (ADMIN ONLY)
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060324.png)

## Register New user
### if user role is admin, it is to be accepted by another user by admin role first, if new user role is user, then no need for that
![a](https://github.com/Animesh-kumar23/library_management_system/blob/main/Screenshot%202025-01-08%20060405.png)

### Contributing
We welcome contributions to improve the project. To contribute:

### Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-name).
Create a pull request.



### Acknowledgments
1. Thanks to MongoDB for providing the database service.
2. Thanks to React for the powerful frontend framework.
3. Thanks to Express.js for the backend framework.


### Key Points:
1. **Introduction**: Overview of what the project does and the features it includes.
2. **Tech Stack**: List of technologies used.
3. **Installation**: Detailed steps to clone and set up the project.
4. **Running the Application**: Instructions for starting both the backend and frontend.
5. **API Endpoints**: Details about the available backend routes.
6. **Contributing**: Steps for contributing to the project.
7. **License**: The license type for the project.

Ensure to customize parts like the repository link, `MONGO_URI`, and JWT secret key as per your actual project setup.
