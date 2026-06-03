
# GitHub Copilot Home Gallery Workshop

This workshop uses a small Angular 19 application to practice practical GitHub Copilot workflows in VS Code. The app already has routing, search, a details page, a reactive form, a mock API option, tests, and a production Dockerfile so participants can focus on how to inspect, extend, and validate code with Copilot instead of scaffolding from scratch.

Estimated time: 45 to 90 minutes.

## Prerequisites

- Node.js 20 LTS or newer
- npm 10 or newer
- VS Code with GitHub Copilot and GitHub Copilot Chat enabled
- Optional: Docker Desktop if you want to complete the container exercise locally

## Quick Start

Install dependencies and run the Angular app:

```bash
npm install
npm start
```

The app is served at `http://localhost:4200`.

If you want the mock REST API used in exercise 6, open a second terminal and run:

```bash
npm run api
```

The mock API is served at `http://localhost:3000/locations`.

## Validation Commands

Use these commands as checkpoints throughout the workshop:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Lab Guide

Inside the `labs` folder you will find the step-by-step exercises for the workshop.

Filename | Description
--- | ---
[exercise-1.md](./labs/exercise-1.md) | Install dependencies and run the app
[exercise-2.md](./labs/exercise-2.md) | Review and modernize routing
[exercise-3.md](./labs/exercise-3.md) | Wire dynamic navigation and the details page
[exercise-4.md](./labs/exercise-4.md) | Add a reactive application form
[exercise-5.md](./labs/exercise-5.md) | Improve search and accessibility
[exercise-6.md](./labs/exercise-6.md) | Connect to the mock API with a safe fallback
[exercise-7.md](./labs/exercise-7.md) | Add and run meaningful tests
[exercise-8.md](./labs/exercise-8.md) | Build and run the Docker image
[exercise-9.md](./labs/exercise-9.md) | Refresh project documentation with Copilot

## Project Notes

- `src/` contains the active application used by the workshop.
- `src_solution/` is a reference snapshot and is not used by the build, lint, or test commands.
- `src/db.json` powers the optional `json-server` mock API.
- The project uses standalone Angular components and `app.config.ts` for app-wide providers.

## Copilot Workflow Tips

- Use Copilot Chat to ask for targeted code changes, explanations, and validation steps.
- Attach files or select code before prompting when you want a more precise answer.
- Use inline chat or editor actions for small, local changes.
- Ask Copilot to explain errors after you run the validation commands instead of guessing.

## Acknowledgements

The Home Gallery sample is based on the Angular first-app tutorial and refreshed for a current VS Code and GitHub Copilot workshop flow.
