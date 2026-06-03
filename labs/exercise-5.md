

# Exercise 5: Add a Search Filter

## Goal

Allow users to filter the housing list by typing in a search box. As they type, only matching locations appear.

By the end of this exercise, you should be able to:
- explain why the component keeps full and filtered lists separately
- connect template input actions to component filtering logic
- verify search behavior for empty, partial, and case-insensitive input

## Part 1: Add a filtered list property

Open `src/app/home/home.component.ts`. You should see the component loads housing locations from the service:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];

  constructor(private housingService: HousingService) {}

  async ngOnInit() {
    this.housingLocationList = await this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }
}
```

Notice two arrays:
- `housingLocationList` - the complete, unfiltered list from the service
- `filteredLocationList` - starts as a copy, but will shrink as the user types

This pattern keeps both the original data and the filtered view separate.

<details>
  <summary>Why use two arrays?</summary>
  If you filtered the original list, you'd lose data. With two arrays, you can search from the full set each time the user types. This makes search instant and correct.
</details>

## Part 2: Add the search input and button

Open `src/app/home/home.component.html`. Add a search section above the housing list:

```html
<section class="results">
  <div class="filter">
    <input 
      type="text" 
      placeholder="Filter by city" 
      #filter
    />
    <button 
      class="primary" 
      type="button" 
      (click)="filterResults(filter.value)"
    >
      Search
    </button>
  </div>
</section>
```

Key bindings:
- `#filter` is a template reference variable—it lets you grab the input element's value in TypeScript
- `(click)="filterResults(filter.value)"` calls your filter function when the button is clicked
- `filter.value` passes the text the user typed to your function

<details>
  <summary>Template reference variables (#filter)</summary>
  When you write `#filter`, you create a reference to that HTML element. In the click handler, you can access its `.value` property directly without using document.getElementById().
</details>

## Part 3: Update the list to show filtered results

Update the `ngFor` loop in your template to iterate over `filteredLocationList` instead of `housingLocationList`:

```html
<div class="results-grid">
  <app-housing-location 
    *ngFor="let housingLocation of filteredLocationList; trackBy: trackByFn"
    [housingLocation]="housingLocation"
  >
  </app-housing-location>
</div>
```

<details>
  <summary>trackBy tip</summary>
  The `trackBy: trackByFn` hint tells Angular to identify each item by its ID, making the list re-render more efficiently. Add this to your component:
  ```typescript
  trackByFn(index: number, item: HousingLocation) {
    return item.id;
  }
  ```
</details>

## Part 4: Implement the filter function

Now implement `filterResults()` in your component class:

```typescript
filterResults(text: string) {
  if (!text) {
    this.filteredLocationList = this.housingLocationList;
    return;
  }

  this.filteredLocationList = this.housingLocationList.filter((housingLocation) => {
    return housingLocation.city.toLowerCase().includes(text.toLowerCase());
  });
}
```

This function:
1. If the search box is empty, show all locations
2. Otherwise, filter the full list to only items where the city name includes the search text
3. `.toLowerCase()` makes the search case-insensitive ("New York" matches "new york")

<details>
  <summary>How .filter() works</summary>
  `.filter()` takes a function that returns true/false for each item. Only items where the function returns true stay in the list. Here, we check if the city includes the search text.
</details>

Ask Copilot if you want to extend this:

```text
How can I update this filter to search across multiple properties like city, state, and name?
```

## Checkpoint

✓ Typing in the search box and clicking Search filters the list  
✓ Leaving the box empty shows all locations  
✓ Searching is case-insensitive  
✓ No console errors  

Test it: Type "new" or "san" and click Search. Only matching cities should appear.

---

[Previous](./exercise-4.md) | [Next](./exercise-6.md)