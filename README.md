# User and Order Management Backend

This project sets up a backend for user and order management using Mongoose, TypeScript, and Express.

## Prerequisites

Before running the application, make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

## Used Technologies

- TypeScript
- Express
- MongoDB
- Mongoose
- Zod

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mostakimw/users-and-orders.git

   ```

2. Navigate to the project directory:

   ```bash
   cd users-and-orders

   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a .env file in the root of the project and configure the following variables:
   ```PORT=5000
   DATABASE_URL_LOCAL=mongodb://127.0.0.1:27017/userAndOrder
   BCRYPT_SALT_ROUNDS=12
   ```
   Adjust the values based on your preferences and local MongoDB setup

## Database Setup

- Ensure MongoDB is running on your machine.

- The application will create the necessary collections and indexes on startup.

## Build and Compilation

- Build the TypeScript code using:

  ```bash
  npm run build

  ```

## How to Run

- Start the application with the following command:
  ```bash
  npm run start:dev
  ```

You can find more build command in package.json file.

## Contact Information

For any questions, feedback, or inquiries, feel free to reach out to me:

- Email: [mostakimahamed401@gmail.com](mailto:mostakimahamed401@gmail.com)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/mostakim-ahamed/)
