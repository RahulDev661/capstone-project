# Project Rules

1. All forms must use the project's existing form and validation patterns.
   Do not introduce a new form library for a single feature.

2. Every form input must have an associated label and accessible validation
   message. Validation errors must not rely only on color.

3. New form features must include tests covering valid submission,
   required-field failures, and invalid input/edge cases.

4. Before modifying unrelated components, inspect the existing project
   structure and reuse established components and styles.

5. After implementing a feature, run the relevant tests and verify the
   application builds successfully before considering the task complete.