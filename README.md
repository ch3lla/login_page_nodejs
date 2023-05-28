# Login Page with Node.js, Express, and MySQL

This project demonstrates the implementation of a login page using Node.js, Express, and MySQL. It provides a basic authentication system where users can register, login, and access protected routes.

## Features

- User registration: Users can create an account by providing their name, email, and password.
- User login: Registered users can log in using their email and password.
- Password hashing: User passwords are securely hashed using bcrypt for improved security.
- MySQL database: User information is stored and retrieved from a MySQL database.
- Session management: User sessions are managed using the express-session middleware.

## Prerequisites

Before running the application, make sure you have the following prerequisites installed on your system:

- Node.js: [Download and install Node.js](https://nodejs.org/en/download/)
- MySQL: [Download and install MySQL](https://dev.mysql.com/downloads/)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the MySQL database:

   - Create a new database in MySQL.
   - Update the `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, and `DATABASE_NAME` values in the `.env` file with your MySQL database configuration.

5. Start the application:

   ```bash
   npm start
   ```

6. Open your web browser and access the login page:

   ```
   http://localhost:5000/login
   ```

## Usage

1. Register a new user:
   - Click on the "Register" link on the login page.
   - Fill in the registration form with your name, email, and password.
   - Click the "Submit" button to create a new user account.

2. Log in:
   - Enter your registered email and password on the login page.
   - Click the "Submit" button to log in.

3. Access protected routes:
   - Once logged in, you can access protected routes such as the home page.
   - If you try to access protected routes without logging in, you will be redirected to the login page.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [express-session](https://www.npmjs.com/package/express-session)

Feel free to customize and expand this README file according to your project's specific details and requirements.
