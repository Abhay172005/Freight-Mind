const crypto = require('crypto');
const logger = require('../utils/logger');
const { runPrediction } = require('../services/predictionService');

exports.submitPrediction = async (req, res) => {
  const { query, overrides = {} } = req.body;
  const traceId = crypto.randomUUID(); 
  
  if (!query) {
    return res.status(400).json({ error: 'Shipment query is required' });
  }

  try {
    const result = await runPrediction({ query, traceId, overrides });
    res.json({ message: 'Prediction completed successfully', traceId, result });
  } catch (error) {
    logger.error(`[${traceId}] Prediction failed`, error);
    res.status(500).json({ error: 'Failed to process request' });
  }
};
