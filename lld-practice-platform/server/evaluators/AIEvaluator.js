const OpenAI = require('openai')
const FeedbackItem = require('../domain/FeedbackItem')
const RuleBasedEvaluator = require('./RuleBasedEvaluator')
const SubmissionEvaluator = require('./SubmissionEvaluator')
class AIEvaluator extends SubmissionEvaluator {
  constructor(apiKey) { super(); this.type = 'openai'; this.client = new OpenAI({ apiKey, timeout: 30000 }) }
  async evaluate({ problem, submission }) {
    const response = await this.client.chat.completions.create({ model: 'gpt-4o-mini', response_format: { type: 'json_object' }, temperature: 0.2, messages: [{ role: 'system', content: `You are an LLD interviewer. Multiple designs can be valid. Evaluate reasoning and only evidence actually present. Do not invent submitted classes. Return JSON with overallSummary, strengths[], improvementAreas[], nextSteps[], feedbackItems[]. Each feedback item must have criterion, score (1-5), evidence, concern, suggestion, confidence (0-1). Use exactly these criteria: ${RuleBasedEvaluator.RUBRIC.join(', ')}.` }, { role: 'user', content: JSON.stringify({ problem, submission }) }] })
    const parsed = JSON.parse(response.choices[0].message.content)
    if (!parsed.overallSummary || !Array.isArray(parsed.feedbackItems) || parsed.feedbackItems.length !== RuleBasedEvaluator.RUBRIC.length) throw new Error('AI evaluator returned an unexpected structure')
    return { ...parsed, feedbackItems: parsed.feedbackItems.map((item) => new FeedbackItem(item)) }
  }
}
module.exports = AIEvaluator
