
# Exercise 4: Add the Application Form

## Goal

Collect basic applicant data (name and email) on the details page and send it to the service layer.

By the end of this exercise, you should understand:
- why forms are managed in component state
- how form fields connect to `FormGroup`
- what happens from submit click to service call

## Part 1: Add a service method to handle applications

Open `src/app/housing.service.ts`. You should see methods like `getAllHousingLocations()` and `getHousingLocationById()`:

```typescript
export class HousingService {
  private apiUrl = 'http://localhost:3000/locations';
  
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    // ...
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    // ...
  }
}
```

You need to add a new method to handle form submissions. Ask Copilot:

```text
I have a housing service with async methods. 
Add a submitApplication method that accepts firstName, lastName, and email parameters as an object.
The method should log a confirmation message and then return a Promise.
```

The method should look something like:

```typescript
submitApplication(data: { firstName: string; lastName: string; email: string }): Promise<boolean> {
  console.log(`Application received for ${data.firstName} ${data.lastName} (${data.email})`);
  return Promise.resolve(true);
}
```

<details>
  <summary>Why promise-based?</summary>
  Even though we're just logging right now, making it return a Promise is good practice. 
  Later, you might want to send this data to an actual server, and that would also be asynchronous.
</details>

Simple mental model:
- component collects input
- service handles business action
- service can later swap log output for real API call

## Part 2: Set up a reactive form in the details component

Open `src/app/details/details.component.ts`. The component currently displays housing information:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  // ...
})
export class DetailsComponent implements OnInit {
  housingLocation: HousingLocation | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}
  
  ngOnInit() {
    // Load housing location...
  }
}
```

Now you need to add a form to collect applicant data. "Reactive Forms" is Angular's way of managing form state in TypeScript code (not just in templates). Ask Copilot:

```text
In this standalone Angular component, how do I create a reactive form with three fields: firstName, lastName, and email?
Show me how to create a FormGroup with FormControl objects for each field.
```

Add this code to your component:

```typescript
applyForm = new FormGroup({
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  email: new FormControl(''),
});

submitApplication() {
  const formData = this.applyForm.value;
  this.housingService.submitApplication(formData as any);
  this.applyForm.reset();
}
```

<details>
  <summary>What's FormGroup and FormControl?</summary>
  - `FormControl` represents a single form field (like a text input)
  - `FormGroup` groups multiple FormControls together into one object
  - When you call `.value`, you get all the current values from all controls
  - `.reset()` clears the form for the next submission
</details>

Why this pattern is useful for beginners:
- the form state lives in one object (`applyForm`)
- reading form values is predictable (`this.applyForm.value`)
- reset behavior is explicit and easy to test

## Part 3: Create the form template

Open `src/app/details/details.component.html` (or add a template to your component). Below the housing details section, add the application form:

```html
<section class="apply-section">
  <h2>Apply to Live Here</h2>

  <form [formGroup]="applyForm" (ngSubmit)="submitApplication()">
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input 
        id="firstName"
        type="text" 
        formControlName="firstName"
        placeholder="Enter first name"
      />
    </div>

    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input 
        id="lastName"
        type="text" 
        formControlName="lastName"
        placeholder="Enter last name"
      />
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input 
        id="email"
        type="email" 
        formControlName="email"
        placeholder="Enter email"
      />
    </div>

    <button type="submit" class="primary">Submit Application</button>
  </form>
</section>
```

<details>
  <summary>Template bindings explained</summary>
  - `[formGroup]="applyForm"` connects the HTML form to your TypeScript `applyForm` object
  - `formControlName="firstName"` connects each input to a specific FormControl
  - `(ngSubmit)="submitApplication()"` calls your method when the form is submitted
  - Labels have `for="fieldName"` to associate them with inputs (`id="fieldName"`)
</details>

Accessibility note:
- keep `label for` and `input id` matching so screen readers can announce fields correctly

Now add basic styling. Open `src/app/details/details.component.css` and ask Copilot:

```text
Generate CSS for a form section. I have a section.apply-section with a form. 
The form has input fields and a submit button. Make it look clean with spacing and readable labels.
```

Apply the generated styles to your CSS file.

## Validate the form flow

1. Save your changes. The app should rebuild automatically if running in watch mode (`ng serve`).
2. Open a housing location page.
3. Scroll down to the "Apply to Live Here" form.
4. Fill in First Name, Last Name, and Email.
5. Click "Submit Application".
6. Open the browser console (F12 or right-click → Inspect → Console tab).
7. You should see a message like: `Application received for John Doe (john@example.com)`

What to observe carefully:
- submit does not reload the page
- form values are sent to service once per click
- form resets after submit

![Application form](imgs/exec3-form.png)

## Checkpoint

✓ The details page displays the application form  
✓ Filling in and submitting the form works (check console for the log message)  
✓ The form clears after successful submission  
✓ The app builds without template or TypeScript errors  

If you see any console errors, check that:
- `FormGroup` is imported from `@angular/forms`
- `applyForm` is defined in your component
- All `formControlName` values match the control names in your FormGroup
- The form element has `[formGroup]="applyForm"` binding

If submit does nothing:
- verify button type is `submit`
- verify form uses `(ngSubmit)="submitApplication()"`
- verify method name in template matches method in component exactly

---

[Previous](./exercise-3.md) | [Next](./exercise-5.md)
