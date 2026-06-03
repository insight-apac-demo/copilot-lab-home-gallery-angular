# Exercise 2: Understand the Routing Setup

## Goal

Review how this Angular 19 app organizes routing using the current standalone pattern, and understand why each file matters.

By the end of this exercise, you should be able to explain:
- where routes are defined
- where the router is registered
- where route content is rendered

## Part 1: Route definitions

Open `src/app/routes.ts`. You should see a route table similar to:

```typescript
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Gallery',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Location Details',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
```

Ask Copilot Chat:

```text
Explain what this route configuration does, especially the :id parameter and the wildcard route.
```

The route table is the "map" that tells Angular which component to show for each URL.

Beginner mental model:
1. User enters URL
2. Angular checks the route table
3. Matching component is selected
4. Component is rendered in `router-outlet`

<details>
  <summary>What each route does</summary>

- `path: ''` — the empty path is the home page (root `/`)
- `path: 'details/:id'` — dynamic route that reads an id from the URL
- `path: '**'` — wildcard that catches any unmatched URL and redirects to home

</details>

## Part 2: Register the router

Open `src/app/app.config.ts`. You should see:

```typescript
import {provideRouter} from '@angular/router';
import routeConfig from './routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig)],
};
```

This tells the Angular app to use the routes defined in `routes.ts`. Unlike older tutorials that wired routing inside `main.ts`, this pattern keeps all app-wide setup in one place.

Why this is helpful:
- easier to find app-wide providers later
- cleaner startup code in `main.ts`
- more consistent with modern standalone Angular projects

Ask Copilot:

```text
Why is it better to register the router in app.config.ts instead of inside main.ts?
```

## Part 3: The shell component

Open `src/app/app.component.ts`. You should see imports for `RouterLink` and `RouterOutlet`:

```typescript
import {RouterLink, RouterOutlet} from '@angular/router';
```

And in the template, a `<router-outlet>` element:

```html
<router-outlet></router-outlet>
```

This is where Angular will render the active route's component. The `RouterLink` directive on the header's logo link enables navigation.

Simple rule:
- `RouterLink` = how users navigate
- `RouterOutlet` = where the selected page appears

Ask Copilot to explain:

```text
What does <router-outlet> do, and why does the app component need RouterLink and RouterOutlet?
```

## Checkpoint

- The app still runs at `http://localhost:4200`.
- Home page loads through the router (not hardcoded in the template).
- You can explain what the `:id` parameter is for.

Quick self-check:
- If you manually change URL to `/details/1`, do you see the details page?
- If you enter a wrong URL like `/abc`, does it redirect to home?

---

[Previous](./exercise-1.md) | [Next](./exercise-3.md)
