
# Exercise 1: Run the App

## Goal

Get the Angular app running locally, confirm your tools are ready, and understand what you are looking at before coding.

By the end of this exercise, you should be able to:
- install project dependencies
- run the app in development mode
- explain where the app starts and where key files live

## Setup

Before running commands, confirm your environment is ready:

1. GitHub Copilot and GitHub Copilot Chat are enabled in VS Code.
2. You are signed in with an account that has Copilot access.
3. Node.js and npm are installed.

Open Copilot Chat and ask a project-specific question such as:

```text
What commands should I run to install dependencies and start this Angular 19 workshop app?
```

Compare the answer with the commands below.

## Run the workshop app

1. Install dependencies:

```bash
npm install
```

What this does:
- reads `package.json`
- downloads all required libraries into `node_modules`

2. Start the Angular development server:

```bash
npm start
```

What this does:
- compiles the app in development mode
- starts a local server with hot reload (changes refresh automatically)

3. Open `http://localhost:4200`.

You should see the Home Gallery landing page with a list of housing locations and a search field.

![Home Gallery app](imgs/exec1-app.png)

## What's ahead

In the next exercises, you will:

- Add routes and navigation to the application
- Build a details page with dynamic route parameters
- Create a reactive form to collect user input
- Improve search and filtering
- Connect to a mock REST API
- Write and run unit tests
- Build a Docker image

There are many other things Copilot can help you with. Feel free to explore features like:

- `/fix`: Ask Copilot to fix problems in your code
- `/explain`: Ask Copilot to explain what code does
- Inline chat: highlight code and ask targeted questions about just that section

Tip for beginners: ask small, specific questions. Instead of "explain Angular," ask "what does this one component do?"

## Copilot prompts to try

- `Explain the project structure for this Angular workshop.`
- `Which files define the routes and the application shell?`
- `What validation commands should I run before I commit changes?`

## If something does not start

- If `npm install` fails: check internet connection and rerun.
- If `npm start` fails: read the first red error line in the terminal and ask Copilot to explain that exact message.
- If `http://localhost:4200` does not open: confirm the terminal says the app compiled successfully.

## Checkpoint

- The app loads at `http://localhost:4200`.
- You can identify where the app bootstraps and where the routes are defined.
- You know which command installs dependencies and which command starts the app.

---

[Previous](../README.md) | [Next](./exercise-2.md)