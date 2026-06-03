import {HousingService} from './housing.service';

describe('HousingService', () => {
  let service: HousingService;

  beforeEach(() => {
    service = new HousingService();
  });

  it('returns fallback housing locations when the mock API is unavailable', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('network down'));

    const locations = await service.getAllHousingLocations();

    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0].name).toBe('Acme Fresh Start Housing');
  });

  it('loads a location by id from the fallback data when the mock API is unavailable', async () => {
    spyOn(window, 'fetch').and.rejectWith(new Error('network down'));

    const location = await service.getHousingLocationById(4);

    expect(location?.city).toBe('Gary');
    expect(location?.availableUnits).toBe(1);
  });
});