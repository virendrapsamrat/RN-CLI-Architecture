# features/

Self-contained, **feature-based modules** following **Clean Architecture + MVVM** pattern. Each feature is an isolated vertical slice of the application.

## Why This Folder Exists

Feature-based modularization ensures each business domain (auth, home, settings, about) is self-contained. Features can be developed, tested, and maintained independently without cross-contamination.

## Current Features

| Feature     | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| `auth/`     | Login, signup, forgot password, OTP verification, biometric login |
| `home/`     | Home dashboard screen                                             |
| `settings/` | Theme toggle, language switch, biometric toggle, logout           |
| `about/`    | About / information screen                                        |

## Feature Internal Structure

Each feature follows a consistent internal layout:

```
feature/
├── screens/       # UI screens — no business logic
├── viewmodels/    # MVVM hooks — orchestrate use cases, manage UI state
├── usecases/      # Business logic — single responsibility
├── repository/    # Repository implementation (data access)
├── dto/           # API data transfer objects
├── mapper/        # DTO ↔ Entity mapping
├── models/        # Feature-specific data models
├── types/         # Feature-specific TypeScript types
├── constants/     # Feature-level constants
├── utils/         # Feature-level utilities
├── hooks/         # Feature-specific custom hooks
├── components/    # Feature-specific UI components
├── navigation/    # Feature-specific navigation (if needed)
├── services/      # Feature-specific services
├── tests/         # Feature unit tests
└── index.ts       # Public API barrel export
```

## Data Flow

```
Screen → ViewModel (hook) → UseCase → Repository → API/Database
```

Screens only interact with ViewModels. ViewModels orchestrate UseCases. This keeps the UI layer completely free of business logic.

## Default Login Credentials

For development and testing, the login screen is pre-filled with:

- **Email**: `user@cpkc.com`
- **Password**: `Password@123`

Simply tap the **Login** button to navigate to the home page.
