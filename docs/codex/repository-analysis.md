# Repository Analysis

## Scope and evidence

This analysis describes `ZakariaOB/BookShare` at `master` commit `9abaa2588b0c23b6c25eac181069a007d79278d1` (latest commit dated 2021-03-24), inspected on 2026-08-24. Claims come from tracked source and configuration. Secret values were intentionally not reproduced.

Labels used below:

- **Fact** — directly verified in the repository (or, where linked, in the technology owner's support policy).
- **Interpretation** — what the verified structure appears to imply.
- **Recommendation** — a proposed subject for future agreement or work, not a decision made by this analysis.

## Repository structure

| Area | Verified contents and relationship |
| --- | --- |
| Solution | `BookShareApp.sln` contains one backend project, `API/API.csproj`. The solution name retains the older “BookShareApp” name, but this repository is `BookShare`. |
| Backend | `API` is an ASP.NET Core web project. `Controllers` defines HTTP boundaries; `SiganlR` contains two hubs and presence tracking; `DTOs`, `Entities`, `Interfaces`, `Services`, `Middleware`, `Helpers`, and `Extensions` support the API; `Data` contains EF Core context, repositories, unit of work, seeds, and migrations. |
| Frontend | `client` is one Angular application. `src/app` contains components, routing, guards, interceptors, models, services, administration, and a sizeable sandbox. The Angular production build outputs to `API/wwwroot`. |
| Tests | No .NET test project or backend tests were found. Eight Angular unit spec files and one Protractor end-to-end spec are tracked. Most assertions are generated component-creation checks; the app/e2e title expectations do not match the current application title. |
| Persistence | `API/Data/DataContext.cs` derives from `IdentityDbContext` and exposes users/roles plus likes, messages, photos, SignalR groups/connections, countries, and cities. Nine EF migration files (four migrations plus snapshot/designer files) are tracked. |
| Configuration | Development API configuration is in `API/appsettings.Development.json`; production database configuration is read from `DATABASE_URL`. Angular has development and production environment files. `.vscode` includes .NET build, publish, watch, launch, and attach configuration. |
| Static/deployment output | A compiled Angular bundle is committed under `API/wwwroot` and served by the backend. No Dockerfile, Compose file, CI workflow, infrastructure-as-code, or deployment manifest was found. Runtime code assumes a Heroku-style production database URL. |
| Sensitive files | `API/appsettings.Development.json` and `Creds.txt` are tracked and contain credential material. `client/user.token` is tracked but currently empty. Details are recorded under Security without values. |

### Project relationships

**Fact.** The Angular build target is `../API/wwwroot`, and ASP.NET Core serves default/static files with an SPA fallback. At runtime, Angular services call relative `api/` and `hubs/` paths in production. The API uses PostgreSQL for Identity and application data and Cloudinary for photos.

**Interpretation.** Source is split into frontend and backend projects, but production is intended to be one deployable web process plus external PostgreSQL and Cloudinary services.

## Technology stack

| Concern | Verified technology/version |
| --- | --- |
| Backend runtime | .NET 5 target (`net5.0`) |
| Web/API framework | ASP.NET Core controller-based Web API using the pre-.NET-6 `Program` + `Startup` hosting model |
| Realtime | ASP.NET Core SignalR server; `@microsoft/signalr` `^3.1.8` client |
| Persistence/ORM | Entity Framework Core; design and SQL Server packages are `5.0.0-preview.8`, Npgsql EF Core provider is `5.0.1`; configured runtime provider is Npgsql/PostgreSQL |
| Authentication/authorization | ASP.NET Core Identity EF package `5.0.0-preview.8`; JWT Bearer `5.0.0`; role policies for Member/Admin/Moderator behavior |
| API style | Attribute-routed JSON controllers under `api/[controller]`, plus SignalR hubs under `hubs/*`; Swagger generator `5.5.1` is registered but no Swagger middleware/UI is mapped |
| Mapping | AutoMapper dependency-injection package `8.1.0` |
| Photo service | CloudinaryDotNet `1.14.0` |
| Frontend | Angular core/CLI `~10.2.0`, TypeScript `~4.0.2`, RxJS `~6.6.0`, Zone.js `~0.10.2` |
| UI libraries | Bootstrap `4.1.1`, Bootswatch `^4.5.3`, Font Awesome `^4.7.0`, ngx-bootstrap `^6.2.0`, and several Angular 10-era UI packages |
| Frontend tests | Jasmine `~3.6.0` with Karma `~5.0.0`; Protractor `~7.0.0` for end-to-end tests; TSLint `~6.1.0`/Codelyzer `^6.0.0` for linting |
| Backend tests | None found |
| Database | PostgreSQL in both configured code paths; a SQL Server EF provider is referenced but not selected in application configuration |
| Containerization | None found |
| CI/CD | None found |

**Fact.** .NET 5 reached end of support on 2022-05-10 according to the [.NET support policy](https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core). Angular's current support page states versions 2 through 19 are unsupported, which includes Angular 10 ([Angular releases](https://angular.dev/reference/releases)). The Angular team ended Protractor development and set its end of life in 2023 ([Angular Protractor RFC](https://github.com/angular/protractor/issues/5502)); the TSLint repository is archived and identifies TSLint as deprecated ([TSLint](https://github.com/palantir/tslint)).

## Existing architecture

### Facts

- The system is a single ASP.NET Core backend project and one Angular SPA, deployed together from the API's web root.
- Controllers and SignalR hubs are the application boundaries. Controllers use attribute routing and DTOs; hubs handle presence and live message behavior.
- Controllers generally depend on `IUnitOfWork`, Identity managers, AutoMapper, and photo/token services. `UnitOfWork` constructs concrete repositories over a shared scoped `DataContext`.
- Domain/business behavior is spread across controllers (registration, likes, photo rules), hubs (messaging/read state), repositories (query/filter behavior), Identity calls, and Angular components/services. There is no separate domain or application project.
- `AppUser` inherits ASP.NET Core Identity's user type. Other entities use EF navigation properties and configuration, so the model is coupled to Identity and persistence.
- EF Core/Npgsql stores Identity, profile, like, message, photo, country/city, and SignalR group/connection data in one PostgreSQL database.
- `PhotoService` integrates directly with Cloudinary. `PresenceTracker` is singleton, process-local memory.
- Cross-cutting code includes JWT authentication, role policies, CORS, exception middleware, AutoMapper, pagination headers, and an action filter that updates `LastActive`.
- `Program` applies migrations and seeds users/roles/countries during process startup. It logs a migration/seed failure and continues to run.

The primary dependency flow is:

```text
Angular SPA -> REST controllers / SignalR hubs
            -> Unit of Work / Identity / API services
            -> repositories / EF Core DataContext
            -> PostgreSQL

Photo service -> Cloudinary
Presence hub -> in-memory PresenceTracker
```

### Interpretation

- The repository is a layered, single-deployable monolith derived from a social/dating application shape. Folder-level interfaces provide some seams, but business boundaries are not represented as independently testable BookShare modules.
- Existing account, profile, messaging, presence, photo, and administration capabilities may be reusable, but the current model and user experience are not yet aligned to the BookShare core domain.
- Process-local presence works for one application instance; multiple instances would need a deliberate scale-out design. There is no current evidence that multiple instances are required.

## Existing product capabilities

| Capability | Status | Evidence-based assessment |
| --- | --- | --- |
| Account registration/login | Implemented | Identity-backed registration/login, JWT creation, Angular forms and session state exist. Security defects prevent calling it production-ready. |
| Profile | Implemented for legacy experience | Users can edit biography-style data, city, and photos; photo moderation and roles exist. Several fields and labels are dating-oriented. |
| People discovery | Implemented for legacy experience | Paginated member discovery filters by age and gender and orders by activity/creation. This is not book discovery. |
| Likes | Implemented for legacy experience | Users can like other users and browse outgoing/incoming likes. This is not an exchange proposal or decision. |
| Messaging/presence | Implemented independently | Users can message one another directly, view inbox/outbox/unread messages, see read state, and see online presence. It is not tied to an accepted exchange. |
| Library | Not found | No book, edition, copy, or library model/API/UI exists. |
| Availability/listing | Not found | No book availability concept exists. |
| Book discovery | Not found | No searchable book inventory exists. |
| Exchange proposal | Not found | No proposal record, terms, state, or endpoint exists. |
| Accept/reject | Not found | No exchange decision workflow exists. Photo moderation is unrelated. |
| Connection after decision | Partially implemented | Messaging could support coordination, but no exchange-triggered authorization or experience exists. |

The core-loop result is **1 implemented, 1 partially implemented, and 5 not found**; no complete BookShare loop is currently possible.

## Technical debt and maintainability

| Observation | Classification and implication | Future recommendation |
| --- | --- | --- |
| Backend targets .NET 5; Angular is 10.2; the last commit is from 2021. | **Fact:** both primary frameworks are out of support. **Interpretation:** security fixes, modern tooling, hosting compatibility, and dependency installation will become increasingly difficult. | **Recommendation:** agree on an incremental, test-backed modernization sequence before broad product implementation; do not combine it with an unbounded rewrite. |
| Identity and EF design/SQL Server references use preview `5.0.0-preview.8` packages while other .NET packages are stable 5.0.x; Npgsql is the actual provider. | **Fact:** dependency versions and provider references are inconsistent. **Interpretation:** the unused SQL Server reference and preview packages increase restore, compatibility, and upgrade uncertainty. | **Recommendation:** inventory runtime use, remove only verified-unused packages, and move to mutually supported stable versions as part of modernization. |
| There is no backend test project; frontend coverage is mostly generated creation tests; the current app/e2e title assertions are stale. | **Fact:** no meaningful automated coverage of registration, authorization, persistence, messaging, or a product journey was found. | **Recommendation:** establish a small characterization and integration test baseline before migration, then add business-rule and browser coverage with each core-loop slice. |
| No book or exchange domain types exist, while dating-oriented copy, gender/age matching, likes, sandbox components, and sample error endpoints remain deployable. | **Fact:** branding and code behavior diverge. **Interpretation:** building directly on legacy names/flows risks encoding the wrong domain. | **Recommendation:** agree on the product vocabulary and deliberately retain, adapt, isolate, or remove legacy behavior in small changes. |
| The Angular production bundle is committed under `API/wwwroot`. | **Fact:** generated output and source coexist in Git. **Interpretation:** source and deployed bundle can drift and create noisy reviews. | **Recommendation:** decide whether deployment should build the SPA reproducibly; only then change artifact tracking. |
| Database URL parsing uses manual string splitting; migrations/seeding run on every startup, and startup continues after failure. | **Fact:** configuration format errors can cause brittle startup, while failed schema initialization does not stop serving. | **Recommendation:** define validated configuration and an explicit migration/deployment policy for the chosen host. |
| `UnitOfWork` constructs new repository objects on property access, while `UserRepository.Update` calls synchronous `SaveChanges` inside the repository. | **Fact:** transaction/save boundaries are inconsistent with the unit-of-work abstraction and async controller flow. | **Recommendation:** clarify persistence ownership when affected product behavior is implemented; avoid a repository-wide rewrite in isolation. |
| Swagger services are registered without Swagger middleware; sample `WeatherForecast`/`Buggy` endpoints and a large admin-only sandbox are present. | **Fact:** diagnostic/sample code and incomplete API documentation configuration remain in the application. | **Recommendation:** decide which development surfaces are intentionally retained and ensure they cannot leak into a real deployment unintentionally. |
| No repository-defined CI/CD, health checks, metrics, tracing, container, or infrastructure configuration was found. | **Fact:** build/deploy and operational behavior cannot be reproduced from the repository alone. | **Recommendation:** define the smallest deployment and observability baseline after the hosting decision. |

## Security concerns

### Credential material

| Secret type | Location | Verified condition | Remediation recommendation |
| --- | --- | --- | --- |
| Development database connection credentials | `API/appsettings.Development.json` | The ignored file is nevertheless tracked and contains a populated connection string. | Treat the credential as exposed, rotate it, move local values to .NET Secret Manager or another untracked local mechanism, and use a managed secret store in deployment. Coordinate any history rewrite; deleting the current file alone does not remove history. |
| JWT signing secret | `API/appsettings.Development.json` | A populated signing key is tracked. | Rotate the key, invalidate affected tokens as appropriate, and load it from a secret provider. Do not reproduce it in docs or sample configuration. |
| Hosting/database credential material | `Creds.txt` | The tracked plaintext file contains hosting/database identity and password material. | Rotate every credential represented, remove the file from the tracked tree, replace it with non-sensitive setup instructions if needed, and assess Git-history cleanup. |
| Client token placeholder | `client/user.token` | The file is tracked but is currently zero bytes. | Remove it from version control and ignore future local token files so a real token is not committed later. |

### Application security behavior

- **Fact:** `AccountController.Login` contains a hard-coded universal test-password bypass. **Recommendation:** treat this as a release blocker; remove it and rotate/expire credentials or tokens affected by any accessible deployment.
- **Fact:** `ExceptionMiddleware` returns exception messages and stack traces in every environment and writes an extra text fragment before the JSON body. **Recommendation:** return a stable problem response, expose details only in development, and keep full details in protected logs.
- **Fact:** `PresenceHub` has `[Authorize]`, but `MessageHub` does not declare authorization even though it accesses user-specific threads. **Recommendation:** explicitly authorize the message hub and test unauthenticated and cross-user access.
- **Fact:** JWT validation disables issuer and audience validation; tokens last seven days; the Angular client stores the token in `localStorage`. **Interpretation:** token theft or signing-key compromise has a broad window, and intended issuers/audiences are not constrained. **Recommendation:** choose and test an authentication/session policy appropriate to the product threat model.
- **Fact:** production PostgreSQL configuration requires TLS while also enabling `TrustServerCertificate`. **Interpretation:** certificate verification is relaxed. **Recommendation:** verify the selected provider/version and hosting certificate model, then require proper certificate validation where supported.
- **Fact:** public sample error endpoints deliberately trigger failures that the current exception middleware exposes. **Recommendation:** remove or strictly development-gate them before a user-facing deployment.

## What was not verified

- No claim is made that the application currently builds, its historical Heroku deployment still exists, or any external database/Cloudinary account is active.
- Dependencies were not installed and production code was not executed for this documentation task.
- No CI or external infrastructure was available to inspect beyond tracked repository files.
- Secret values and credential contents were intentionally omitted.

## Recommended next discussion

Discuss two coupled questions before choosing an implementation task:

1. Define the smallest real exchange: exchange mode, book/copy model, proposal contents and states, discovery/location rules, and when users may connect.
2. Decide the safety boundary for beginning product work: which critical security issues and minimum characterization tests must be addressed first, and whether platform modernization starts before or alongside the first thin BookShare slice.

That discussion should end with explicit acceptance criteria and, if it creates a consequential architectural choice, an agreed ADR—not with a wholesale architecture redesign.
