import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('getTimezonesForCountry', () => {
  it('should return empty array for a country with no timezones defined, not ["Stryker was here"]', () => {
    // Find a country in data that has no timezones property
    const countryId = Object.keys((data as any).countries).find(id => {
      const c = (data as any).countries[id];
      return !c.z || c.z.length === 0;
    });
    
    expect(countryId).toBeDefined();
    const result = getTimezonesForCountry(countryId!);
    expect(Array.isArray(result)).toBe(true);
    expect(result!.length).toBe(0);
  });
});