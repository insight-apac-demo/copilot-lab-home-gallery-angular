
# Exercise 6: Connect to a Mock API

## Goal

Load housing data from a local mock API server, with a fallback to in-memory data if the API is unavailable.

By the end of this exercise, you will understand:
- why frontend apps fetch data asynchronously
- how to read data from an API endpoint
- how to keep the app usable when the API is down

## Part 1: Start the mock API server

This workshop includes `json-server`, a tool that turns a JSON file into a local REST API.

Think of this as a "practice backend" running on your machine.

Open a second terminal and run:

```bash
npm run api
```

You should see output that includes:
```
  JSON Server is running
  Port: 3000
```

Now open this URL in your browser:

`http://localhost:3000/locations`

You should see JSON data (an array of housing location objects). That data comes from `src/db.json`.

If this URL works, your mock API is ready.

<details>
  <summary>What is json-server?</summary>
  json-server simulates a REST API by serving JSON files. In real projects, this might be a Node backend or cloud database. Here it lets you practice real API flow without building a backend.
</details>

## Part 2: Review the async service pattern

Open `src/app/housing.service.ts`.

This service is the app's data layer. Components should not call `fetch` directly; they ask the service for data.

You should see a pattern like this:

```typescript
import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private apiUrl = 'http://localhost:3000/locations';
  private fallbackData: HousingLocation[] = [
    // ... in-memory array with sample data ...
  ];

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const response = await fetch(this.apiUrl);
      return await response.json();
    } catch (error) {
      console.warn('API unavailable, using fallback data');
      return this.fallbackData;
    }
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      return await response.json();
    } catch (error) {
      return this.fallbackData.find(location => location.id === id);
    }
  }
}
```

What this does, step by step:
1. Try to fetch from the API first (`http://localhost:3000/locations`)
2. If the API call fails, catch the error
3. Return local fallback data so the app still works

Why this matters:
- learners can continue even if the API is not running
- users don't get a blank or broken page during temporary failures
- components always receive the same return type (`Promise<...>`) no matter which path is used

Ask Copilot to explain any part you're unsure about:

```text
Explain what happens if the fetch() call fails and why we catch the error instead of letting it crash.
```

<details>
  <summary>Why async/await instead of .then()?</summary>
  `async/await` makes promise-based code easier to read. `await` pauses until the Promise resolves. `try/catch` handles failures in one place, which is easier for beginners to reason about.
</details>

## Part 3: Verify components await the service

Open `src/app/home/home.component.ts`. The `ngOnInit` should look like:

```typescript
async ngOnInit() {
  this.housingLocationList = await this.housingService.getAllHousingLocations();
  this.filteredLocationList = this.housingLocationList;
}
```

Notice `await`: the component waits for data before using it.

Without `await`, you may see empty UI state or errors from trying to use data that has not arrived yet.

Open `src/app/details/details.component.ts`. The location loading should look like:

```typescript
async ngOnInit() {
  const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
  this.housingLocation = await this.housingService.getHousingLocationById(id);
}
```

Same pattern:
- mark method as `async`
- `await` service result
- assign returned value to component state

This keeps Home and Details consistent.

Quick mental model:
1. User opens page
2. Component starts loading
3. Service requests API
4. Service returns API data or fallback data
5. Component renders the result

<details>
  <summary>What if I'm still not seeing data?</summary>
  Make sure:
  1. `npm run api` is running in a second terminal
  2. TypeScript type errors are resolved (check the Problems panel)
  3. The browser console shows no fetch errors
  4. `src/db.json` has housing location objects
  5. you refreshed the browser after starting API
</details>

## Part 4: Prove both modes work (API on and API off)

Run this quick verification so you truly understand the fallback behavior.

1. Keep `npm run api` running.
2. Open the app and confirm home and details pages show data.
3. Stop the API terminal (Ctrl+C).
4. Refresh the app.
5. Confirm data still appears from fallback.

If step 5 works, your resilience design is correct.

## Checkpoint

✓ `npm run api` is running in a separate terminal  
✓ `http://localhost:3000/locations` shows JSON in the browser  
✓ The app loads housing data (check home page)  
✓ Clicking a property loads its details correctly  
✓ Stop the `npm run api` process and reload the app—it should still show fallback data  
✓ No console errors about CORS or fetch failures  

---

[Previous](./exercise-5.md) | [Next](./exercise-7.md)