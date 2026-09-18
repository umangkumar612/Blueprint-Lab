class FeedbackItem { constructor(data) { this.criterion = data.criterion; this.score = Math.max(1, Math.min(5, Number(data.score))); this.evidence = data.evidence || ''; this.concern = data.concern || ''; this.suggestion = data.suggestion || ''; this.confidence = Math.max(0, Math.min(1, Number(data.confidence))) } }
module.exports = FeedbackItem
