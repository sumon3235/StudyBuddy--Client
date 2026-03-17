# StudyBuddy

## 🎯 Purpose

StudyBuddy is an online group study platform where registered users can create assignments, submit them, and grade each other's work. Every registered user is considered a friend of others, making it a collaborative learning environment.

## 🔗 Live URL

- **Client:** [https://studybuddy-173df.web.app/](https://studybuddy-173df.web.app)
- **Client:** [https://studybuddy-173df.firebaseapp.com/](https://studybuddy-173df.web.app)

## ✨ Key Features

- Email/password and Google authentication with Firebase
- JWT-based authentication with HTTP-only cookies for secure private routes
- Create assignments with title, description, marks, thumbnail, difficulty level, and due date
- View all assignments with filter by difficulty level and pagination
- Only the creator can delete their own assignment — others see a disabled button
- Submit assignments via Google Docs link with a short note
- Pending assignments page showing all ungraded submissions
- Give marks and feedback on friends' submissions — cannot grade your own
- My Assignments page showing submission status, obtained marks, and feedback
- Fully responsive on mobile, tablet, and desktop
- Loading spinners for all data-fetching states

## 🛠️ Tech Stack

### Client Side
- React 19
- React Router v7
- TanStack Query v5
- Axios
- Firebase Authentication
- Tailwind CSS
- DaisyUI
- React Hot Toast
- React DatePicker

### Server Side
- Node.js
- Express.js
- MongoDB (Atlas)
- JSON Web Token (JWT)
- Cookie Parser
- Dotenv
- CORS

## 📦 NPM Packages Used

### Client
| Package | Purpose |
|---|---|
| `react-router` | Client-side routing |
| `@tanstack/react-query` | Server state management |
| `axios` | HTTP requests |
| `firebase` | Authentication |
| `react-hot-toast` | Toast notifications |
| `react-datepicker` | Date picker for due date |
| `framer-motion` | 

### Server
| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongodb` | Database |
| `jsonwebtoken` | JWT authentication |
| `cookie-parser` | Cookie handling |
| `cors` | Cross-origin requests |
| `dotenv` | Environment variables |

## 🚀 Run Locally

### Client
```bash
git clone https://github.com/sumon3235/studybuddy-client
cd studybuddy-client
npm install
npm run dev
```

### Server
```bash
git clone https://github.com/sumon3235/studybuddy-server
cd studybuddy-server
npm install
nodemon index.js
```

### Environment Variables

**Client `.env.local`:**
```
VITE_APIURL=http://localhost:5000
VITE_API_KEY=your_firebase_api_key
VITE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_PROJECT_ID=your_firebase_project_id
VITE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_APP_ID=your_firebase_app_id
```

**Server `.env`:**
```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
