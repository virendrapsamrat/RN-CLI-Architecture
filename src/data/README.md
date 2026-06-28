# data/

Data layer implementations — handles all external data communication (API calls, local databases, caching).

## Why This Folder Exists

The data layer implements the repository interfaces defined in `domain/`. It is the only layer that knows _how_ to fetch, store, and transform data. This separation allows swapping data sources (e.g., mock API → real API, SQLite → Realm) without touching business logic.

## Structure

| Folder        | Purpose                                                          |
| ------------- | ---------------------------------------------------------------- |
| `api/`        | Axios client setup, interceptors, token refresh, retry logic     |
| `repository/` | Shared repository implementations (implements domain interfaces) |
| `database/`   | Local database adapters (SQLite, WatermelonDB, etc.)             |
| `mapper/`     | Shared data mappers (API response → domain entity)               |

## Key Design Decisions

- **Axios + axios-retry** — centralized HTTP client with automatic retry for transient failures.
- **Interceptors** — request interceptors attach auth tokens; response interceptors handle 401 token refresh.
- **Mapper pattern** — raw API responses (DTOs) are mapped to clean domain entities before reaching the business layer.
