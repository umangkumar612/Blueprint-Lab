const AIEvaluator = require('../evaluators/AIEvaluator')

test('malformed AI response is rejected by the evaluator contract', async () => {
  const evaluator = new AIEvaluator('test-key')
  evaluator.client = { chat: { completions: { create: async () => ({ choices: [{ message: { content: '{bad json' } }] }) } } }
  await expect(evaluator.evaluate({ problem: {}, submission: {} })).rejects.toThrow()
})
