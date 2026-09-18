require('dotenv').config()

module.exports = {
  port: Number(process.env.PORT || 4000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  evaluatorType: process.env.EVALUATOR_TYPE || 'rule-based',
  openAiKey: process.env.OPENAI_API_KEY || ''
}
