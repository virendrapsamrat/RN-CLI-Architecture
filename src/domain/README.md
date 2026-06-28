# domain/

Core business domain layer — **framework-agnostic and dependency-free**. This is the innermost layer of Clean Architecture.

## Why This Folder Exists

The domain layer defines _what_ the application does without caring _how_ it's done. It contains pure business entities, repository contracts (interfaces), and shared use cases that are independent of React Native, Redux, or any external library.

## Structure

| Folder          | Purpose                                                          |
| --------------- | ---------------------------------------------------------------- |
| `entities/`     | Domain entities (e.g., `User`, `Session`) — pure data models     |
| `repositories/` | Repository interfaces (e.g., `IAuthRepository`) — contracts only |
| `usecases/`     | Shared domain use cases that span multiple features              |

## Key Design Decisions

- **No framework imports** — this layer must never import React, Redux, Axios, or any platform-specific code.
- **Dependency Inversion** — features and data layers depend on domain interfaces, not the other way around.
- **Testability** — since the domain is pure TypeScript, it can be unit tested without any mocking of React Native or other frameworks.
