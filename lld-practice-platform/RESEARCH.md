# Research Note

## Learner problem

LLD practice is often performed through unstructured prompts, whiteboards, or interview simulators. Those formats are useful for conversation, but they make it hard for an individual learner to compare attempts, see whether they addressed boundaries and failure modes, or receive feedback that is more actionable than a single “good/bad” judgement.

## Existing approaches

**Pattern and principle references.** Refactoring.Guru presents design patterns as reusable solutions to recurring design problems and groups them by intent. Its catalog is useful as a vocabulary and reference, but it is a reference library rather than a practice loop. It also explicitly discusses criticism of patterns, which supports avoiding pattern-counting in feedback.

Source: [Refactoring.Guru Design Patterns](https://refactoring.guru/design-patterns)

**Class-diagram notation.** UML class diagrams are a compact way to describe classes, attributes, operations, and relationships. They are a natural future submission format because they make structural reasoning visible. They also introduce editor/rendering complexity that is not essential to proving the MVP journey.

Source: [UML class diagrams overview](https://www.uml-diagrams.org/class-diagrams-overview.html)

**Design communication modes.** Martin Fowler describes UML as being used in different modes, including sketches, blueprints, and programming-language-like precision. That distinction is useful here: a future diagram submission can be a sketch-like communication artifact without forcing the MVP to become a full UML authoring environment.

Source: [Martin Fowler, UML Mode](https://martinfowler.com/bliki/UmlMode.html)

## Strengths and gaps

Existing references are strong at teaching vocabulary, examples, and patterns. Interview platforms are strong at discoverability and repetition. The gap is a focused, low-friction loop for writing a complete design and receiving feedback tied to the learner’s own evidence. A pure AI chat can be flexible, but it may drift from the rubric, invent details, or give inconsistent scoring. A pure checklist is predictable, but cannot explain nuanced trade-offs.

## Product direction

Blueprint Lab combines a small structured submission with a fixed nine-dimension rubric. The first implementation uses deterministic checks so it is dependable offline and demonstrates evaluator extensibility. OpenAI is an optional strategy behind the same contract. Structured text was selected first because it provides enough evidence of LLD reasoning while keeping the MVP focused; diagram and code submissions can be added later without changing the core Attempt/Evaluation domain.
