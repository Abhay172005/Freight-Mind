const logger = require('../utils/logger');
const supabase = require('./supabaseService');
const { parseShipmentQuery, generateRiskAssessment } = require('./llmService');
const { getWeather, getPortCoordinates } = require('./weatherService');
const { getNews } = require('./newsService');
const { getPrediction } = require('./mlService');
const { encryptPII } = require('../utils/crypto');

async function runPrediction({ query, traceId, overrides = {} }) {
  logger.info(`[${traceId}] Starting direct prediction for: "${query}"`);

  const parsedQuery = await parseShipmentQuery(query);
  let weather = null;
  let news = null;

  try {
    weather = await getWeather(parsedQuery.destination);
    news = await getNews(parsedQuery.destination || parsedQuery.region || 'logistics');

    if (overrides.forceWeather) {
      weather = { ...weather, temp: 28, wind_speed: 145, description: 'SEVERE HURRICANE - CATEGORY 5', icon: '11d' };
    }
    if (overrides.forceStrike) {
      news = [{ title: 'CRITICAL: Nationwide Port Union Strike Halts All Operations', description: 'No cargo moving in or out. Backlog estimated at 3 weeks.', sentiment: 'negative', source: 'Logistics Weekly' }, ...(news || [])];
    }
    if (overrides.forceBlockade) {
      news = [{ title: 'ALERT: Geopolitical Conflict Leads to Naval Blockade of Region', description: 'Shipping lanes closed until further notice. Immediate reroute mandatory.', sentiment: 'negative', source: 'Global Conflict Watch' }, ...(news || [])];
    }
  } catch (error) {
    logger.warn(`[${traceId}] External API warning: ${error.message}`);
  }

  const mlResponse = await getPrediction({
    shipping_mode: parsedQuery.shipping_mode || 'Standard Class',
    market: parsedQuery.market || 'Europe',
    order_region: parsedQuery.region || 'Western Europe',
    scheduled_days: parsedQuery.eta_days || 4,
    latitude: weather?.lat || 25.2048,
    longitude: weather?.lon || 55.2708,
    weather_temp: weather?.temp,
    weather_wind: weather?.wind_speed,
    weather_humidity: weather?.humidity,
    customer_segment: 'Consumer',
    category_name: 'Sporting Goods',
    order_status: 'COMPLETE',
  });

  const assessment = await generateRiskAssessment(mlResponse, weather || {}, news || [], query);
  const cargoTypeMultipliers = { electronics: 25000, 'auto parts': 18000, pharmaceutical: 30000, perishable: 15000, textiles: 8000, machinery: 22000, chemicals: 20000, general: 12000, bulk: 6000, wheat: 5000 };
  const cargoKey = Object.keys(cargoTypeMultipliers).find((key) => (parsedQuery.cargo_type || 'general').toLowerCase().includes(key)) || 'general';
  const estimatedCargoValue = cargoTypeMultipliers[cargoKey];
  const delayDays = Math.max(0, mlResponse.predicted_delay_days);
  const riskMultiplier = mlResponse.risk_score / 100;
  const financialBreakdown = {
    holding_cost: Math.round(delayDays * 850 * riskMultiplier),
    penalty_fees: delayDays > 1 ? Math.round(estimatedCargoValue * 0.03 * riskMultiplier) : 0,
    revenue_at_risk: Math.round(estimatedCargoValue * riskMultiplier * 0.4),
  };

  const finalResult = {
    query,
    parsedQuery,
    originCoords: getPortCoordinates(parsedQuery.origin),
    destCoords: getPortCoordinates(parsedQuery.destination),
    riskScore: mlResponse.risk_score,
    predictedDelayDays: mlResponse.predicted_delay_days,
    delayCategory: mlResponse.delay_category,
    topRiskFactors: mlResponse.top_risk_factors,
    shapValues: mlResponse.shap_values,
    weatherData: weather,
    newsData: news,
    mitigations: assessment.mitigations,
    alternativeRoutes: assessment.alternative_routes,
    financialImpactUsd: Object.values(financialBreakdown).reduce((total, value) => total + value, 0),
    financialBreakdown,
    mode_comparison: assessment.mode_comparison || [],
    llmAnalysis: assessment.analysis,
    modelMetrics: mlResponse.model_metrics,
  };

  try {
    const { error } = await supabase.from('predictions').insert([{
      query: finalResult.query,
      parsed_query: finalResult.parsedQuery,
      risk_score: finalResult.riskScore,
      predicted_delay_days: finalResult.predictedDelayDays,
      delay_category: finalResult.delayCategory,
      top_risk_factors: finalResult.topRiskFactors,
      weather_data: finalResult.weatherData,
      news_data: finalResult.newsData,
      mitigations: finalResult.mitigations,
      alternative_routes: finalResult.alternativeRoutes,
      financial_impact_usd: finalResult.financialImpactUsd,
      financial_breakdown: finalResult.financialBreakdown,
      llm_analysis: finalResult.llmAnalysis,
      model_metrics: finalResult.modelMetrics,
      shipper_contact_encrypted: encryptPII(`${query.slice(0, 15)}@shipper.com`),
    }]);
    if (error) logger.warn(`[${traceId}] Supabase insert error: ${error.message}`);
  } catch (error) {
    logger.warn(`[${traceId}] Prediction was not saved: ${error.message}`);
  }

  logger.info(`[${traceId}] Direct prediction complete`);
  return finalResult;
}

module.exports = { runPrediction };
