const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/authMiddleware');
const { submitPrediction } = require('../controllers/predictController');

// POST /predict-risk
router.post('/', requireAuth, submitPrediction);

module.exports = router;
