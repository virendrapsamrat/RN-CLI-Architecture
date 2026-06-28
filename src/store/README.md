# store/

Redux state management layer using **Redux Toolkit** with **Redux Persist** for offline-first data persistence.

## Why This Folder Exists

Global application state (authentication status, theme, language, network connectivity) needs to be accessible from any screen or component. Redux provides a predictable, centralized state container with middleware support for side effects and persistence.

## Structure

| Folder        | Purpose                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------- |
| `redux/`      | Store configuration (`configureStore`), typed hooks (`useAppDispatch`, `useAppSelector`) |
| `slices/`     | Redux Toolkit slices — `authSlice`, `appSlice` (theme, language, network)                |
| `middleware/` | Custom middleware (e.g., logging, analytics tracking)                                    |
| `selectors/`  | Memoized selectors using `createSelector` for performance                                |

## Key Design Decisions

- **Redux Toolkit** — eliminates boilerplate with `createSlice`, `createAsyncThunk`, and Immer-based immutable updates.
- **Redux Persist + MMKV** — state is persisted to MMKV storage for instant hydration on app restart.
- **Typed hooks** — `useAppDispatch` and `useAppSelector` are pre-typed to avoid manual generics at every call site.
- **Slice-based organization** — each slice owns its own state shape, reducers, and actions.
