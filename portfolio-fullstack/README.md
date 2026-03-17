# Personal Portfolio Platform (MERN)

A full-stack, production-ready personal portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). Includes a fully functional public frontend to showcase projects and a secure admin CMS (Content Management System) protected by JWT authentication to manage those projects dynamically.

## 🚀 Live Demo

- **Frontend (Live Site):** `[Link to Vercel deployment here]`
- **Backend (API):** `[Link to Render/Railway deployment here]`

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- React Router DOM (v7)
- Axios
- React Hot Toast (Notifications)
- Vitest & React Testing Library

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT) & bcryptjs (Authentication)
- express-validator (Data Validation)
- Jest & Supertest (Testing API)
- dotenv (Environment Variables)

## ✨ Features

- **Public View:** Clean, responsive grid displaying all portfolio projects.
- **Project Details:** View specific technologies, descriptions, live URLs, and repo links.
- **Admin Authentication:** Secure login using JWT cookies/local storage.
- **Admin CMS Dashboard:** Full CRUD operations (Create, Read, Update, Delete) to easily manage projects without touching the codebase.
- **Self-Testing:** 100% test coverage structure across both frontend and backend using an automated checklist (`npm test`, `npm run lint`).

## 💻 Local Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio-fullstack.git
cd portfolio-fullstack
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173 
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal and run:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm run dev
```

### 4. Running Tests
- **Backend:** `cd backend && npm test`
- **Frontend:** `cd frontend && npm test`

## 📦 Deployment Guide

1. **Backend (Render/Railway):**
   - Push code to GitHub.
   - Connect platform to GitHub repo, setting Root Directory to `backend/`.
   - Start Command: `npm start`
   - Add `.env` vars (`MONGO_URI`, `JWT_SECRET`, `FRONTEND_URL` pointing to your Vercel site).
   - Ensure MongoDB Network Access in Atlas is open to `0.0.0.0/0` (or add your platform's static IPs).

2. **Frontend (Vercel):**
   - Connect Vercel to the repo, setting Root Directory to `frontend/`.
   - Build Command: `npm run build`
   - Add Environment Variable: `VITE_API_URL` pointing to your live backend domain.

## 📝 Presenting This on a Resume
- **Focus on the decoupling:** Highlight that the project is built as an independent API server and a client application, showing your understanding of scalable architectures.
- **Mention Security:** Talk about implementing JWT authentication and bcrypt password hashing.
- **Testing:** Stand out by mentioning the automated tests written with React Testing Library, Vitest, Jest, and Supertest.