const Attempt = require('../domain/Attempt')
const Evaluation = require('../domain/Evaluation')
const seedProblems = require('../seed')
class InMemoryRepository {
  constructor() { this.reset() }
  reset() { this.problems = seedProblems.map((problem) => ({ ...problem })); this.attempts = []; this.submissions = []; this.evaluations = []; this.feedbackItems = []; this.ids = { attempt: 0, submission: 0, evaluation: 0, feedback: 0 } }
  listProblems() { return this.problems }
  findProblem(id) { return this.problems.find((problem) => Number(problem.id) === Number(id)) }
  createAttempt(problemId) { const now = new Date().toISOString(); const attempt = new Attempt({ id: ++this.ids.attempt, problemId: Number(problemId), status: Attempt.STATUS.IN_PROGRESS, startedAt: now, createdAt: now, updatedAt: now }); this.attempts.push(attempt); return attempt }
  findAttempt(id) { return this.attempts.find((attempt) => Number(attempt.id) === Number(id)) }
  saveAttempt(attempt) { return attempt }
  saveSubmission(attemptId, submission) { const record = { id: ++this.ids.submission, attemptId: Number(attemptId), ...submission, createdAt: new Date().toISOString() }; this.submissions = this.submissions.filter((item) => item.attemptId !== Number(attemptId)); this.submissions.push(record); return record }
  findSubmission(attemptId) { return this.submissions.find((item) => item.attemptId === Number(attemptId)) }
  saveEvaluation(data) { const existing = this.evaluations.find((item) => item.attemptId === Number(data.attemptId)); const evaluation = new Evaluation({ ...existing, ...data, id: data.id || existing?.id || ++this.ids.evaluation, attemptId: Number(data.attemptId) }); if (existing) this.evaluations = this.evaluations.map((item) => item.id === evaluation.id ? evaluation : item); else this.evaluations.push(evaluation); return evaluation }
  findEvaluation(attemptId) { return this.evaluations.find((item) => item.attemptId === Number(attemptId)) }
  saveFeedback(evaluationId, items) { this.feedbackItems = this.feedbackItems.filter((item) => item.evaluationId !== evaluationId); const records = items.map((item) => ({ id: ++this.ids.feedback, evaluationId, ...item })); this.feedbackItems.push(...records); return records }
  findFeedback(evaluationId) { return this.feedbackItems.filter((item) => item.evaluationId === Number(evaluationId)) }
  listAttempts() { return this.attempts.map((attempt) => ({ ...attempt, problem: this.findProblem(attempt.problemId), evaluation: this.findEvaluation(attempt.id) })) }
}
module.exports = InMemoryRepository
