import {TestBed} from '@angular/core/testing';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {DetailsComponent} from './details.component';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';

describe('DetailsComponent', () => {
  const location: HousingLocation = {
    id: 2,
    name: 'Warm Beds Housing Support',
    city: 'Juneau',
    state: 'AK',
    photo: 'photo.jpg',
    availableUnits: 1,
    wifi: false,
    laundry: false,
  };

  let component: DetailsComponent;
  let housingService: jasmine.SpyObj<HousingService>;

  beforeEach(() => {
    housingService = jasmine.createSpyObj<HousingService>('HousingService', [
      'getHousingLocationById',
      'submitApplication',
    ]);
    housingService.getHousingLocationById.and.resolveTo(location);

    TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        {provide: HousingService, useValue: housingService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({id: '2'}),
            },
          },
        },
      ],
    });

    component = TestBed.createComponent(DetailsComponent).componentInstance;
  });

  it('loads the selected housing location from the route id', async () => {
    await Promise.resolve();

    expect(housingService.getHousingLocationById).toHaveBeenCalledWith(2);
    expect(component.housingLocation).toEqual(location);
  });

  it('submits the application form values', () => {
    component.applyForm.setValue({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
    });

    component.submitApplication();

    expect(housingService.submitApplication).toHaveBeenCalledWith(
      'Ada',
      'Lovelace',
      'ada@example.com',
    );
  });
});