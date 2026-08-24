# Working Agreement

The normal workflow is:

**Product discussion -> requirements -> architecture discussion -> small agreed task -> Codex implementation -> tests -> review -> merge -> next iteration**

## Before implementation

Understand and make explicit:

- the problem being solved and why it matters;
- the intended user experience;
- relevant existing code and repository constraints;
- affected domain concepts and business rules;
- important architectural and security implications;
- acceptance criteria, assumptions, and out-of-scope behavior.

For significant changes, product and architecture discussion comes before code. Repository evidence should be preferred over assumptions, and missing behavior should not be invented.

## Implementation

- Work in small, reviewable changes with a clear scope.
- Add or update tests in proportion to behavior and risk.
- Do not mix unrelated refactoring into a product change.
- Avoid speculative abstractions and premature scalability work.
- Follow existing conventions unless changing them is an explicit part of the task.
- Keep dependencies and business rules explicit.
- Protect secrets, user data, compatibility, and deployability.
- Update `docs/development/current-focus.md` when the active focus materially changes; do not turn it into a historical log.

Do not silently make major architecture decisions. If implementation reveals a consequential choice that has not been agreed, stop and surface its context, options, and consequences for discussion. Record an ADR only after agreement.

## After implementation

Provide a concise handoff covering:

- files changed;
- tests added or updated;
- tests and other verification executed, including outcomes;
- assumptions made;
- known limitations or follow-up risks;
- architectural implications;
- the suggested next step.

Git history is the implementation history. Persistent docs should describe the current truth rather than duplicate a chronological activity log.
