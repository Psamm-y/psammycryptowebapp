const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
// Allowed origins: always allow localhost for dev, plus any deployed frontend URL from env
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cryptoRoutes = require('./routes/cryptoRoutes');

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Coinbase Clone Backend API');
});

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/crypto', cryptoRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
