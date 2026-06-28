# shared/

Cross-feature utilities, helpers, hooks, and type definitions. This folder contains code that is used by **multiple features** but doesn't belong in the domain layer.

## Why This Folder Exists

Instead of duplicating utility functions, validation schemas, or type definitions across features, they are centralized here. This promotes DRY principles and consistent behavior.

## Structure

| Folder         | Purpose                                                     |
| -------------- | ----------------------------------------------------------- |
| `api/`         | Shared API utilities (response helpers, error parsing)      |
| `constants/`   | Shared constants used across features                       |
| `enums/`       | Shared enumerations (status codes, roles, etc.)             |
| `helpers/`     | Error handling, formatters, and utility functions           |
| `hooks/`       | Shared custom hooks (e.g., `useResponsive`, `useDebounce`)  |
| `interfaces/`  | Shared TypeScript interfaces                                |
| `types/`       | Shared TypeScript type definitions                          |
| `utils/`       | Generic utility functions (date formatting, string helpers) |
| `validations/` | Yup validation schemas shared across features               |

## Key Design Decisions

- **Feature-agnostic** — nothing in `shared/` should import from a specific feature.
- **Validation schemas** — Yup schemas are centralized so forms across features use consistent validation rules.
- **Error handling** — `helpers/errorHandler.ts` provides a unified `mapAxiosError()` function used by all ViewModels.
