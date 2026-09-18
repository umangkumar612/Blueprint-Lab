# AI-Assisted Decisions

This document records the meaningful AI-assisted decisions made while building the MVP.

## 1. Use structured text before a UML editor

- **Problem:** A diagram editor would increase implementation and validation scope for a two-day assignment.
- **Suggestion:** Treat the learner submission as explicit sections that capture the same reasoning a diagram discussion would reveal.
- **Accepted:** Nine named sections for requirements, assumptions, classes, responsibilities, relationships, explanation, trade-offs, edge cases, and tests.
- **Rejected:** Building a custom canvas/editor and code execution.
- **Why:** The assignment prioritizes end-to-end flow and LLD quality.
- **Final decision:** Structured text is the first submission representation.

## 2. Isolate evaluators behind a contract

- **Problem:** A direct OpenAI call would make the practice flow hard to test and fragile when the key is absent.
- **Suggestion:** Depend on a `SubmissionEvaluator` contract and inject either AI or deterministic evaluation.
- **Accepted:** `EvaluationService` receives an evaluator; `RuleBasedEvaluator` is the default and `AIEvaluator` is optional.
- **Rejected:** A larger plugin registry or service container.
- **Why:** Strategy is sufficient for one varying policy.
- **Final decision:** Keep composition explicit in `app.js`.

## 3. Persist before evaluation

- **Problem:** Model calls can fail after a learner has submitted.
- **Suggestion:** Save the submission and status before invoking the evaluator, then store a failed state on errors.
- **Accepted:** `SUBMITTED`, `EVALUATING`, and `FAILED` transitions plus retry.
- **Rejected:** A queue, distributed worker, or event bus.
- **Why:** Those are useful at scale but unnecessary for an assignment-sized monolith.
- **Final decision:** Use an asynchronous-style service flow in one process.

## 4. Make feedback evidence-first

- **Problem:** A total score alone does not teach the learner what to change.
- **Suggestion:** Every rubric item should include evidence, concern, suggestion, score, and confidence.
- **Accepted:** The same feedback shape is used by both evaluators and the UI.
- **Rejected:** Asking only “is this a good design?”
- **Why:** Multiple LLD designs can be valid and the product should explain reasoning gaps.
- **Final decision:** The score is secondary to criterion-level feedback.
