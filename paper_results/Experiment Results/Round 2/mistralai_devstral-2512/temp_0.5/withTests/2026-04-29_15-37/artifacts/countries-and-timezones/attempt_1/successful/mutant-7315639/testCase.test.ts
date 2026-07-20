import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry allTimezones fallback behavior', () => {
  it('should return empty array for allTimezones when timezone data is missing', () => {
    const testCountryId = 'XX';
    const mockData = {
      countries: { [testCountryId]: 'Test Country' },
      timezones: {}
    };

    const result = buildCountry(mockData, testCountryId);

    expect(result).not.toBeNull();
    expect(result?.allTimezones).toEqual([]);
  });
});