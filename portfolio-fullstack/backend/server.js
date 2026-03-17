const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables before anything else
dotenv.config();

const app = express();

// --- Middleware ---
// Allow cross-origin requests (React frontend on a different port/domain)
// Make sure to add FRONTEND_URL to your deployment environment variables
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
// Parse incoming JSON request bodies
app.use(express.json());

// --- Routes ---
// Health-check route — confirms the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Only connect to DB and start listening when run directly (not during tests)
if (require.main === module) {
  const connectDB = require('./config/db');
  connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Supertest (tests connect their own DB via testHelper)
module.exports = app;
