# Architecture Decision Records

Architecture Decision Records (ADRs) capture important choices that constrain future implementation. They should preserve the context and trade-offs behind an agreed decision without becoming lengthy design documents.

Create an ADR only after the decision has been discussed and its status is clear. Do not use ADRs to make speculative decisions by documentation alone.

Name records sequentially with a short descriptive slug:

```text
0001-some-decision.md
0002-another-decision.md
```

Use this lightweight structure:

```markdown
# Title

## Status

Proposed / Accepted / Superseded

## Context

## Decision

## Consequences
```

When a decision changes, prefer a new ADR that supersedes the old one so Git history and the decision chain remain understandable.
