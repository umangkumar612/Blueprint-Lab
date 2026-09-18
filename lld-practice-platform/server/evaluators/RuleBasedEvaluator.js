const FeedbackItem = require('../domain/FeedbackItem')
const SubmissionEvaluator = require('./SubmissionEvaluator')
const RUBRIC = ['Requirement Understanding', 'Class Responsibilities', 'Encapsulation', 'Coupling and Cohesion', 'Abstraction and Interfaces', 'Extensibility', 'Edge Cases', 'Testability', 'Design Trade-offs']
const signals = { 'Requirement Understanding': ['requirement', 'functional', 'system should'], 'Class Responsibilities': ['responsibil', 'class'], Encapsulation: ['encapsulat', 'private', 'hide'], 'Coupling and Cohesion': ['coupling', 'cohesion', 'depend'], 'Abstraction and Interfaces': ['interface', 'abstract', 'polymorph'], Extensibility: ['extend', 'future', 'open/closed', 'new'], 'Edge Cases': ['edge', 'error', 'invalid', 'full'], Testability: ['test', 'mock', 'unit'], 'Design Trade-offs': ['trade-off', 'tradeoff', 'chosen', 'alternative'] }
class RuleBasedEvaluator extends SubmissionEvaluator {
  constructor() { super(); this.type = 'rule-based' }
  async evaluate({ submission }) {
    const text = Object.values(submission).join(' ').toLowerCase()
    const items = RUBRIC.map((criterion) => { const matches = signals[criterion].filter((signal) => text.includes(signal)); const score = Math.min(5, 2 + matches.length + (text.length > 1200 ? 1 : 0)); return new FeedbackItem({ criterion, score, evidence: matches.length ? `Your submission mentions ${matches.join(', ')}.` : 'No direct evidence was found in the submitted sections.', concern: score < 4 ? `The ${criterion.toLowerCase()} reasoning is not explicit enough yet.` : 'The submission gives useful evidence for this dimension.', suggestion: score < 4 ? `Add a concrete example of ${criterion.toLowerCase()} in the design explanation.` : 'Keep this reasoning tied to the problem constraints and likely changes.', confidence: 0.78 }) })
    const average = items.reduce((sum, item) => sum + item.score, 0) / items.length
    return { overallSummary: `Your design shows a ${average.toFixed(1)}/5 reasoning baseline. The strongest next step is to make design decisions more concrete with examples from the problem.`, strengths: items.filter((item) => item.score >= 4).slice(0, 3).map((item) => item.criterion), improvementAreas: items.filter((item) => item.score < 4).slice(0, 4).map((item) => item.criterion), nextSteps: ['Revise the two lowest-scoring criteria with concrete class interactions.', 'Add one failure path and one extension scenario.', 'Re-submit and compare the evidence in each criterion.'], feedbackItems: items }
  }
}
RuleBasedEvaluator.RUBRIC = RUBRIC
module.exports = RuleBasedEvaluator
