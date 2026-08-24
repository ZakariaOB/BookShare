# Product Backlog

This backlog is organized around product outcomes, not dates. Priorities mean:

- **Now**: needed to make the next product or architecture decisions safely.
- **Next**: needed to complete the first BookShare loop after those decisions.
- **Later**: valuable after the loop is coherent and usable.

## Account

### Define the minimum BookShare identity — Now

- **Goal:** Decide the registration, login, recovery, profile, location, and privacy experience required for the first release.
- **Current state:** Registration and JWT login exist, but the UI and data model retain dating-oriented fields and rules.
- **Dependencies:** Product audience, discovery radius, safety expectations, and security remediation.
- **Why it matters:** Every later step needs a trustworthy user identity without collecting irrelevant personal data.

### Make the account foundation safe and supportable — Now

- **Goal:** Preserve useful account behavior while removing known credential, authentication, and error-disclosure risks.
- **Current state:** Functional but not production-ready; see `docs/codex/repository-analysis.md`.
- **Dependencies:** Identity decision and modernization approach.
- **Why it matters:** The product should not invite users onto an unsafe foundation.

## Library

### Define book, edition, and owned-copy concepts — Now

- **Goal:** Agree on the smallest domain model that represents a user's real library accurately.
- **Current state:** No book or library model exists.
- **Dependencies:** Metadata-entry approach and the meaning of exchange.
- **Why it matters:** Availability, discovery, and proposals all depend on these distinctions.

### Let a user manage a personal library — Next

- **Goal:** Add, view, edit, and remove owned books or copies.
- **Current state:** Not implemented.
- **Dependencies:** Agreed library model, account identity, and acceptance criteria.
- **Why it matters:** A real inventory is the input to the rest of the core loop.

## Book availability

### Define and manage availability — Next

- **Goal:** Let an owner explicitly make a copy available or unavailable under clear conditions.
- **Current state:** No listing or availability state exists.
- **Dependencies:** Library model and exchange modes.
- **Why it matters:** Discovery must show actionable offers rather than every book a user owns.

## Discovery

### Find and inspect available books — Next

- **Goal:** Let a user browse or search useful, available results and understand the book, copy, owner, location, and terms.
- **Current state:** Only discovery of member profiles by age and gender exists.
- **Dependencies:** Availability, metadata, location/privacy policy, and first-release search criteria.
- **Why it matters:** Users cannot enter an exchange unless they can find a relevant book.

## Exchange proposal

### Define the proposal contract and lifecycle — Now

- **Goal:** Agree what is proposed, by whom, to whom, with which terms, and through which states.
- **Current state:** Likes and messages exist, but no exchange proposal exists.
- **Dependencies:** Exchange meaning, library model, availability rules, and cancellation/expiry expectations.
- **Why it matters:** A proposal is the central business transaction, not merely a message.

### Submit and manage proposals — Next

- **Goal:** Let a user make a proposal and let both parties see its current state.
- **Current state:** Not implemented.
- **Dependencies:** Agreed proposal model and authorized state transitions.
- **Why it matters:** It turns discovery into an intentional exchange request.

## Exchange decision

### Accept or reject safely — Next

- **Goal:** Let the owner make one clear, authorized decision while handling cancellation, expiry, and competing proposals consistently.
- **Current state:** Not implemented.
- **Dependencies:** Proposal lifecycle and availability/reservation rules.
- **Why it matters:** Both parties need a trustworthy outcome before coordinating.

## Connection

### Define the post-decision connection experience — Now

- **Goal:** Decide when messaging is allowed and what information or safety controls become available after acceptance.
- **Current state:** Direct messaging and online presence exist independently of exchanges.
- **Dependencies:** Proposal states, privacy policy, blocking/reporting needs, and whether the legacy messaging implementation is retained.
- **Why it matters:** “Connect” must be safe and tied to product intent.

### Connect accepted participants — Next

- **Goal:** Give both parties the agreed coordination channel after acceptance.
- **Current state:** Partially supported by existing messaging, but not integrated with exchange decisions.
- **Dependencies:** Connection policy and a secured, tested communication boundary.
- **Why it matters:** This completes the first product loop.

## Platform/modernization

### Establish a safe modernization path — Now

- **Goal:** Decide how to move the unsupported backend and frontend stacks to supported versions without a speculative rewrite.
- **Current state:** .NET 5 and Angular 10 are out of support; some backend packages are preview builds.
- **Dependencies:** A reproducible build, representative tests, and a decision about how much legacy social functionality remains useful.
- **Why it matters:** Unsupported foundations increase security, compatibility, and delivery risk.

### Create a core-loop test safety net — Next

- **Goal:** Cover important business rules, API/auth integration, and the first browser journey at appropriate layers.
- **Current state:** No backend test project; frontend tests are sparse and mostly generated, and the existing end-to-end expectation is stale.
- **Dependencies:** Agreed domain behavior and a supported test toolchain.
- **Why it matters:** Incremental modernization and product work need fast regression feedback.

### Remove or isolate legacy sample behavior — Next

- **Goal:** Keep only reusable account, profile, messaging, administration, and sandbox behavior that serves BookShare.
- **Current state:** Dating-oriented copy, filters, likes, sample error endpoints, and a large sandbox remain in the deployable application.
- **Dependencies:** Product decisions and a verified dependency map.
- **Why it matters:** Reducing ambiguity makes future changes safer without requiring a wholesale rewrite.

## Deployment/observability

### Define a repeatable deployment baseline — Next

- **Goal:** Make build, configuration, database migration, secret injection, and deployment behavior explicit and reproducible.
- **Current state:** The code assumes Heroku-style database configuration in production, but no CI/CD, container, infrastructure-as-code, or deployment manifest was found.
- **Dependencies:** Modernization target, hosting decision, and secret rotation.
- **Why it matters:** The team needs to deploy small increments consistently in order to observe and learn.

### Observe product and service health — Later

- **Goal:** Add privacy-conscious structured logs, health/readiness checks, error monitoring, and a small set of core-loop product signals.
- **Current state:** Basic framework logging exists; no health checks, metrics, tracing, or repository-defined monitoring was found.
- **Dependencies:** Deployment environment, privacy policy, and defined success measures.
- **Why it matters:** The product loop depends on observing reliability and real user behavior after deployment.
