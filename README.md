# Raider Test Store

A lightweight e-commerce test site built for practicing UI test automation with [Ruby Raider](https://github.com/RaiderHQ/ruby_raider) and [Raider Desktop](https://github.com/RaiderHQ/raider_desktop).

## Features

- **Login flow** with pre-configured test users
- **Product catalog** with 8 products across multiple categories
- **Shopping cart** (session-based, add/remove items)
- **Product detail pages** with quantity selection
- **404 error handling**

## Test Users

| Username | Password | Name |
|----------|----------|------|
| `aguspe` | `12341234` | Agustin |
| `testuser` | `test1234` | Test User |

## Key Pages & Routes

| Page | URL |
|------|-----|
| Home | `/` |
| Login | `/index.php?rt=account/login` |
| Account | `/index.php?rt=account/account` |
| Logout | `/index.php?rt=account/logout` |
| Product Detail | `/product/:id` |
| Cart | `/cart` |

## Automation Selectors

These element selectors are designed to match the ones used by Ruby Raider and Raider Desktop:

| Element | Selector |
|---------|----------|
| Username field | `id="loginFrm_loginname"` |
| Password field | `id="loginFrm_password"` |
| Login button | `//button[@title='Login']` |
| Customer menu | `id="customer_menu_top"` |
| Add to Cart buttons | `//button[@title='Add to Cart']` |

After a successful login, the header displays **"Welcome back {name}"**. When logged out, it shows **"Login or register"**.

## Run Locally

```bash
npm install
node server.js
```

The site runs on `http://localhost:3000` by default. Set the `PORT` environment variable to change it.

## Deploy to Render

This project includes a `render.yaml` blueprint for one-click deployment:

1. Push this repo to GitHub
2. Go to [Render](https://render.com) > **New** > **Blueprint**
3. Connect the repository — Render reads `render.yaml` and configures everything automatically

Alternatively, create a **Web Service** manually with:
- **Build Command:** `npm install`
- **Start Command:** `node server.js`
- **Plan:** Free

## Tech Stack

- **Node.js** + **Express** — server
- **EJS** — server-rendered templates
- **express-session** — session-based login and cart
- **In-memory JSON** — no database required
