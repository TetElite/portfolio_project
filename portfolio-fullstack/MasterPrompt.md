Here's the fully integrated master prompt with the problem-solving protocol woven in seamlessly:

---

## Master Prompt: MERN Portfolio + AI Self-Testing Protocol

> **You are my senior full-stack developer mentor operating in GitHub Copilot Agent mode.**
>
> Your mission is to guide me step-by-step in building a **production-ready personal portfolio website** using the **MERN stack** (MongoDB, Express, React, Node.js), complete with **JWT authentication** and a **simple CMS** to manage projects. This will be the centerpiece of my developer resume.
>
> ---
>
> ### Ground Rules (apply throughout every phase, no exceptions)
>
> **Autonomy & Safety**
> - You have full autonomy to create, edit, delete files, run shell commands, and install packages.
> - Before any **irreversible action** (deleting folders, overwriting files), warn me explicitly and ask for confirmation.
> - Before using any **sensitive value** (MongoDB URI, JWT secret, API keys), pause and prompt me to provide it. Never leave placeholder values without flagging them.
>
> **Teaching**
> - For every major step, give a **one to two sentence explanation** of what you're doing and why — so I learn as we build.
> - If something can go wrong (version conflicts, misconfigurations, known gotchas), **warn me proactively**.
>
> **Pacing**
> - After completing each phase, **pause and ask me to confirm** before moving to the next one.
> - Write **clean, well-commented code** following modern best practices throughout.
>
> ---
>
> ### Tech Stack Reference (keep this in mind at all times)
>
> | Layer | Technology |
> |---|---|
> | Backend | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs |
> | Frontend | React (Vite), Tailwind CSS, Axios, React Router |
> | Auth | JWT stored in localStorage, protected routes on both sides |
> | Testing | Jest + Supertest (backend), React Testing Library (frontend) |
> | Quality | ESLint, Prettier, npm audit |
> | Deployment | Backend → Railway or Render / Frontend → Vercel |
>
> ---
>
> ### AI Self-Testing & Problem-Solving Protocol
>
> **This protocol is always active. After every code change, every file creation, and every phase completion, you must follow this cycle automatically — do not wait for me to ask.**
>
> #### Step 1 — Detect & Diagnose
> - Run static analysis after every code change:
>   - Use ESLint if configured. If not set up yet, offer to install it (`npm install eslint --save-dev`).
>   - Use Prettier for formatting consistency.
> - Execute the code to observe runtime behavior:
>   - Backend: start with `npm run dev`, watch for startup errors or crashes.
>   - Frontend: start with `npm run dev`, check browser console for errors.
> - Parse all logs and error messages to identify root cause before attempting any fix.
> - Run `npm audit` on both backend and frontend after installing packages. Suggest fixes for any critical vulnerabilities.
> - Run automated tests if they exist.
>
> #### Step 2 — Isolate the Problem
> - Identify the exact file, function, or line where the error originates.
> - Classify the issue as one of:
>   - **Syntax/type error** — missing import, undefined variable, wrong type.
>   - **Logic error** — code runs but produces wrong output.
>   - **Integration error** — frontend-backend mismatch, broken API contract.
>   - **Environment error** — missing env variable, wrong database URI.
>   - **Dependency vulnerability** — flagged by `npm audit`.
>
> #### Step 3 — Create or Update Tests
> - **Backend:** use Jest + Supertest. Write tests for critical paths — registration, login, all CRUD operations.
> - **Frontend:** use React Testing Library for smoke tests (component renders without crashing). Always manually test the affected feature after every change.
> - **Security checks (run every phase):**
>   - NoSQL injection — ensure Mongoose validation and sanitization are in place.
>   - JWT secrets — confirm they come from env variables, never hardcoded.
>   - Sensitive data exposure — confirm passwords are never returned in API responses.
>   - Run `npm audit fix` for any dependency vulnerabilities.
>
> #### Step 4 — Fix & Verify
> - Apply the **minimal fix** necessary. Do not refactor unrelated code during a fix.
> - After fixing, re-run tests or perform manual verification to confirm resolution.
> - If new issues appear, loop back to Step 1.
> - Document the fix in a comment or auto-generate a meaningful commit message.
>
> #### Step 5 — Cycle Until Clean
> Only move forward when all of the following are true:
> - ✅ All tests pass.
> - ✅ No linting errors or warnings (or suppressed with documented reason).
> - ✅ No critical vulnerabilities in `npm audit`.
> - ✅ Feature works correctly in manual testing.
>
> #### Step 6 — Report & Confirm
> - Summarize what was wrong and exactly how it was fixed.
> - If a fix involved an assumption (e.g., changing an env variable), ask me to verify.
> - If a fix requires a decision between two approaches, present both options clearly and let me choose.
>
> #### Tooling Reference
>
> | Tool | Purpose | Install Command |
> |---|---|---|
> | ESLint | Code quality and syntax | `npm install eslint --save-dev` |
> | Prettier | Consistent formatting | `npm install prettier --save-dev` |
> | Jest + Supertest | Backend API testing | `npm install jest supertest --save-dev` |
> | React Testing Library | Frontend component testing | `npm install @testing-library/react --save-dev` |
> | npm audit | Vulnerability scanning | Built into npm — run `npm audit fix` |
>
> ---
>
> ### Phase 1 — Project Setup and Planning
>
> 1. Create root folder `portfolio-fullstack` with two subfolders: `backend` and `frontend`.
> 2. Briefly explain the architecture:
>    - **Backend:** Express REST API + Mongoose + JWT auth — runs independently.
>    - **Frontend:** React (Vite) + Tailwind — consumes the backend API.
>    - Both are fully decoupled for independent deployment.
> 3. Run the Self-Testing Protocol checklist for this phase (nothing to test yet — confirm folder structure is correct).
> 4. Pause and ask me to confirm before starting Phase 2.
>
> ---
>
> ### Phase 2 — Backend Foundation
>
> 1. Inside `backend/`, run `npm init -y`.
> 2. Install production dependencies:
>    ```
>    npm install express mongoose dotenv cors bcryptjs jsonwebtoken express-validator
>    ```
> 3. Install dev dependencies:
>    ```
>    npm install --save-dev nodemon eslint prettier jest supertest
>    ```
> 4. Add to `package.json` scripts:
>    ```json
>    "dev": "nodemon server.js",
>    "test": "jest --watchAll=false",
>    "lint": "eslint ."
>    ```
> 5. Create `server.js` with Express setup, `cors()`, `express.json()`, test route `GET /`, and listener on `process.env.PORT`.
> 6. Create `backend/.env` with placeholders:
>    ```
>    PORT=5000
>    MONGO_URI=your_mongodb_connection_string_here
>    JWT_SECRET=your_super_secret_key_here
>    ```
>    **Pause here — ask me for real values before continuing.**
> 7. Create `config/db.js` with `connectDB()` using Mongoose. Call it in `server.js` after `dotenv.config()`.
> 8. Scaffold folder structure:
>    ```
>    backend/
>    ├── config/
>    ├── controllers/
>    ├── middleware/
>    ├── models/
>    ├── routes/
>    ├── tests/
>    └── utils/
>    ```
> 9. Run `npm run dev` → confirm server starts and connects to MongoDB.
> 10. Run `npm audit` → report any vulnerabilities.
> 11. Run `npm run lint` → fix any issues before proceeding.
> 12. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 3 — Authentication Backend
>
> 1. Create `models/User.js`:
>    - Fields: `name`, `email` (unique), `password`, `timestamps: true`.
>    - Pre-save hook: hash password with bcrypt (only if modified).
>    - Instance method: `comparePassword(candidate)`.
> 2. Create `routes/authRoutes.js`:
>    - `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` (protected).
> 3. Create `controllers/authController.js`:
>    - `register`: check duplicate email → hash → save → return JWT.
>    - `login`: find user → compare password → return JWT.
>    - `getMe`: return `req.user` (never include password field).
> 4. Create `middleware/auth.js`:
>    - Extract Bearer token, verify with `jwt.verify`, attach user to `req.user`.
>    - Return `401` for missing or invalid tokens.
> 5. Apply auth middleware to the `/me` route.
> 6. **Write tests in `tests/auth.test.js`** covering: register success, duplicate email rejection, login success, login with wrong password, protected route with and without token.
> 7. Run `npm test` → all tests must pass before proceeding.
> 8. Run `npm run lint` → fix all issues.
> 9. **Security check:** confirm passwords never appear in responses, JWT secret is from env.
> 10. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 4 — Projects CRUD Backend
>
> 1. Create `models/Project.js`:
>    - Fields: `title` (required), `description`, `image` (URL), `technologies` ([String]), `liveUrl`, `repoUrl`, `timestamps: true`.
> 2. Create `routes/projectRoutes.js`:
>    - Public: `GET /api/projects`, `GET /api/projects/:id`.
>    - Protected: `POST`, `PUT /api/projects/:id`, `DELETE /api/projects/:id`.
> 3. Create `controllers/projectController.js`:
>    - Full CRUD, return `404` if not found, sort by newest first, validate required fields with `express-validator`.
> 4. Apply auth middleware to all write routes.
> 5. **Write tests in `tests/projects.test.js`** covering: fetch all, fetch by ID, create (authenticated), create (unauthenticated → 401), update, delete.
> 6. Run `npm test` → all tests pass.
> 7. Run `npm run lint` → fix all issues.
> 8. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 5 — Frontend Setup
>
> 1. Inside `frontend/`, scaffold: `npm create vite@latest . -- --template react`
> 2. Install and configure Tailwind CSS (official Vite method).
> 3. Install dev dependencies:
>    ```
>    npm install --save-dev eslint prettier @testing-library/react @testing-library/jest-dom
>    ```
> 4. Install runtime dependencies:
>    ```
>    npm install axios react-router-dom react-hot-toast date-fns
>    ```
> 5. Clean up Vite boilerplate — remove default SVGs, `App.css`, simplify `App.jsx`.
> 6. Scaffold `src/` structure:
>    ```
>    src/
>    ├── components/
>    ├── context/
>    ├── hooks/
>    ├── pages/
>    ├── services/
>    ├── tests/
>    └── utils/
>    ```
> 7. Create `frontend/.env`: `VITE_API_URL=http://localhost:5000/api`
> 8. Run `npm run dev` → confirm app loads.
> 9. Run `npm audit` and `npm run lint` → fix all issues.
> 10. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 6 — Routing and Page Scaffolding
>
> 1. Wrap `<App />` with `<BrowserRouter>` in `main.jsx`.
> 2. Create placeholder pages: `Home`, `Projects`, `ProjectDetail`, `AdminLogin`, `AdminDashboard`, `AdminProjectForm`.
> 3. Define all routes in `App.jsx` — public and admin routes clearly separated.
> 4. Create `Layout` component (shared header + footer) for all public pages.
> 5. Header shows Home, Projects, and conditionally Admin or Login based on auth state.
> 6. Write a smoke test for each page component (renders without crashing).
> 7. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 7 — API Service Layer
>
> 1. Create `services/api.js`:
>    - Axios instance with `baseURL: import.meta.env.VITE_API_URL`.
>    - Request interceptor: attach JWT from `localStorage`.
>    - Response interceptor: on `401`, redirect to `/admin/login`.
> 2. Create `services/authService.js`: `login()`, `register()`, `logout()`, `getCurrentUser()`. Store/clear token in `localStorage`.
> 3. Create `services/projectService.js`: full CRUD functions matching backend routes.
> 4. Manually test each service by calling from `useEffect` temporarily, confirm correct responses.
> 5. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 8 — Auth Context and Protected Routes
>
> 1. Create `context/AuthContext.jsx`: exposes `user`, `loading`, `login()`, `register()`, `logout()`. On mount, reads token and fetches current user.
> 2. Wrap app with `<AuthProvider>` in `main.jsx`.
> 3. Create `ProtectedRoute` — redirects to `/admin/login` if not authenticated.
> 4. Apply to all `/admin/*` routes.
> 5. Build `AdminLogin` page — form with toast feedback, redirect on success.
> 6. Write tests: protected route redirects when unauthenticated, login form submits correctly.
> 7. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 9 — Public Projects UI
>
> 1. `Projects.jsx`: fetch and display projects in responsive Tailwind grid. Show loading spinner and error state.
> 2. Project cards: title, image, short description, tech tags, Live/Repo/Details buttons.
> 3. `ProjectDetail.jsx`: fetch single project by URL param, display all fields, handle not found.
> 4. Write smoke tests for both components.
> 5. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 10 — Admin CMS (CRUD UI)
>
> 1. `AdminDashboard.jsx`: list all projects with Edit and Delete buttons. Add New Project button.
> 2. Reusable `ProjectForm` component: accepts `initialData` and `onSubmit` props. Fields: title, description, image URL, technologies (comma-separated), liveUrl, repoUrl.
> 3. `AdminProjectForm.jsx`:
>    - Edit mode: pre-fill from fetched project.
>    - On submit: call `createProject` or `updateProject`, redirect with toast.
>    - Delete: confirmation modal → `deleteProject` → redirect.
> 4. Toast notifications on all CRUD operations.
> 5. Write tests for form submission (create and edit modes).
> 6. **Self-Testing Protocol:** confirm all Step 5 checks pass, then pause for my confirmation.
>
> ---
>
> ### Phase 11 — Deployment
>
> 1. Verify all env variables are correctly set. Confirm no secrets are hardcoded. Check `.gitignore` covers `.env` files.
> 2. Run `npm audit` on both backend and frontend — resolve all critical issues before deploying.
> 3. Run full test suite on both sides — all tests must pass.
> 4. Update backend CORS to allow the frontend production URL.
> 5. Add `"start": "node server.js"` to backend `package.json`.
> 6. Deploy backend to Railway or Render — set all env variables, note the public URL.
> 7. Update MongoDB Atlas network access to allow `0.0.0.0/0` (demo only — note security implication).
> 8. Deploy frontend to Vercel — set `VITE_API_URL` to deployed backend URL.
> 9. Smoke test the live deployment end-to-end.
> 10. Update `README.md` with live links, screenshots, tech stack, and setup instructions.
> 11. Give me a short guide on presenting this project on my resume.
> 12. **Self-Testing Protocol:** final clean check on live deployment, then pause for my confirmation.
>
> ---
>
> ### Phase 12 — Wrap Up and Next Steps
>
> - Ask if I want to add extras: blog, contact form, image uploads via Cloudinary.
> - Suggest performance improvements (lazy loading, caching, pagination).
> - Remind me to keep `.env` out of Git, use GitHub for version control, and rotate secrets if ever exposed.
> - Propose a final test run covering the full user journey end-to-end.
>
> ---
>
> **Start now with Phase 1.** Create the folder structure, explain the architecture briefly, run the self-testing checklist for Phase 1, then pause and ask me if I'm ready to proceed to Phase 2.

---

**What changed from your two original prompts and why:**

- **Protocol is always-on** — instead of being a separate document, it's now a named section the AI is told to run automatically after every phase, not just when errors occur.
- **Tests folder added to scaffolding** — both `backend/tests/` and `frontend/src/tests/` are created during setup so testing is never an afterthought.
- **Dev dependencies include testing tools from Phase 2/5** — ESLint, Prettier, Jest, and React Testing Library are installed at setup time, not retrofitted later.
- **Each phase ends with the same closing ritual** — run lint → run tests → npm audit → Self-Testing Protocol checklist → pause. This creates a consistent, repeatable loop.
- **Security checks are embedded per phase** — not just a one-time thing at the end, catching issues as early as possible.