const Attempt = require('../domain/Attempt')

class EvaluationService {
  constructor(repository, evaluator) { this.repository = repository; this.evaluator = evaluator; this.running = new Set() }
  async evaluate(attemptId, { forceRetry = false } = {}) {
    const attempt = this.repository.findAttempt(attemptId); if (!attempt) throw Object.assign(new Error('Attempt not found'), { status: 404 })
    const existing = this.repository.findEvaluation(attemptId)
    if (attempt.status === Attempt.STATUS.EVALUATING || this.running.has(Number(attemptId))) return this.getEvaluation(attemptId)
    if (attempt.status === Attempt.STATUS.COMPLETED && !forceRetry) return this.getEvaluation(attemptId)
    if (!attempt.canEvaluate()) throw Object.assign(new Error('Attempt must be submitted before evaluation'), { status: 409 })
    const submission = this.repository.findSubmission(attemptId); if (!submission) throw Object.assign(new Error('Submission not found'), { status: 404 })
    attempt.transitionTo(Attempt.STATUS.EVALUATING); this.repository.saveAttempt(attempt); this.running.add(Number(attemptId))
    this.repository.saveEvaluation({ id: existing?.id, attemptId, evaluatorType: this.evaluator.type, status: 'EVALUATING', createdAt: existing?.createdAt || new Date().toISOString() })
    try {
      const result = await this.evaluator.evaluate({ problem: this.repository.findProblem(attempt.problemId), submission })
      const evaluation = this.repository.saveEvaluation({ id: existing?.id, attemptId, evaluatorType: this.evaluator.type, status: 'COMPLETED', ...result, completedAt: new Date().toISOString() })
      this.repository.saveFeedback(evaluation.id, result.feedbackItems)
      attempt.transitionTo(Attempt.STATUS.COMPLETED); this.repository.saveAttempt(attempt); return this.getEvaluation(attemptId)
    } catch (error) {
      this.repository.saveEvaluation({ id: existing?.id, attemptId, evaluatorType: this.evaluator.type, status: 'FAILED', errorMessage: 'Evaluation failed. Your submission was preserved.', completedAt: new Date().toISOString() })
      attempt.transitionTo(Attempt.STATUS.FAILED); this.repository.saveAttempt(attempt)
      return this.getEvaluation(attemptId)
    } finally { this.running.delete(Number(attemptId)) }
  }
  getEvaluation(attemptId) { const evaluation = this.repository.findEvaluation(attemptId); if (!evaluation) return null; return { ...evaluation, feedbackItems: this.repository.findFeedback(evaluation.id) } }
  async retry(attemptId) { return this.evaluate(attemptId, { forceRetry: true }) }
}
module.exports = EvaluationService
