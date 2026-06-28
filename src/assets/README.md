# assets/

Static assets used throughout the application. This folder contains **no business logic** — only raw files consumed by components and screens.

## Why This Folder Exists

Centralizing all static assets in one location makes them easy to discover, replace, and manage. It also enables build-tool optimizations (e.g., image compression, font linking) in a single place.

## Structure

| Folder        | Purpose                                          |
| ------------- | ------------------------------------------------ |
| `animations/` | Animation asset files                            |
| `fonts/`      | Custom font files (`.ttf`, `.otf`)               |
| `icons/`      | PNG/SVG icon assets for tab bars, buttons, etc.  |
| `images/`     | Image assets (splash, onboarding, backgrounds)   |
| `lottie/`     | Lottie JSON animation files for micro-animations |
| `svg/`        | SVG components / raw SVG files                   |

## Usage

Assets are referenced via path aliases (e.g., `@assets/images/logo.png`) configured in `tsconfig.json` and `babel.config.js`.
