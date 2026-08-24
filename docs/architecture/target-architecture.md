# Target Architecture Principles

This is a guardrail for upcoming discussions, not a large future-state blueprint. Technology and domain choices that have not been agreed remain explicitly pending.

## Guiding principles

1. **Product needs drive structure.** Introduce boundaries and abstractions in response to understood BookShare behavior, not as a framework exercise.
2. **Keep one deployable system by default.** A single application and database are appropriate until measured product or operational needs justify distribution. Microservices are not a current goal.
3. **Make the BookShare domain explicit.** Use clear language and boundaries for concepts such as catalog book/edition, owned copy, availability/listing, proposal, decision, and connection once their meanings are agreed.
4. **Keep business rules independently testable.** Important lifecycle, ownership, authorization, and state-transition rules should not depend directly on controllers, Angular components, EF Core, SignalR, or an external service.
5. **Use explicit dependency direction.** Product rules may depend on small contracts; infrastructure implements those contracts. Avoid service locators, hidden global state, and unnecessary indirection.
6. **Keep API and realtime boundaries thin.** HTTP controllers and hubs should authenticate, validate, invoke product behavior, and map results; they should not become the sole home of business rules.
7. **Modernize incrementally.** Establish behavioral tests, upgrade in understandable steps, and avoid mixing a product rewrite with every platform migration at once.
8. **Treat security and privacy as product requirements.** Keep secrets outside source control, authorize every boundary, minimize personal data, and make location/contact visibility deliberate.
9. **Preserve deployability.** Every increment should retain a repeatable build, migration path, configuration model, and rollback/recovery story proportional to the product stage.
10. **Observe before scaling.** Add useful logs, health signals, and product feedback before introducing caches, queues, multiple instances, or distributed components.
11. **Prefer stable, supported technology.** Upgrade deliberately to maintained platform versions, but choose exact targets only after compatibility and migration constraints are understood.
12. **Record consequential choices.** Use lightweight ADRs for decisions that constrain future work; do not create ADRs before discussion and agreement.

## Near-term architectural posture

The current single API plus SPA can remain the starting deployment shape while the first loop is defined. New BookShare behavior should be organized so its rules and vocabulary are easy to trace and test. Existing account, messaging, and infrastructure code should be retained, adapted, or removed based on product fit and verified migration cost—not assumed reusable merely because it exists.

## Decisions pending

- **Decision pending:** What “exchange” includes in the first milestone: swap, loan, donation, sale, or a limited subset.
- **Decision pending:** The domain boundaries and identities for a catalog work/edition, a user-owned copy, an availability listing, and an exchange proposal.
- **Decision pending:** The proposal state model, concurrency rules, expiry/cancellation behavior, and connection trigger.
- **Decision pending:** The minimum account/profile model and the privacy model for location and contact data.
- **Decision pending:** Whether messaging is available before acceptance and whether the existing SignalR implementation should be retained.
- **Decision pending:** The supported .NET and Angular targets and the safest order for platform modernization versus product slices.
- **Decision pending:** Whether PostgreSQL and Cloudinary remain the persistence and media choices after current needs and migration costs are reviewed.
- **Decision pending:** The deployment platform, configuration/secret store, migration execution strategy, and CI/CD baseline.
- **Decision pending:** The initial API contract and testing strategy for the core loop.
- **Decision pending:** Which legacy social, administration, sample, and sandbox capabilities have BookShare value.
