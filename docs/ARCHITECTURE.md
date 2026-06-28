# Architecture Guide

## Layer Responsibilities

### `src/app/`

Application shell and cross-cutting infrastructure.

| Folder          | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| `navigation/`   | React Navigation stacks, tabs, deep linking                        |
| `providers/`    | React context providers (Theme, Redux, Error Boundary)             |
| `config/`       | Environment configuration via react-native-config                  |
| `constants/`    | App-wide constants (API endpoints, storage keys, navigation names) |
| `hooks/`        | App-level hooks                                                    |
| `services/`     | Network, security, and platform services                           |
| `storage/`      | MMKV storage and secure storage wrappers                           |
| `localization/` | i18next setup and locale files                                     |
| `permissions/`  | react-native-permissions wrapper                                   |
| `featureFlags/` | Feature flag service (Remote Config ready)                         |
| `analytics/`    | Analytics adapter (Firebase/Mixpanel/Amplitude ready)              |
| `logger/`       | Structured logging (dev console, prod remote)                      |
| `theme/`        | Design system tokens (colors, typography, spacing, etc.)           |

### `src/assets/`

Static assets only — no business logic.

| Folder        | Purpose             |
| ------------- | ------------------- |
| `fonts/`      | Custom font files   |
| `icons/`      | PNG/SVG icon assets |
| `images/`     | Image assets        |
| `svg/`        | SVG components      |
| `animations/` | Animation assets    |
| `lottie/`     | Lottie JSON files   |

### `src/components/`

Atomic Design component library — presentation only.

| Layer        | Examples                                 |
| ------------ | ---------------------------------------- |
| `atoms/`     | Button, Text, Input, Icon, Loader        |
| `molecules/` | SearchBar, Card, InputField, OTPInput    |
| `organisms/` | HomeHeader, SettingsSection, ProductList |
| `templates/` | AuthTemplate, HomeTemplate, MainTemplate |

### `src/features/`

Self-contained feature modules. Each feature contains:

```
feature/
├── screens/       # UI only — no business logic
├── viewmodels/    # MVVM hooks — orchestrate use cases
├── usecases/      # Business logic
├── repository/    # Repository implementation
├── dto/           # API data transfer objects
├── mapper/        # DTO ↔ Entity mapping
├── models/        # Feature-specific models
├── types/         # Feature-specific types
├── constants/     # Feature constants
├── utils/         # Feature utilities
├── tests/         # Feature unit tests
└── index.ts       # Public API barrel export
```

### `src/domain/`

Core business domain — framework-agnostic.

| Folder          | Purpose                                 |
| --------------- | --------------------------------------- |
| `entities/`     | Domain entities (User, Session)         |
| `repositories/` | Repository interfaces (IAuthRepository) |
| `usecases/`     | Shared domain use cases                 |

### `src/data/`

Data layer implementations.

| Folder        | Purpose                                   |
| ------------- | ----------------------------------------- |
| `api/`        | Axios client, interceptors, token refresh |
| `repository/` | Shared repository implementations         |
| `database/`   | Local database adapters                   |
| `mapper/`     | Shared mappers                            |

### `src/shared/`

Cross-feature utilities.

| Folder         | Purpose                      |
| -------------- | ---------------------------- |
| `api/`         | Shared API utilities         |
| `helpers/`     | Error handling, formatters   |
| `utils/`       | Generic utilities            |
| `hooks/`       | Shared hooks (useResponsive) |
| `constants/`   | Shared constants             |
| `enums/`       | Shared enums                 |
| `interfaces/`  | Shared interfaces            |
| `validations/` | Yup schemas                  |
| `types/`       | Shared TypeScript types      |

### `src/store/`

Redux state management.

| Folder        | Purpose                          |
| ------------- | -------------------------------- |
| `redux/`      | Store configuration, typed hooks |
| `slices/`     | Redux Toolkit slices             |
| `middleware/` | Custom middleware                |
| `selectors/`  | Memoized selectors               |

### `src/tests/`

Global test infrastructure.

| Folder         | Purpose           |
| -------------- | ----------------- |
| `unit/`        | Unit tests        |
| `integration/` | Integration tests |
| `mocks/`       | Shared mocks      |
| `setup/`       | Jest setup files  |

## Dependency Injection

Repository interfaces in `domain/` allow swapping implementations:

```typescript
// ViewModel receives interface, not implementation
const loginUseCase = new LoginUseCase(authRepository);
```

For larger apps, introduce a DI container (InversifyJS, tsyringe).

## Code Splitting Ready

Features export via `index.ts` barrel files. Lazy loading:

```typescript
const HomeScreen = React.lazy(() => import('@features/home'));
```
