import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form class="search-form" (submit)="$event.preventDefault(); filterResults(filter.value)">
        <label class="visually-hidden" for="location-filter">Filter locations</label>
        <input id="location-filter" type="text" placeholder="Filter by city or state" #filter />
        <button class="primary" type="submit">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList; trackBy: trackByLocationId"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    void this.loadHousingLocations();
  }

  async loadHousingLocations(): Promise<void> {
    this.housingLocationList = await this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text.trim()) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    const normalizedText = text.toLowerCase();
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      [housingLocation.name, housingLocation.city, housingLocation.state]
        .join(' ')
        .toLowerCase()
        .includes(normalizedText),
    );
  }

  trackByLocationId(_: number, housingLocation: HousingLocation): number {
    return housingLocation.id;
  }
}
