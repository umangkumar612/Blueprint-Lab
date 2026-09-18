const Attempt = require('../domain/Attempt')
const Submission = require('../domain/Submission')
const RuleBasedEvaluator = require('../evaluators/RuleBasedEvaluator')

test('attempt enforces valid state transitions', () => {
  const attempt = new Attempt({ status: Attempt.STATUS.IN_PROGRESS })
  attempt.transitionTo(Attempt.STATUS.SUBMITTED).transitionTo(Attempt.STATUS.EVALUATING).transitionTo(Attempt.STATUS.COMPLETED)
  expect(attempt.status).toBe(Attempt.STATUS.COMPLETED)
  expect(() => attempt.transitionTo(Attempt.STATUS.IN_PROGRESS)).toThrow('Invalid attempt transition')
})

test('submission rejects missing sections', () => {
  expect(() => new Submission({ classes: 'Car' }).validate()).toThrow('Missing submission sections')
})

test('rule evaluator returns the fixed rubric with explainable items', async () => {
  const result = await new RuleBasedEvaluator().evaluate({ submission: { classes: 'ParkingLot has Spot classes', edgeCases: 'full lot', tradeoffs: 'trade-off', testingApproach: 'unit test' } })
  expect(result.feedbackItems).toHaveLength(9)
  expect(result.feedbackItems.find((item) => item.criterion === 'Edge Cases').evidence).toContain('full')
})
