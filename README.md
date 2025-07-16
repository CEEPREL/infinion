# Infinion User Dashboard

A React, Typescript and Redux toolkit dashboard for managing users with features like virtualization, intelligent search, retry handling, light and dark theme and a responsive sidebar navigation. This app emphasizes performance and clean UI, making it suitable for scalable admin tools.

## Screenshots

![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2006.30.12.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2006.30.40.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2006.30.52.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2007.04.33.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2007.05.03.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-14%20at%2021.28.37.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2007.27.19.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2007.27.35.png)
![Screenshots](https://github.com/CEEPREL/keep-lagos-safe/blob/main/public/Screenshot%202025-07-16%20at%2007.36.28.png)

## Tech Stack

- React (CRA - Create React App)
- Redux Toolkit – global state management
- TypeScript – type safety
- react-window – virtualized user grid
- react-router-dom – routing
- Tailwind CSS – modern styling
- React Skeletons – loading feedback
- Custom Search Algorithm – user lookup by name/email
- Reusable Modal System – for user details

## Features

### User Listing

- Virtualized grid using `react-window` to handle large user lists efficiently
- Skeleton UI during loading
- Responsive columns:

### Intelligent Search

- Live search input with dropdown
- Select from results to open user detail
- Search helper in `utils/user-search.ts`

### Retry Logic

- If API fails to respond within 10 seconds, a retry button appears
- Built with `utils/retry.ts` for reusable retry pattern

### Modal View

- Click user to fetch full details
- Modal opened via Redux-managed component slot

### Sidebar Navigation

- Responsive sidebar with icons
- Hamburger menu on mobile
- Highlights current route
- Integrates with `react-router-dom`

## Folder Structure

```
src/
├── components/
│   ├── user/               # UserCard, Skeleton, Profile
│   ├── ui/                 # Input, Modals, Buttons
├── pages/
│   ├── users/              # UserGrid.tsx (main listing page)
├── redux/
│   ├── features/           # user-slice, modal-slice
│   ├── store.ts
├── utils/
│   ├── retry.ts            # global retry handler
│   ├── user-search.ts      # fuzzy search function
```

## Running Locally

1. Clone the repo

```bash
git clone https://github.com/ceeprel/infinion.git
cd infinion
```

2. Install dependencies

```bash
yarn install
```

3. Run the app

```bash
yarn start
```

## Notes

- You must configure your Redux API slice to fetch users from your backend or mock server.
- The app uses a modal system that takes React nodes. It’s simple, flexible, and doesn’t rely on external libraries.
- Uses `react-window` for list/grid virtualization (fast rendering of 1000+ items).

## Nice to have Feature

- Pagination support for non-virtualized lists
- Dark mode persistence with system preference
- notifications
- Authentication
- Authentication and role-based views
- Unit and integration tests with Jest/Testing Library

## Credits

Crafted by Boluwatife
A test Build for Infinion
