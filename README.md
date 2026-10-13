# Express EJS CMS

A lightweight content management system built with Express.js and EJS. It includes a public home page, session-based admin login, and an admin dashboard for viewing and updating profile and site settings. Application content and configuration are stored in JSON files.

## Features

- Server-rendered pages using EJS templates
- Session-based admin login and logout
- Protected admin dashboard, profile, settings, and pages views
- Profile and site settings updates saved to JSON
- Static assets served from the `public` directory

## Requirements

- Node.js 18 or later
- npm

## Getting started

Install dependencies and start the app:

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app uses Node's watch mode, so it restarts when files change.

## Routes

| Method | Path | Description |
| --- | --- | --- |
| GET | `/` | Public home page |
| GET | `/login` | Admin login page |
| POST | `/login` | Submit login credentials |
| GET | `/logout` | End the current session |
| GET | `/admin` | Redirect to the admin dashboard |
| GET | `/admin/dashboard` | Admin dashboard |
| GET | `/admin/pages` | View configured navigation pages |
| GET | `/admin/profile` | View and update the current profile |
| POST | `/admin/updateProfile` | Save profile changes |
| GET | `/admin/settings` | View and update site settings |
| POST | `/admin/updateSettings` | Save site settings |

Admin pages require an authenticated session.

## Project structure

```text
app.js                  Express app setup and server startup
data/
  dashboard.json        User, settings, and report data
  db.json               Public site and navigation data
middleware/             Request locals and admin authentication
routes/                 Public, authentication, and admin routes
services/               JSON data loading
public/                 Static assets
views/                  EJS templates and partials
```

Profile and settings form submissions update `data/dashboard.json`. The app loads data from `data/dashboard.json` and `data/db.json` when it starts.

## Development notes

- The `npm test` script is currently a placeholder; no automated tests are configured.
- The session secret and cookie settings in `app.js` are development defaults. Configure a strong secret through an environment variable, use secure cookies over HTTPS, and use appropriately protected password hashes before deploying this app.
