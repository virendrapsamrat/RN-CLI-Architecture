# components/

Reusable UI component library built using **Atomic Design** methodology. These components are **presentation-only** — they contain no business logic.

## Why This Folder Exists

Atomic Design breaks UI into progressively complex layers. This makes components highly reusable, testable in isolation, and visually consistent across the entire app.

## Structure

| Layer        | Description                                         | Examples                                                                                                               |
| ------------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `atoms/`     | Smallest building blocks — single-purpose elements  | Button, Text, Input, Icon, Loader, Switch, Avatar, Badge, Spacer, Checkbox, Radio, Divider, Image                      |
| `molecules/` | Combinations of atoms forming functional units      | InputField, PasswordField, SearchBar, Card, OTPInput, Header, ListItem, Dropdown, DatePicker, ProfileCard, ModalHeader |
| `organisms/` | Complex UI sections composed of molecules and atoms | HomeHeader, SettingsSection, ProductList                                                                               |
| `templates/` | Page-level layout shells that wrap screen content   | AuthTemplate, HomeTemplate, MainTemplate                                                                               |

## Design Rules

1. **No business logic** — components receive data via props and fire callbacks.
2. **Theme-aware** — all components consume the design system via `useTheme()`.
3. **Accessibility** — every interactive element has proper `accessibilityRole` and `accessibilityLabel`.
4. **Memoized** — performance-critical components use `React.memo`.
