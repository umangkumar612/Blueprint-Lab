const FIELDS = Object.freeze(['requirementsUnderstanding', 'assumptions', 'classes', 'responsibilities', 'relationships', 'designExplanation', 'tradeoffs', 'edgeCases', 'testingApproach'])
class Submission {
  constructor(data) { FIELDS.forEach((field) => { this[field] = String(data[field] || '').trim() }) }
  validate() { const missing = FIELDS.filter((field) => !this[field]); if (missing.length) throw new Error(`Missing submission sections: ${missing.join(', ')}`); if (FIELDS.some((field) => this[field].length > 5000)) throw new Error('Each submission section must be 5000 characters or fewer'); return true }
}
Submission.FIELDS = FIELDS
module.exports = Submission
