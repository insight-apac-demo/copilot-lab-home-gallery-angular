
# Exercise 7: Add Unit Tests

## Goal

Write meaningful unit tests for core user flows: API fallback, filtering, and form submission.

By the end of this exercise, you should be able to:
- identify high-value behaviors to test in services and components
- write unit tests using TestBed, spies, and async assertions
- distinguish between happy-path checks and resilience-path checks

## Part 1: Understand the test setup

This workshop has `Karma` (test runner) and `Jasmine` (test framework) already configured. Run tests with:

```bash
npm test
```

Tests are TypeScript files alongside components with the `.spec.ts` extension. For example:
- `src/app/housing.service.ts` → `src/app/housing.service.spec.ts`
- `src/app/home/home.component.ts` → `src/app/home/home.component.spec.ts`

<details>
  <summary>Karma vs Jasmine?</summary>
  Jasmine writes the tests (describe, it, expect). Karma runs them in a browser and reports results.
</details>

## Part 2: Test the service's fallback behavior

Open `src/app/housing.service.spec.ts`. A robust test should verify fallback data loads when the API fails:

```typescript
import { TestBed } from '@angular/core/testing';
import { HousingService } from './housing.service';

describe('HousingService', () => {
  let service: HousingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HousingService);
  });

  it('should return fallback data when fetch fails', async () => {
    // Spy on fetch to simulate a network error
    spyOn(window, 'fetch').and.returnValue(
      Promise.reject(new Error('Network error'))
    );

    const result = await service.getAllHousingLocations();
    
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toBeDefined();
  });
});
```

Ask Copilot if you want to extend it:

```text
How do I spy on fetch in Jasmine and make it fail to test fallback behavior?
```

<details>
  <summary>What's spyOn?</summary>
  `spyOn()` replaces a real function with a mock. Here it replaces `fetch` to always fail, so you can test the error handler without needing a real API.
</details>

## Part 3: Test the filter function

Open `src/app/home/home.component.spec.ts`. Test that filtering works correctly:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HousingService } from '../housing.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockService: jasmine.SpyObj<HousingService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HousingService', ['getAllHousingLocations']);
    mockService.getAllHousingLocations.and.returnValue(Promise.resolve([
      { id: 1, city: 'New York' } as any,
      { id: 2, city: 'Los Angeles' } as any,
    ]));

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{ provide: HousingService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should filter locations by city name', () => {
    component.filterResults('New');
    
    expect(component.filteredLocationList.length).toBe(1);
    expect(component.filteredLocationList[0].city).toContain('New');
  });

  it('should show all locations when search is empty', () => {
    component.filterResults('');
    
    expect(component.filteredLocationList.length).toBe(2);
  });
});
```

<details>
  <summary>Why use a mock service?</summary>
  Instead of hitting the real API during tests, we create a fake service that returns predictable data. This makes tests fast and isolated.
</details>

## Part 4: Test form submission

Open `src/app/details/details.component.spec.ts`. Test that the form submits correctly:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from './details.component';
import { HousingService } from '../housing.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockService: jasmine.SpyObj<HousingService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('HousingService', [
      'getHousingLocationById',
      'submitApplication',
    ]);
    mockService.getHousingLocationById.and.returnValue(
      Promise.resolve({ id: 1, name: 'Test Location' } as any)
    );
    mockService.submitApplication.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        { provide: HousingService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should submit the form with user values', () => {
    component.applyForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });
    component.submitApplication();

    expect(mockService.submitApplication).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    });
  });
});
```

<details>
  <summary>TestBed and fixtures?</summary>
  `TestBed` sets up Angular's dependency injection for tests. A `fixture` is the test wrapper around a component instance, giving you access to the component and the DOM it renders to.
</details>

## Run and validate tests

```bash
npm test
```

Karma will open a browser window and run all `.spec.ts` files. You should see:
- ✓ HousingService returns fallback data on error
- ✓ HomeComponent filters locations correctly
- ✓ DetailsComponent submits form values

If tests fail, check:
- Are all imports correct (`TestBed`, `ComponentFixture`, `jasmine.SpyObj`)?
- Does your component/service code match the test expectations?
- Are async operations awaited properly?

## Checkpoint

✓ `npm test` runs and completes without fatal errors  
✓ At least 3 tests exist (service fallback, filter, form submit)  
✓ All tests pass (green checkmarks)  
✓ Tests verify user-visible behavior, not implementation details  

Ask Copilot to add more test cases:

```text
Add a test for this HomeComponent that verifies case-insensitive search works correctly.
```

---

[Previous](./exercise-6.md) | [Next](./exercise-8.md)