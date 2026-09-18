const request = require('supertest')
const createApp = require('../app')
const InMemoryRepository = require('../repositories/InMemoryRepository')
const RuleBasedEvaluator = require('../evaluators/RuleBasedEvaluator')

const validSubmission = { requirementsUnderstanding: 'The system should allocate compatible spots.', assumptions: 'One garage and synchronous requests.', classes: 'ParkingLot, Vehicle, Spot, Ticket, FeeCalculator.', responsibilities: 'Each class has one focused responsibility.', relationships: 'ParkingLot composes floors and spots.', designExplanation: 'An allocation strategy keeps policy replaceable and encapsulated.', tradeoffs: 'I chose composition as a trade-off against inheritance.', edgeCases: 'A full lot, invalid ticket, and duplicate exit are handled.', testingApproach: 'Unit tests mock the pricing and allocation interfaces.' }

function setup() { const repository = new InMemoryRepository(); return { app: createApp({ repository, evaluator: new RuleBasedEvaluator() }), repository } }

test('problems, attempts, submission, evaluation, and feedback work end to end', async () => {
  const { app } = setup()
  const problems = await request(app).get('/api/problems')
  expect(problems.status).toBe(200); expect(problems.body.data).toHaveLength(3)
  const attempt = await request(app).post('/api/attempts').send({ problemId: 1 })
  expect(attempt.status).toBe(201)
  const submitted = await request(app).post(`/api/attempts/${attempt.body.data.id}/submission`).send(validSubmission)
  expect(submitted.status).toBe(201); expect(submitted.body.data.status).toBe('SUBMITTED')
  const evaluated = await request(app).post(`/api/attempts/${attempt.body.data.id}/evaluate`)
  expect(evaluated.body.data.status).toBe('COMPLETED'); expect(evaluated.body.data.feedbackItems).toHaveLength(9)
  const feedback = await request(app).get(`/api/attempts/${attempt.body.data.id}/evaluation`)
  expect(feedback.body.data.overallSummary).toBeTruthy()
})

test('invalid ids and duplicate submission return useful errors', async () => {
  const { app } = setup()
  expect((await request(app).get('/api/problems/99')).status).toBe(404)
  const attempt = await request(app).post('/api/attempts').send({ problemId: 1 })
  await request(app).post(`/api/attempts/${attempt.body.data.id}/submission`).send(validSubmission)
  expect((await request(app).post(`/api/attempts/${attempt.body.data.id}/submission`).send(validSubmission)).status).toBe(409)
})
