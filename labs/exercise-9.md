
# Exercise 9: Review and Document the Project

## Goal

Use Copilot to understand the codebase structure, add clarifying comments where needed, and ensure the README and code are current and discoverable.

## Part 1: Ask Copilot to explain core flows

Open Copilot Chat and ask focused questions with relevant files visible. Examples:

```text
When a user clicks "Learn More" on a housing card, what happens step-by-step?
Walk me through the component chain: which files are involved and in what order?
```

```text
Explain this HomeComponent filter function. What does it do and why use two separate arrays?
```

```text
How does the service handle API failures?
```

Use these explanations to decide where to add code comments or update README sections.

<details>
  <summary>Good comment examples</summary>
  
  ```typescript
  // Keep both full and filtered lists so we can search from complete data each time
  filteredLocationList: HousingLocation[] = [];
  
  // Try API first; fall back to in-memory data if unreachable
  async getAllHousingLocations(): Promise<HousingLocation[]> { ... }
  ```
  
  Short and specific, not obvious from code alone.
</details>

## Part 2: Review and improve the README

Open `README.md`. It should include:

- **Setup**: How to install and run the app
- **Development commands**: `npm start`, `npm test`, `npm run build`
- **Mock API**: How to run `npm run api` in a second terminal
- **Lab exercises**: Brief overview of what each exercise teaches
- **Architecture**: High-level explanation of routing, service layer, components

Ask Copilot to improve a specific section:

```text
Rewrite the "Getting Started" section for a developer who's new to Angular.
Include setup steps and the first command they should run.
```

Or ask it to add a missing section:

```text
Add a "Project Structure" section to README that explains what each folder contains.
```

<details>
  <summary>README structure checklist</summary>
  
  - [ ] Project title and description  
  - [ ] Prerequisites (Node version)  
  - [ ] Installation (`npm install`)  
  - [ ] Dev server (`npm start`)  
  - [ ] Running tests (`npm test`)  
  - [ ] Building for production (`npm run build`)  
  - [ ] Mock API setup (`npm run api`)  
  - [ ] Lab exercise overview  
  - [ ] File structure or architecture explanation  
</details>

## Part 3: Add clarifying comments to complex code

Identify tricky sections and ask Copilot to add brief comments. Examples:

**App routing** - Open `src/app/routes.ts`:

```text
Add a one-line comment explaining the :id parameter in the details route.
```

**Service fallback** - Open `src/app/housing.service.ts`:

```text
Add a comment above the try/catch that explains why the service tries the API first.
```

**Form handling** - Open `src/app/details/details.component.ts`:

```text
Add a comment explaining why we use nullish coalescing (??) on the route param.
```

Ask these targeted questions instead of broad "document everything" requests. Copilot works best with specific, file-focused guidance.

## Part 4: Final validation

Run all validation commands to ensure nothing is broken:

```bash
npm run typecheck
```
Verifies TypeScript compilation without type errors.

```bash
npm run lint
```
Checks code style and patterns.

```bash
npm test
```
Runs unit tests.

```bash
npm run build
```
Compiles the app for production.

All four should complete successfully with no errors. If you see warnings, ask Copilot:

```text
How do I fix this [warning/error message]?
```

<details>
  <summary>Expected output</summary>
  
  ```
  $ npm run typecheck
  ✔ 0 errors
  
  $ npm run lint
  ✔ 0 errors
  
  $ npm test
  ✔ 3 specs passed
  
  $ npm run build
  ✔ 286 kB (78 kB gzipped)
  ```
</details>

## Checkpoint

✓ README explains how to run the app and tests  
✓ README includes mock API setup instructions  
✓ Code has comments explaining non-obvious patterns (routing, fallback, form)  
✓ `npm run typecheck` passes  
✓ `npm run lint` passes  
✓ `npm run build` produces a working bundle  
✓ `npm test` runs successfully  

## Workshop Complete!

You now have a modern Angular workshop that:
- ✓ Uses current Angular patterns (standalone, async, routing)
- ✓ Demonstrates realistic practices (API fallback, form handling, testing)
- ✓ Validates cleanly (typecheck, lint, tests, build)
- ✓ Documents itself for the next developer
- ✓ Integrates tightly with Copilot workflows

Participants who complete these 9 exercises will have hands-on experience with routing, async data loading, forms, filtering, testing, and Docker—practical skills for real Angular development.

---

[Previous](./exercise-8.md)