
# Exercise 3: Build the Details Flow

## Goal

Connect the listing cards to a dynamic details page and make the details page load and display the correct housing location based on the route.

By the end of this exercise, you should understand the full details flow:
card click -> route parameter -> service call -> details UI

## Part 1: Add dynamic navigation with RouterLink

Open `src/app/housing-location/housing-location.component.ts`. You should see a card component that displays location information:

```typescript
import { Component, Input } from '@angular/core';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  // ...
  template: `
    <section class="listing">
      <!-- ... -->
      <button class="primary">
        Learn More
      </button>
    </section>
  `
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
```

Right now the button doesn't navigate anywhere. Ask Copilot Chat:

```text
How do I add RouterLink to this standalone Angular component? I want the "Learn More" button to navigate to /details/:id where :id is the housingLocation.id. Show me a code example.
```

Then make these changes:
1. Add `RouterLink` to the imports from `@angular/router`
2. Add `routerLink` directive to the button
3. Use property binding `[routerLink]="['/details', housingLocation.id]"` to pass the location ID as a route parameter

Why this matters:
- every card points to a unique URL
- the URL carries the selected location id
- users can bookmark and share a details link

<details>
  <summary>Why RouterLink and not just href?</summary>
  RouterLink is the Angular way to navigate between routes. It prevents full page reloads and tells the Angular router to swap out components without losing your app state.
</details>

Reload the browser and click a "Learn More" button on any card. The URL should change to something like `/details/1` or `/details/3`.

![Details route](imgs/exec3-detail.png)

## Part 2: Read the route parameter in the details component

Open `src/app/details/details.component.ts`. You'll see a details component that displays housing information:

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  // Component setup...
}
```

The component needs to know which housing location to display. The ID comes from the URL (e.g., `/details/5`). Ask Copilot:

```text
In a standalone Angular component, how do I read a route parameter from the URL? 
I need to get the :id from /details/:id and load the housing location by that ID.
```

Then add this to your component:

1. Import `ActivatedRoute` from `@angular/router`
2. Inject it in the constructor: `constructor(private route: ActivatedRoute, private housingService: HousingService) {}`
3. Use `this.route.snapshot.paramMap.get('id')` to read the ID from the URL
4. Convert it to a number with `parseInt()` or the unary `+` operator
5. Call `this.housingService.getHousingLocationById(id)` to fetch the data

Since the service is asynchronous (returns a Promise), use `await` to wait for the result:

```typescript
async ngOnInit() {
  const id = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
  this.housingLocation = await this.housingService.getHousingLocationById(id);
}
```

<details>
  <summary>What's that ?? operator?</summary>
  The nullish coalescing operator (??) returns the right side only if the left side is null or undefined. Here it provides '0' as a fallback if there's no ID in the URL.
</details>

If you are new to route params, think of `:id` as a placeholder.
Example: route pattern is `details/:id`, actual URL is `details/5`, so id is `5`.

Test this: Reload the page and click a "Learn More" button. The URL should change, and the details component should load (even if the template is still showing placeholder text).

## Part 3: Render the housing location details

Now the component has the `housingLocation` object (loaded from the service). You need to display it in the template.

Open `src/app/details/details.component.html` (or find the template in your component). It might look like this:

```html
<article>
  <img alt="photo" [src]="housingLocation?.image" />
  
  <section class="details">
    <h2>{{housingLocation?.name}}</h2>
    <p>{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    
    <p class="description">
      {{housingLocation?.description}}
    </p>
    
    <p *ngIf="housingLocation?.available">
      ✓ {{housingLocation?.available}} units available
    </p>
    
    <p *ngIf="housingLocation?.wifi">
      ✓ Wi-Fi available
    </p>
    
    <p *ngIf="housingLocation?.laundry">
      ✓ Laundry available
    </p>
  </section>
</article>
```

Ask Copilot if you're not sure about the syntax:

```text
In Angular templates, how do I show a property from a TypeScript object? 
I want to display housingLocation.name, housingLocation.city, and conditionally show availability details.
```

<details>
  <summary>Template syntax notes</summary>
  - `{{propertyName}}` interpolates a value into text
  - `[src]="propertyName"` binds a property to an HTML attribute
  - `*ngIf="housingLocation?.available"` shows an element only if the condition is true
  - The `?.` (safe navigation operator) prevents errors if housingLocation is null
</details>

Now add styles. Open `src/app/details/details.component.css` and ask Copilot:

```text
Generate CSS for a housing details page. I have an article with an img tag and a section.details div. 
The image should be responsive, the details section should have spacing, and the layout should work on mobile.
```

Apply the generated styles to your CSS file. Test by clicking a property card—the details page should now display the correct property information.

Common beginner issue:
- if template throws undefined errors, use safe navigation (`?.`) until data is loaded
- confirm `housingLocation` is assigned after awaiting service call

![Details page layout](imgs/exec3-fields.png)

## Checkpoint

✓ Clicking `Learn More` button opens a details page with the URL reflecting the property ID  
✓ The details page displays the correct location (name, city, image, availability)  
✓ The page layout is readable on a smaller screen/mobile viewport  
✓ No console errors about missing data or undefined properties  

Test this now: Refresh your browser and click on a few different properties. Each should display correct, unique information.

Final verification:
- open at least two different details URLs manually (for example `/details/1` and `/details/2`)
- verify content changes based on ID

![Details page](imgs/exec3-app.png)

---

[Previous](./exercise-2.md) | [Next](./exercise-4.md)
