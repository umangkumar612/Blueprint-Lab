const Attempt = require('../domain/Attempt')
const Submission = require('../domain/Submission')

class AttemptService {
  constructor(repository) { this.repository = repository }
  listProblems() { return this.repository.listProblems() }
  getProblem(id) { const problem = this.repository.findProblem(id); if (!problem) throw Object.assign(new Error('Problem not found'), { status: 404 }); return problem }
  createAttempt(problemId) { this.getProblem(problemId); return this.repository.createAttempt(problemId) }
  listAttempts() { return this.repository.listAttempts() }
  getAttempt(id) { const attempt = this.repository.findAttempt(id); if (!attempt) throw Object.assign(new Error('Attempt not found'), { status: 404 }); return { ...attempt, problem: this.repository.findProblem(attempt.problemId), submission: this.repository.findSubmission(attempt.id), evaluation: this.repository.findEvaluation(attempt.id) } }
  submit(attemptId, input) { this.getAttempt(attemptId); const attempt = this.repository.findAttempt(attemptId); if (!attempt.canSubmit()) throw Object.assign(new Error('Only an in-progress attempt can be submitted'), { status: 409 }); const submission = new Submission(input); submission.validate(); this.repository.saveSubmission(attemptId, submission); attempt.transitionTo(Attempt.STATUS.SUBMITTED); this.repository.saveAttempt(attempt); return this.getAttempt(attemptId) }
  getSubmission(attemptId) { const attempt = this.getAttempt(attemptId); return attempt.submission }
}
module.exports = AttemptService
