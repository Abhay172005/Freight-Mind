require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const { requireAuth } = require('./middlewares/authMiddleware');

const authRoute = require('./routes/auth');
const predictRoute = require('./routes/predict');
const historyRoute = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request Tracing Logger Middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, { ip: req.ip });
  next();
});

// Routes
app.use('/api/auth', authRoute);
app.use('/api/predict-risk', predictRoute);
app.use('/api/history', requireAuth, historyRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`\n🚀 Delay Intelligence Server running on http://localhost:${PORT}`);
  logger.info(`   ML Service URL: ${process.env.ML_SERVICE_URL || 'http://localhost:8001'}`);
  logger.info(`   OpenAI API: ${process.env.OPENAI_API_KEY ? '✅ configured' : '❌ not set'}`);
  logger.info('   Processing: direct API execution');
});
