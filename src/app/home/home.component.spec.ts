import {HomeComponent} from './home.component';
import {TestBed} from '@angular/core/testing';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';

describe('HomeComponent', () => {
  const locations: HousingLocation[] = [
    {
      id: 1,
      name: 'City Lights Apartments',
      city: 'Seattle',
      state: 'WA',
      photo: 'photo-1.jpg',
      availableUnits: 2,
      wifi: true,
      laundry: true,
    },
    {
      id: 2,
      name: 'Desert View Homes',
      city: 'Phoenix',
      state: 'AZ',
      photo: 'photo-2.jpg',
      availableUnits: 5,
      wifi: false,
      laundry: true,
    },
  ];

  let component: HomeComponent;
  let housingService: jasmine.SpyObj<HousingService>;

  beforeEach(() => {
    housingService = jasmine.createSpyObj<HousingService>('HousingService', ['getAllHousingLocations']);
    housingService.getAllHousingLocations.and.resolveTo(locations);

    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [{provide: HousingService, useValue: housingService}],
    });

    component = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('loads and exposes all locations', async () => {
    await Promise.resolve();

    expect(component.housingLocationList).toEqual(locations);
    expect(component.filteredLocationList).toEqual(locations);
  });

  it('filters locations by city, state, or name', () => {
    component.housingLocationList = locations;
    component.filteredLocationList = locations;

    component.filterResults('phoenix');
    expect(component.filteredLocationList).toEqual([locations[1]]);

    component.filterResults('city lights');
    expect(component.filteredLocationList).toEqual([locations[0]]);

    component.filterResults('');
    expect(component.filteredLocationList).toEqual(locations);
  });
});