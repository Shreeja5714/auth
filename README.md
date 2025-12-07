# JWT Authentication System with Password Reset

A complete authentication system built with Node.js, Express, MongoDB, and JWT featuring user registration, login, password change, and email-based password reset functionality.

**Author:** Shreeja Vyas  
**GitHub:** [@Shreeja5714](https://github.com/Shreeja5714)  
**Email:** shreeja@example.com

## 📁 Project Structure
```
jwt-auth-system/
│
├── src/
│   ├── config/
│   │   ├── db.js                      # MongoDB connection configuration
│   │   └── emailConfig.js             # Nodemailer email configuration
│   │
│   ├── models/
│   │   └── user.js                    # User schema (name, email, password, tc)
│   │
│   ├── controllers/
│   │   └── userController.js          # Auth logic (register, login, change password, reset password)
│   │
│   ├── middleware/
│   │   └── authMiddleware.js          # JWT authentication middleware
│   │
│   ├── routes/
│   │   └── userRoutes.js              # User/Auth route definitions
│   │
│   ├── app.js                         # Express app configuration
│   └── server.js                      # Server entry point
│
├── .env                               # Environment variables (not in git)
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore file
├── package.json                       # Project dependencies
├── package-lock.json                  # Dependency lock file
└── README.md                          # Project documentation
```

### Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (secrets, API keys) |
| `.env.example` | Template for environment variables |
| `package.json` | Project metadata and dependencies |
| `.gitignore` | Files to ignore in git |

## 🚀 Features

- ✅ **User Registration** - Create new user accounts with validation
- ✅ **User Login** - Authenticate users with JWT tokens
- ✅ **Change Password** - Allow authenticated users to change their password
- ✅ **Password Reset via Email** - Send password reset links via email
- ✅ **Get User Profile** - Retrieve authenticated user details
- ✅ **JWT Token Authentication** - Secure route protection with bearer tokens
- ✅ **Password Hashing** - Secure password storage with bcrypt (10 rounds)
- ✅ **Email Service** - Nodemailer integration for Gmail SMTP

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) - 1 day expiry for auth, 15 min for reset
- **Password Hashing:** bcrypt (salt rounds: 10)
- **Email Service:** Nodemailer with Gmail SMTP
- **Environment Variables:** dotenv

## 📦 Prerequisites

Before running this project, ensure you have:

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Gmail account with App Password enabled
- npm or yarn package manager
- Postman or similar API testing tool (optional)


## 📚 API Endpoints

### Base URL
```
http://localhost:8000/api/user
```

### Endpoint Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/register` | ❌ No | Register new user |
| POST | `/login` | ❌ No | Login user |
| POST | `/change-password` | ✅ Yes | Change password |
| POST | `/send-reset-password-email` | ❌ No | Send reset link |
| POST | `/reset-password/:id/:token` | ❌ No | Reset password |
| GET | `/profile` | ✅ Yes | Get user profile |

---
**Note:** Password is excluded from response

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found (user doesn't exist)
- `500` - Internal Server Error

## 🧪 Testing Workflow

1. **Register** → Create account
2. **Login** → Get JWT token
3. **Get Profile** → Verify authentication works
4. **Change Password** → Test password update
5. **Forgot Password** → Request reset email
6. **Check Email** → Click reset link
7. **Reset Password** → Set new password
8. **Login Again** → Verify new password works

## 📝 Scripts
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```
**By Shreeja Vyas**
