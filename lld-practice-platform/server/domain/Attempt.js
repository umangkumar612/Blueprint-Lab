const STATUS = Object.freeze({ IN_PROGRESS: 'IN_PROGRESS', SUBMITTED: 'SUBMITTED', EVALUATING: 'EVALUATING', COMPLETED: 'COMPLETED', FAILED: 'FAILED' })
const transitions = { IN_PROGRESS: [STATUS.SUBMITTED], SUBMITTED: [STATUS.EVALUATING], EVALUATING: [STATUS.COMPLETED, STATUS.FAILED], FAILED: [STATUS.EVALUATING] }
class Attempt {
  constructor(data) { Object.assign(this, data) }
  transitionTo(nextStatus) {
    if (this.status === nextStatus) return this
    if (!transitions[this.status]?.includes(nextStatus)) throw new Error(`Invalid attempt transition from ${this.status} to ${nextStatus}`)
    this.status = nextStatus; this.updatedAt = new Date().toISOString()
    if (nextStatus === STATUS.SUBMITTED) this.submittedAt = this.updatedAt
    return this
  }
  canSubmit() { return this.status === STATUS.IN_PROGRESS }
  canEvaluate() { return [STATUS.SUBMITTED, STATUS.FAILED].includes(this.status) }
}
Attempt.STATUS = STATUS
module.exports = Attempt
