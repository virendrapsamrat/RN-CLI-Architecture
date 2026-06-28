# tests/

Global test infrastructure for the application. Feature-specific tests live inside their respective feature folders; this directory houses shared testing utilities.

## Why This Folder Exists

Centralizing test setup, mocks, and shared test utilities avoids duplication and ensures all tests run in a consistent environment.

## Structure

| Folder         | Purpose                                                             |
| -------------- | ------------------------------------------------------------------- |
| `setup/`       | Jest setup files — mocks for native modules, navigation, reanimated |
| `mocks/`       | Shared mock implementations reusable across all tests               |
| `unit/`        | Global unit tests (not feature-specific)                            |
| `integration/` | Integration tests spanning multiple modules                         |

## Key Setup

`jest.setup.ts` mocks all native modules that aren't available in the Jest environment:

- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-keyboard-controller`
- `@react-native-community/netinfo`
- `react-native-config`
- `react-native-mmkv`
- And more...

## Running Tests

```bash
yarn test              # Run all tests
yarn test:coverage     # Run with 80% coverage threshold
```
