import { getAllCountries, getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return empty array not [null] for a country with falsy timezones', () => {
    // Find a country where timezones property is falsy (undefined/null)
    const allCountries = getAllCountries();
    const countryWithFalsyTimezones = Object.values(allCountries).find(
      (c: any) => !c.timezones
    ) as any;

    expect(countryWithFalsyTimezones).toBeDefined();
    const result = getTimezonesForCountry(countryWithFalsyTimezones.id);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });
});