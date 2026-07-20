import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezones property', () => {
  it('should return empty array for timezones when no current timezones exist', () => {
    const countryId = 'KR'; // South Korea has timezones, but we'll test with a mock
    const mockData = {
      countries: { [countryId]: 'South Korea' },
      timezones: {}
    };

    const result = buildCountry(mockData, countryId);
    expect(result.timezones).toEqual([]);
  });
});