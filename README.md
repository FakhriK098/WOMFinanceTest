WOMFinanceTest is a React Native app (TypeScript).

It includes a simple authentication flow and a Pokémon list/detail viewer. The Home screen shows the logged-in email and provides a logout FAB with a confirmation dialog.

Features

- Authentication: email/password validation, token generation, 1-hour session expiry, persistent session via AsyncStorage, and logout with confirmation.
- Home: grid list of Pokémon with infinite scroll (debounced), pull-to-refresh, error state with retry, empty state, header shows logged-in email, logout FAB.
- Detail: hero image, basic info (height, weight, base XP), chips for types and abilities, sprites grid, evolution list with tap-to-navigate, dynamic theming colors.
- Theming: light/dark mode via `useColorScheme`, colors applied to headers and text.
- Architecture: Redux Toolkit slices (`auth`, `pokemon`, `pokemonDetail`), Axios service with base URL and basic error mapping, typed models under `@typings`.
- UI Kit: atoms/molecules/organisms/templates with reusable components (Button, Text, Input, FormField, Chip, Fab, etc.).

|  Authentication  |  Home  |  Detail  |
|  ---  |  ---  |  ---  |
|  <img width="300" height="800" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-04 at 19 58 37" src="https://github.com/user-attachments/assets/f9774922-7207-492b-99bb-c35f7085d6dc" />  |  <img width="300" height="800" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-04 at 19 57 39" src="https://github.com/user-attachments/assets/24985d1d-f1d9-4168-bb37-a9a093ad7334" />  |  <img width="300" height="800" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-04 at 19 57 53" src="https://github.com/user-attachments/assets/48ffbddf-8d8d-4cf4-b28f-c7a86c32e193" />  |

|  Alert Logout  |
|  ---  |
|  <img width="300" height="800" alt="Simulator Screenshot - iPhone 16 Pro - 2025-10-04 at 19 57 44" src="https://github.com/user-attachments/assets/41e3bd73-2897-44ae-8134-724140d917c5" />  |

Build Apk

You can get `app-debug.apk` in [Github Actions](https://github.com/FakhriK098/WOMFinanceTest/actions)

Requirements

- Node `>=20`
- Xcode (iOS) / Android Studio (Android)
- Yarn or npm

Install

- Install JS deps: `npm i` or `yarn`
- iOS only (first time and when native deps change):
  - `bundle install`
  - `cd ios && bundle exec pod install && cd ..`

Run

- Start Metro: `npm start` or `yarn start`
- Android: `npm run android` or `yarn android`
- iOS: `npm run ios` or `yarn ios`

Tip

- After changing path aliases, reset Metro cache: `npm start -- --reset-cache`

Scripts

- `start`: Run Metro bundler
- `android` / `ios`: Build and run app
- `lint`: ESLint
- `test`: Jest unit tests

Path Aliases

- `@components` → `src/components`
- `@screens` → `src/screens`
- `@store` → `src/store` (also `@store` root for index)
- `@theme` → `src/theme`
- `@typings` → `src/types` (do not import from `@types`)
- `@utils` → `src/utils`
- `@services` → `src/services`
- `@navigation` → `src/navigation/index`
- `@assets` → `src/assets`

Examples

- Import a component: `import { Button } from '@components'`
- Import a type: `import type { PokemonListItem } from '@typings/pokemon'`

Notable UI Behavior

- Logout confirmation: pressing the logout FAB shows a confirmation alert before dispatching logout.

Project Structure

- `src/components`: atoms, molecules, organisms, templates, and `index.ts` barrel
- `src/screens`: `LoginScreen`, `HomeScreen`, `DetailScreen`
- `src/navigation`: Root stack navigator
- `src/store`: Redux Toolkit slices and store setup
- `src/services`: API calls (e.g., Pokémon)
- `src/types` (aliased as `@typings`): shared app types
- `src/theme`: colors, typography, spacing, etc.

TypeScript

- Extends `@react-native/typescript-config`
- Check types locally: `./node_modules/.bin/tsc --noEmit`

Testing

- Run tests: `npm test` or `yarn test`
- Jest is configured with moduleNameMapper for the aliases

Troubleshooting

- Metro can't resolve aliases: ensure Metro is started from project root and try `--reset-cache`.
- "Cannot import type declaration files": use `@typings/...` instead of `@types/...`.
