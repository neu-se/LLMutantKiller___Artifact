import { getTimezonesForCountry, getAllCountries, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return timezones matching the country timezones list length', () => {
    // For every country, the result of getTimezonesForCountry should have
    // the same length as country.timezones
    const allCountries = getAllCountries();
    for (const [id, country] of Object.entries(allCountries) as any[]) {
      const result = getTimezonesForCountry(id);
      const expectedLength = (country as any).timezones.length;
      expect((result as any[]).length).toBe(expectedLength);
    }
  });
});