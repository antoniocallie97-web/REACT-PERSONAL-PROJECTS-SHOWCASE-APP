# Aurevia E-Commerce Platform

## Live Demo

🌐 [https://react-personal-projects-showcase-ap.vercel.app/](https://react-personal-projects-showcase-ap.vercel.app/)

---

# Overview

Aurevia is a modern Single Page Application (SPA) e-commerce platform built to provide users with a smooth and interactive shopping experience. The project focuses on responsive design, product management, clean UI structure, and full-stack integration.

The application allows users to browse products, search products, manage products through an admin portal, and interact with a dynamic frontend powered by React.

This project was collaboratively developed as a software engineering group project.

---

# Features

## User Features

* Browse available products
* Search for products dynamically
* Responsive modern UI
* Product cards with images and details
* Category-based organization
* Fast navigation using React routing
* Dynamic rendering without page reloads

## Admin Features

* Add new products
* Edit existing products
* Delete products
* Manage product inventory through forms
* Fetch and update data from backend server

## Technical Features

* React Single Page Application (SPA)
* Component-based architecture
* Backend API integration
* State management using React Hooks
* Tailwind CSS styling
* Local JSON server/backend support
* Git and GitHub collaboration workflow
* Deployment using Vercel

---

# Tech Stack

## Frontend

* React.js
* JavaScript (ES6+)
* Tailwind CSS
* React Router DOM
* Vite

## Backend

* JSON Server / Local Backend Server
* REST API

## Deployment

* Vercel

## Version Control

* Git
* GitHub

---

# Project Structure

```bash
project-root/
│
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── server/
│   └── db.json
│
├── package.json
├── vite.config.js
└── README.md
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
```

## 2. Navigate Into the Project Folder

```bash
cd project-folder
```

## 3. Install Dependencies

```bash
npm install
```

---

# Running the Project

## Start the Frontend Development Server

```bash
npm run dev
```

The frontend application will run on:

```bash
http://localhost:5173/
```

---

# Running the Backend Server

This project uses a backend server for storing and managing product data.

## Start the Backend Server

```bash
npm run server
```

OR

```bash
json-server --watch db.json --port 3000
```

The backend server runs on:

```bash
http://localhost:3000/
```

---

# API Example

Example endpoint:

```bash
GET /products
```

Example fetch request:

```javascript
fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

# Routing

The application uses React Router for navigation.

Example routes:

```jsx
<Route path="/" element={<HomePage />} />
<Route path="/products" element={<ProductPage />} />
<Route path="/admin" element={<AdminPortal />} />
```

---

# Team Collaboration Workflow

This project was developed collaboratively using Git and GitHub.

## Workflow Used

1. Clone the repository
2. Create a feature branch
3. Work on assigned tasks
4. Commit changes
5. Push branch to GitHub
6. Create Pull Requests
7. Review and merge changes

Example:

```bash
git checkout -b feature/product-page
```

```bash
git add .
git commit -m "Created product page"
git push origin feature/product-page
```

---

# Challenges Faced

During development, the team encountered several real-world software engineering challenges including:

* Git merge conflicts
* Pull request synchronization
* Backend and frontend integration
* Broken image URLs
* Routing configuration
* State management issues
* Team collaboration coordination
* Deployment debugging

These challenges helped improve teamwork, debugging skills, and understanding of real-world development workflows.

---

# Future Improvements

Potential future upgrades include:

* Shopping cart functionality
* Authentication and authorization
* Payment integration
* Product filtering and sorting
* Wishlist functionality
* User profiles
* Order tracking
* Database integration with MongoDB or PostgreSQL
* Admin analytics dashboard
* Dark mode support

---

# Deployment

The project is deployed on Vercel.

Live Link:

🌐 [https://react-personal-projects-showcase-ap.vercel.app/](https://react-personal-projects-showcase-ap.vercel.app/)

---

# Learning Outcomes

This project helped the team gain practical experience in:

* Full-stack development
* React application architecture
* REST API integration
* GitHub collaboration
* Agile teamwork
* Debugging and troubleshooting
* Deployment workflows
* UI/UX structuring

---

# Contributors

Developed collaboratively by the project team.

---

# License

This project is for educational and learning purposes.

---

# Acknowledgements

Special thanks to all team members who contributed to the design, backend setup, frontend implementation, debugging, testing, and deployment of the project.


<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->
