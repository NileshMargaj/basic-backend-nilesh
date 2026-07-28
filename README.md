# basic-backend-nilesh

A ready-to-use Node.js backend starter package for Express, MongoDB, JWT authentication, cookie-based sessions, email notifications, and OTP password reset flows.

This package is designed for developers who want a clean backend foundation for authentication-driven REST APIs without setting up the same boilerplate again and again.

## Features

- Express.js server setup
- MongoDB connection with Mongoose
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- HTTP-only auth cookies
- Protected profile route
- Logout route
- Forgot password flow with OTP
- OTP verification
- Password reset
- Email delivery with Nodemailer
- Environment-based configuration
- Apache-2.0 licensed

## Installation

Install the package from npm:

```bash
npm install basic-backend-nilesh
```

Or clone the repository:

```bash
git clone https://github.com/NileshMargaj/basic-backend-nilesh.git
cd basic-backend-nilesh
npm install
```

## Requirements

- Node.js 18 or newer recommended
- MongoDB database
- Gmail SMTP credentials or an app password for email sending

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_CONNECTION_URI=mongodb://127.0.0.1:27017
JWT_SECRET=your_strong_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
NODE_ENV=development
```

The MongoDB database name is configured in `src/constant/constant.js`.

## Usage

Start the server:

```bash
npm start
```

Run in development mode with Nodemon:

```bash
npm run dev
```

By default, the server runs on:

```text
http://localhost:3000
```

## API Routes

Base route:

```text
/api/auth
```

### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "username": "Nilesh",
  "email": "nilesh@example.com",
  "password": "password123"
}
```

### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "nilesh@example.com",
  "password": "password123"
}
```

### Logout User

```http
POST /api/auth/logout
```

### Get User Profile

```http
GET /api/auth/profile
```

Authentication is required. Send the token using the `token` cookie or an authorization header:

```http
Authorization: Bearer your_jwt_token
```

### Forgot Password

```http
POST /api/auth/forgot-password
```

Request body:

```json
{
  "email": "nilesh@example.com"
}
```

### Verify OTP

```http
POST /api/auth/verify-otp
```

Request body:

```json
{
  "email": "nilesh@example.com",
  "otp": 123456
}
```

### Reset Password

```http
POST /api/auth/reset-password
```

Request body:

```json
{
  "email": "nilesh@example.com",
  "otp": 123456,
  "newPassword": "newPassword123"
}
```

## Project Structure

```text
backend/
  server.js
  src/
    app.js
    constant/
    controller/
    database/
    middlewre/
    model/
    route/
    utility/
```

## Scripts

```bash
npm start
```

Runs the production server using Node.js.

```bash
npm run dev
```

Runs the development server using Nodemon.

## Security Notes

- Keep `JWT_SECRET`, `EMAIL_USER`, and `EMAIL_PASS` private.
- Use a strong JWT secret in production.
- Use Gmail app passwords instead of your main account password.
- Set `NODE_ENV=production` in production so cookies are marked secure.
- Always use HTTPS in production.

## Repository

GitHub: [NileshMargaj/basic-backend-nilesh](https://github.com/NileshMargaj/basic-backend-nilesh)

Report issues: [GitHub Issues](https://github.com/NileshMargaj/basic-backend-nilesh/issues)

## Author

Nilesh Margaj

## License

This project is licensed under the Apache License 2.0.

You are free to use, modify, and distribute this package under the terms of the Apache-2.0 license.
