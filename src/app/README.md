# app/

Application shell and cross-cutting infrastructure layer. This folder contains everything that sets up and configures the application — it is **not** feature-specific business logic.

## Why This Folder Exists

The `app/` layer acts as the application's backbone. It initializes core services (navigation, theming, localization, storage, analytics) that every feature depends on, keeping them decoupled from individual feature modules.

## Structure

| Folder          | Purpose                                                                  |
| --------------- | ------------------------------------------------------------------------ |
| `analytics/`    | Analytics adapter supporting Firebase, Mixpanel, and Amplitude           |
| `config/`       | Environment configuration via `react-native-config` (.env files)         |
| `constants/`    | App-wide constants — API endpoints, storage keys, navigation names       |
| `featureFlags/` | Feature flag service (Firebase Remote Config ready)                      |
| `hooks/`        | App-level custom hooks shared across the application                     |
| `localization/` | i18next setup with EN/ES locale files for internationalization           |
| `logger/`       | Structured logging — dev console output, production-ready remote logging |
| `navigation/`   | React Navigation stacks, bottom tabs, deep linking configuration         |
| `permissions/`  | `react-native-permissions` wrapper for camera, location, etc.            |
| `providers/`    | React context providers — Theme, Redux, Error Boundary, Gesture Handler  |
| `services/`     | Network service with offline queue, platform services                    |
| `storage/`      | MMKV storage and secure storage (Keychain-ready) wrappers                |
| `theme/`        | Design system tokens — colors, typography, spacing, responsive sizes     |

## Key Design Decisions

- **Separation from features**: The `app/` layer is imported _by_ features but never imports _from_ them, enforcing a clean dependency direction.
- **Provider composition**: All providers are composed in `providers/AppProviders.tsx` to wrap the root component.
- **Navigation centralized**: All navigation types, stacks, and linking config live here so features only reference navigation constants.
