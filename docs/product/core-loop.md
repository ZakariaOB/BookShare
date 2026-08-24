# First Product Core Loop

The first major milestone is:

**Create account -> Build library -> Make book available -> Discover book -> Propose exchange -> Accept/reject -> Connect**

Status describes capability found in the repository, not production readiness. In particular, an implemented capability may still have material security or modernization work recorded in [repository-analysis.md](../codex/repository-analysis.md).

## Repository coverage

| Step | User goal | Product-level meaning | Status | Repository evidence |
| --- | --- | --- | --- | --- |
| Create account | Join BookShare and return as an identified user. | Register, authenticate, and maintain the minimum identity/profile needed for the product. | **Implemented** | `API/Controllers/AccountController.cs` exposes registration and login through ASP.NET Core Identity and JWTs. `client/src/app/register/` and `client/src/app/_services/account.service.ts` provide registration, login, logout, and client session state. |
| Build library | Record the books the user owns or controls. | Add, view, edit, and remove owned book entries with enough metadata to distinguish books or editions. | **Not found** | `API/Entities/` and `DataContext` contain users, photos, likes, messages, presence groups, countries, and cities; there is no book, edition, owned-copy, or library model. No corresponding API or Angular feature was found. |
| Make book available | Tell other users which owned book can be exchanged. | Publish or change availability and any exchange conditions without losing the distinction between a book and a user's copy/listing. | **Not found** | No availability/listing state, endpoint, persistence model, or UI was found. |
| Discover book | Find an available book that may satisfy a need. | Browse or search available books and inspect the book, copy, owner, location, and relevant exchange conditions. | **Not found** | The existing member list searches people by age and gender (`UsersController`, `member-list`); it does not search books. Branding strings are the only book-related product text found in application source. |
| Propose exchange | Make a concrete offer or request to the owner. | Create a proposal with defined participants, subject, terms, state, and ownership. | **Not found** | User likes and direct messages exist, but neither records a book exchange proposal or a proposal lifecycle. There is no proposal entity, endpoint, or UI. |
| Accept/reject | Decide whether a received proposal should proceed. | Let the correct owner accept or reject a pending proposal through explicit, authorized state transitions. | **Not found** | No exchange decision or state machine was found. Admin photo approval/rejection is unrelated moderation behavior. |
| Connect | Communicate or reveal agreed contact details after a decision. | Give participants a safe way to coordinate fulfilment, with a clear rule for when communication becomes available. | **Partially implemented** | Authenticated-user direct messaging, inbox/outbox views, read state, and online presence exist through `MessagesController`, SignalR hubs, and Angular messaging services/components. They are not linked to an exchange or gated by acceptance. |

Current coverage is therefore **one implemented step, one partially implemented step, and five steps not found**. There is no end-to-end BookShare product loop yet.

## Open questions by step

### Create account

- Is username/password sufficient, or are verified email, password recovery, and account lifecycle required for the first release?
- Which legacy profile fields are actually needed? Registration currently assumes gender, date of birth, an 18+ rule, country, and city.
- What location precision and privacy are appropriate for book discovery and exchange?

### Build library

- Is a library entry a work, an edition, a physical copy, or a combination of catalog metadata and a user-owned copy?
- Which metadata is required initially, and will it be entered manually or resolved from ISBN/a catalog service?
- Can a user own multiple copies or copies in different conditions?

### Make book available

- Does “exchange” mean swap, loan, donation, sale, or a deliberately limited subset?
- Which availability states and conditions are needed, and what makes a listing stop being discoverable?

### Discover book

- Which search and filters are essential for the first useful experience?
- How should location, distance, privacy, and unavailable or reserved copies affect results?

### Propose exchange

- What must a proposal contain: requested book, offered book, message, method, place, and/or expiry?
- Can a book have multiple pending proposals, and can either party cancel?

### Accept/reject

- What are the allowed proposal states and transitions, and how are competing proposals handled atomically?
- What should each party see after acceptance, rejection, cancellation, or expiry?

### Connect

- Is in-app messaging available before acceptance, after acceptance, or both with different limits?
- What contact or meetup information may be revealed, and what blocking, reporting, and safety controls are required?
