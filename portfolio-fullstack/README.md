# 🎮 Pixel-Art MERN Portfolio

A production-ready, game-inspired personal portfolio for Full-Stack Developers. Featuring a dark retro aesthetic, terminal-style interfaces, and a custom CMS.

![Portfolio Preview](https://via.placeholder.com/800x450/0a0a0f/00f5ff?text=Pixel+Art+Portfolio+Preview)

## ✨ Features

- **Retro Gaming Aesthetic**: Dark mode by default with cyan accents, pixel-fonts, and scanline effects.
- **Single-Page Scroll**: Smooth navigation between Hero, About, Skills, Projects, and Contact sections.
- **Interactive Skill Tree**: Skills displayed with 8-bit XP bars that animate on interaction.
- **Quest Log (Projects)**: A collection of completed works displayed as interactive game cards.
- **Terminal Contact Form**: A stylized communication portal for recruiters and NPCs.
- **Full CMS**: Hidden admin dashboard to manage projects and view messages (MERN Stack).
- **Self-Testing Architecture**: Fully covered by Jest (Backend) and Vitest (Frontend).

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React (Vite), Tailwind CSS, Framer Motion (Logic), Axios |
| **Backend** | Node.js, Express, MongoDB (Mongoose) |
| **Auth** | JWT, bcryptjs |
| **Testing** | Jest, Supertest, Vitest, React Testing Library |

## 🚀 Live Links

- **Frontend**: [Your Vercel URL Here]
- **Backend API**: [Your Railway/Render URL Here]

## 📦 Installation & Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/TetElite/portfolio_project.git
   cd portfolio_project/portfolio-fullstack
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Create .env and add MONGO_URI, JWT_SECRET
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   # Create .env and add VITE_API_URL
   npm run dev
   ```

## 🔒 Security Note
Ensure `FRONTEND_URL` is set in your backend environment variables to restrict CORS access to your specific domain in production.

---
> **Built by [Your Name]** · © 2025 · Level 99 Developer