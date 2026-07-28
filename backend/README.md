# Basic Backend Nilesh

A production-ready Node.js/Express backend starter pack with built-in authentication (JWT + cookies), OTP-based password reset, MongoDB integration, and email notifications — all pre-configured and ready to use.

[![npm version](https://img.shields.io/npm/v/basic-backend-nilesh)](https://www.npmjs.com/package/basic-backend-nilesh)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/NileshMargaj/basic-backend-nilesh/pulls)

---

## ✨ Features

- **🔐 Full Authentication System** — Register, Login, Logout with JWT tokens stored in HTTP-only cookies
- **📧 Email Notifications** — Welcome emails on registration using Nodemailer (Gmail SMTP)
- **🔑 OTP-Based Password Reset** — Forgot password flow with 6-digit OTP, verification, and secure password reset
- **🛡️ Auth Middleware** — Protect routes with JWT verification (supports cookies & Bearer tokens)
- **📦 CLI Scaffolding Tool** — Generate a fresh backend project instantly via `npx`
- **🗄️ MongoDB + Mongoose** — Pre-configured database connection with clean schema models
- **🍪 Cookie Parser** — Secure cookie-based session management
- **⚡ Express 5** — Built on the latest Express framework
- **🏗️ Modular Structure** — Well-organized controllers, models, routes, and utilities

---

## 🚀 Quick Start

Scaffold a new backend project in seconds:

```bash
npx basic-backend-nilesh my-app
cd my-app
npm install
```

Then configure your environment variables and start developing.

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas))
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) (for email features)

---

## 🛠️ Installation & Setup

### Option 1 — Using NPX (recommended)

```bash
npx basic-backend-nilesh my-project
cd my-project
```

### Option 2 — Manual Clone

```bash
git clone https://github.com/NileshMargaj/basic-backend-nilesh.git
cd basic-backend-nilesh
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB
MONGO_CONNECTION_URI=mongodb://localhost:27017

# JWT
JWT_SECRET=your-super-secret-jwt-key

# Email (Gmail App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Environment
NODE_ENV=development
```

> **⚠️ Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

### Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `PORT` env variable).

---

## 📡 API Reference

All endpoints are prefixed with `/api/auth`.

### Public Endpoints

| Method | Endpoint                  | Description                      | Request Body                                     |
|--------|---------------------------|----------------------------------|--------------------------------------------------|
| POST   | `/api/auth/register`      | Register a new user              | `{ username, email, password }`                  |
| POST   | `/api/auth/login`         | Login with email & password      | `{ email, password }`                            |
| POST   | `/api/auth/logout`        | Logout and clear auth cookie     | —                                                |
| POST   | `/api/auth/forgot-password` | Request OTP for password reset | `{ email }`                                      |
| POST   | `/api/auth/verify-otp`    | Verify the 6-digit OTP           | `{ email, otp }`                                 |
| POST   | `/api/auth/reset-password` | Reset password with verified OTP | `{ email, otp, newPassword }`                    |

### Protected Endpoint

| Method | Endpoint              | Description            | Auth Required |
|--------|-----------------------|------------------------|---------------|
| GET    | `/api/auth/profile`   | Get current user info  | ✅ Yes        |

> **Headers for protected routes:**  
> `Authorization: Bearer <token>`  
> or the token is automatically read from the `token` cookie.

### Response Format

All API responses follow a consistent structure:

```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "username": "...",
    "email": "...",
    "createdAt": "..."
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "User already exists"
}
```

---

## 📁 Project Structure

```
backend/
├── bin/
│   └── cli.js                  # CLI scaffolding entry point
├── src/
│   ├── constant/
│   │   └── constant.js         # App constants (DB_NAME, etc.)
│   ├── controller/
│   │   └── user.controller.js  # Auth business logic
│   ├── database/
│   │   └── db.js               # MongoDB connection
│   ├── middlewre/
│   │   └── auth.middleware.js   # JWT authentication middleware
│   ├── model/
│   │   ├── user.model.js       # User schema
│   │   └── otp.model.js        # OTP schema (auto-expires in 10 min)
│   ├── route/
│   │   └── user.route.js       # All auth route definitions
│   ├── utility/
│   │   └── sendEmil.utils.js   # Nodemailer email utility
│   └── app.js                  # Express app setup & middleware
├── server.js                   # Entry point
├── package.json
└── .gitignore
```

---

## 🔐 Authentication Flow

### Registration
1. User sends `POST /api/auth/register` with `{ username, email, password }`
2. Server hashes the password with **bcrypt** (10 salt rounds)
3. Creates user in MongoDB, generates a JWT, sets it as an HTTP-only cookie
4. Sends a welcome email to the user
5. Returns user data (without password)

### Login
1. User sends `POST /api/auth/login` with `{ email, password }`
2. Server verifies credentials, generates a JWT (expires in 2 days)
3. Sets JWT as an HTTP-only cookie
4. Returns user data (without password)

### Password Reset Flow
1. **Forgot Password** — User requests OTP via email
2. **Verify OTP** — User submits the received 6-digit OTP
3. **Reset Password** — User sets a new password (OTP expires after verification)

> OTPs are stored with a TTL (Time-To-Live) index and auto-delete after 10 minutes.

---

## 🧰 Built With

| Technology | Purpose |
|------------|---------|
| [Express](https://expressjs.com/) | Web framework (v5) |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [JSON Web Token](https://jwt.io/) | Authentication |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [Nodemailer](https://nodemailer.com/) | Email delivery |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Cookie handling |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variables |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing style and all tests pass.

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? Open an [issue](https://github.com/NileshMargaj/basic-backend-nilesh/issues) on GitHub.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**Nilesh Margaj**

- GitHub: [@NileshMargaj](https://github.com/NileshMargaj)
- npm: [basic-backend-nilesh](https://www.npmjs.com/package/basic-backend-nilesh)

---

<p align="center">
  Made with ❤️ by Nilesh Margaj
</p>

