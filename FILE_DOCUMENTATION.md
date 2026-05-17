# React Showcase App - File Documentation

This document explains the main files and folders in the project so your teammates can understand how the application is organized.

## Root files

- `README.md`
  - Project overview, setup instructions, feature list, and deployment notes.

- `package.json`
  - Defines dependencies, devDependencies, and npm scripts used to run, build, lint, and test the app.

- `vite.config.js`
  - Vite configuration for building and running the React app.

- `db.json`
  - Local JSON database for the backend API server.
  - Stores product data used by the app and can be served by JSON Server.

- `index.html`
  - HTML entry point for the Vite app.

## `src/`

### `src/main.jsx`
- Application entry point.
- Sets up React DOM rendering.
- Wraps the app in `BrowserRouter` for client-side routing.

### `src/App.jsx`
- Main application component.
- Defines routes and page structure using `react-router-dom`.
- Holds global state for the shopping cart and theme toggling.
- Routes:
  - `/` → `LandingPage`
  - `/shop` → `Shop`
  - `/admin` → `AdminPortal`
  - `/cart` → `Cart`
  - `/products` → `ProductPage`

### `src/index.css`
- Global styles for the entire application.

### `src/App.css`
- App-level styles used by the root component and shared layout.

## `src/components/`

### `Navbar.jsx`
- Renders top navigation links.
- Shows the cart count and theme toggle.
- Uses `react-router-dom` `Link` for navigation.

### `LandingPage.jsx`
- The homepage and hero landing section.
- Includes animated stars background via `StarCanvas`.
- Provides buttons to go to the shop or admin portal.
- Contains a scroll-aware navigation style.

### `ProductPage.jsx`
- Contains both the product listing and individual product card logic.
- Fetches products when rendered without a `product` prop.
- When passed a single `product`, it renders one card.
- Supports regular shopping mode (`onAddToCart`) and admin mode (`isAdmin`, `onEdit`, `onDelete`).

### `Cart.jsx`
- Displays items currently in the shopping cart.
- Shows quantity controls and item totals.
- Supports removing items and clearing the entire cart.

### `SearchBar.jsx`
- Filter and search UI for products.
- Works for both the customer shop and admin portal.
- Supports search text, category selection, and custom filter rules.

### `FormPage.jsx`
- Product form used in the admin portal.
- Supports adding new products and editing existing ones.
- Sends `POST` requests for new products and `PUT` requests for updates.

### `AdminLogin.jsx`
- Login screen displayed before the admin portal.
- Requires the correct admin password before `AdminPortal` is shown.
- Reads the password from `VITE_ADMIN_PASSWORD` in `.env`.
- Protects the `/admin` route from direct access without authentication.

### `AdminPortal.jsx`
- Adds a logout button for signed-in admin users.
- When clicked, the admin session ends and `/admin` returns to the login screen.

## `src/pages/`

### `Home.jsx`
- Simple wrapper component that renders `LandingPage`.

### `Shop.jsx`
- Page for browsing products.
- Loads products from the backend and passes them into `SearchBar`.
- Displays results with `ProductPage` cards and `Add to Cart` buttons.

### `AdminPortal.jsx`
- Admin interface for managing products.
- Displays the `FormPage` for adding or editing products.
- Uses `SearchBar` to filter the admin product list.
- Renders each product using `ProductPage` in admin mode.
- Updates local state after create, update, or delete operations.

## `src/hooks/`

### `useFetch.js`
- Custom hook for fetching data from an API.
- Returns `data`, `loading`, `error`, and `setData`.
- Can be reused by components that need generic fetch behavior.

## `public/`
- Static assets served by Vite.
- Typically contains images or other files that do not require processing.

## `src/tests/`

- Contains unit and component tests for the app.
- Examples include tests for admin pages, landing page behavior, forms, product page UI, and search bar filtering.

## Notes for teammates

- Most API requests target `http://localhost:3001/products`.
- The app assumes a JSON server or backend running locally for product data.
- `App.jsx` is the single source of truth for cart state.
- `SearchBar.jsx` is shared between the shop and admin pages; it handles different filter modes.
- `ProductPage.jsx` is a reusable product display component used in both user-facing and admin flows.

## Suggested workflow

1. Start backend JSON server using `db.json`.
2. Run the frontend with `npm run dev`.
3. Use the admin portal to add, edit, or delete products.
4. Browse the shop and add items to the cart.

---

If you want, I can also add inline header comments to each source file so the code itself documents the same structure.