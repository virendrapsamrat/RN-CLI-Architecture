# RN-CLI-App

Enterprise-grade React Native CLI application built with **Clean Architecture**, **MVVM**, **Atomic Design**, and **Feature-Based Modular Architecture**.

## Tech Stack

| Category   | Technology                          |
| ---------- | ----------------------------------- |
| Framework  | React Native 0.86 (CLI)             |
| Language   | TypeScript (strict)                 |
| Navigation | React Navigation v7                 |
| State      | Redux Toolkit + Redux Persist       |
| Networking | Axios + axios-retry                 |
| Storage    | react-native-mmkv                   |
| Forms      | React Hook Form + Yup               |
| i18n       | react-i18next (EN / ES)             |
| Testing    | Jest + React Native Testing Library |

## Architecture Flow

```
UI (Screens/Components)
        ↓
ViewModel (Hooks)
        ↓
UseCase (Business Logic)
        ↓
Repository Interface (Domain)
        ↓
Repository Implementation (Data/Feature)
        ↓
API / Local Database
```

**Rule:** UI layer must NEVER contain business logic.

## Project Structure

```
src/
├── app/           # Application shell: navigation, providers, theme, config, services
├── assets/        # Static assets: fonts, icons, images, SVG, Lottie
├── components/    # Atomic Design: atoms → molecules → organisms → templates
├── features/      # Feature modules (home, about, settings, auth)
├── domain/        # Core entities, repository interfaces, shared use cases
├── data/          # API client, repository implementations, mappers
├── shared/        # Cross-cutting utilities, hooks, validations, types
├── store/         # Redux store, slices, selectors, middleware
└── tests/         # Unit, integration tests, mocks, setup
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed folder explanations.

## Prerequisites

- Node.js >= 22.11
- Yarn 1.x
- Xcode 15+ (iOS)
- Android Studio + JDK 17 (Android)
- CocoaPods (iOS)

## Installation

```bash
cd RN-CLI-App
yarn install

# iOS
cd ios && pod install && cd ..
```

## Environment Configuration

| File               | Environment |
| ------------------ | ----------- |
| `.env.development` | Development |
| `.env.qa`          | QA          |
| `.env.staging`     | Staging     |
| `.env.production`  | Production  |

## Run

```bash
# Development
yarn start
yarn android:dev
yarn ios:dev

# QA / Staging / Production
yarn android:qa
yarn ios:staging
yarn android:prod
```

## Default Login Credentials

The login screen is pre-filled with default credentials for quick testing:

| Field    | Value           |
| -------- | --------------- |
| Email    | `user@cpkc.com` |
| Password | `Password@123`  |

Simply tap the **Login** button to navigate to the home page.

## Scripts

| Script               | Description                       |
| -------------------- | --------------------------------- |
| `yarn lint`          | ESLint check                      |
| `yarn typecheck`     | TypeScript strict check           |
| `yarn test`          | Jest unit tests                   |
| `yarn test:coverage` | Tests with 80% coverage threshold |
| `yarn format`        | Prettier format                   |

## Git Branch Strategy

| Branch      | Purpose             |
| ----------- | ------------------- |
| `main`      | Production releases |
| `develop`   | Integration branch  |
| `feature/*` | New features        |
| `release/*` | Release candidates  |
| `hotfix/*`  | Production hotfixes |

## Commit Convention

Uses [Conventional Commits](https://www.conventionalcommits.org/):

`feat`, `fix`, `refactor`, `docs`, `test`, `style`, `perf`, `build`, `ci`, `chore`

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):

- Lint
- Type Check
- Unit Tests (80% coverage)
- Android Build
- iOS Build

Fastlane lanes prepared for Firebase App Distribution.

## Security

- Secure token storage (MMKV + Keychain-ready)
- SSL/Certificate pinning architecture
- Jailbreak/Root detection ready
- Screenshot prevention for sensitive screens
- Session timeout handling

## Production Checklist

See [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md)

## License

Private — Enterprise use only.
