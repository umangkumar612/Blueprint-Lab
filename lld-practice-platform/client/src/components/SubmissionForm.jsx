import { useState } from 'react'

const fields = [
  ['requirementsUnderstanding', 'Requirements understanding', 'Translate the prompt into the behaviours your design must support.'],
  ['assumptions', 'Assumptions', 'Call out scope decisions, actors, persistence, concurrency, or external systems.'],
  ['classes', 'Classes', 'List the important classes, interfaces, value objects, or enums.'],
  ['responsibilities', 'Responsibilities', 'Explain what each important class owns and what it should not own.'],
  ['relationships', 'Relationships', 'Describe composition, inheritance, collaboration, and key interactions.'],
  ['designExplanation', 'Design explanation', 'Walk through the main flow and why you chose this shape.'],
  ['tradeoffs', 'Trade-offs', 'Name alternatives you considered and the cost of your chosen design.'],
  ['edgeCases', 'Edge cases', 'Cover invalid input, failures, limits, and unusual state transitions.'],
  ['testingApproach', 'Testing approach', 'Describe unit, interaction, and boundary tests you would write.']
]

export default function SubmissionForm({ onSubmit, submitting }) {
  const [form, setForm] = useState(Object.fromEntries(fields.map(([key]) => [key, ''])))
  const [error, setError] = useState('')
  function update(key, value) { setForm((current) => ({ ...current, [key]: value })) }
  function submit(event) { event.preventDefault(); const missing = fields.find(([key]) => !form[key].trim()); if (missing) { setError(`Complete “${missing[1]}” before submitting.`); return } setError(''); onSubmit(form) }
  return <form className="submission-form" onSubmit={submit}>
    <div className="form-intro"><span className="eyebrow">Your design notebook</span><h2>Make your thinking visible.</h2><p>There is no single correct class diagram. Strong submissions make decisions, boundaries, and trade-offs explicit.</p></div>
    {fields.map(([key, label, hint], index) => <label className="field" key={key}><span><b>{String(index + 1).padStart(2, '0')}</b>{label}</span><small>{hint}</small><textarea value={form[key]} onChange={(event) => update(key, event.target.value)} maxLength={5000} rows={index === 5 ? 6 : 4} placeholder="Write your reasoning here..." /></label>)}
    {error && <p className="form-error">{error}</p>}<button className="button button-dark submit-button" disabled={submitting}>{submitting ? 'Submitting design...' : 'Submit for review'} <span>↗</span></button>
  </form>
}
