const EvaluationService = require('../services/EvaluationService')
const InMemoryRepository = require('../repositories/InMemoryRepository')
const RuleBasedEvaluator = require('../evaluators/RuleBasedEvaluator')
const Attempt = require('../domain/Attempt')

test('failed evaluator preserves submission and allows retry', async () => {
  const repository = new InMemoryRepository(); const attempt = repository.createAttempt(1); attempt.transitionTo(Attempt.STATUS.SUBMITTED); repository.saveAttempt(attempt); repository.saveSubmission(attempt.id, { classes: 'Vehicle', designExplanation: 'Design', requirementsUnderstanding: 'Requirements', assumptions: 'Assumptions', responsibilities: 'Responsibilities', relationships: 'Relationships', tradeoffs: 'Trade-offs', edgeCases: 'Edge cases', testingApproach: 'Tests' })
  let fail = true
  const evaluator = { type: 'test', evaluate: async () => { if (fail) throw new Error('bad AI'); return new RuleBasedEvaluator().evaluate({ submission: repository.findSubmission(attempt.id) }) } }
  const service = new EvaluationService(repository, evaluator)
  expect((await service.evaluate(attempt.id)).status).toBe('FAILED'); expect(repository.findSubmission(attempt.id).classes).toBe('Vehicle')
  fail = false; expect((await service.retry(attempt.id)).status).toBe('COMPLETED')
})
