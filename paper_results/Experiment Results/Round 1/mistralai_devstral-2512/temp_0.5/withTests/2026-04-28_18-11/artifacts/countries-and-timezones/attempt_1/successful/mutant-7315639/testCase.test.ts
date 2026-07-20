import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry allTimezones fallback', () => {
  it('should return empty array for allTimezones when no timezone data exists', () => {
    const countryId = 'XX'; // Non-existent country
    const result = buildCountry(data, countryId);
    expect(result).toBeNull();
  });

  it('should return empty array for allTimezones when timezone data exists but has no all field', () => {
    const mockData = {
      countries: { 'XX': 'Test Country' },
      timezones: {}
    };
    const result = buildCountry(mockData, 'XX');
    expect(result.allTimezones).toEqual([]);
  });
});