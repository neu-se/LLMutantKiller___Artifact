import { getTimezonesForCountry, getAllCountries } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return exactly empty array for country with no timezones", () => {
    // Find a country where timezones is empty/falsy by checking all countries
    const allCountries = getAllCountries({ deprecated: true });
    
    // Find countries where timezones array is empty
    const emptyTzCountries = Object.entries(allCountries)
      .filter(([_, c]: any) => !c.timezones || c.timezones.length === 0)
      .map(([id]) => id);
    
    if (emptyTzCountries.length > 0) {
      for (const id of emptyTzCountries) {
        const result = getTimezonesForCountry(id, { deprecated: true });
        // Original: [] 
        // Mutant: [null] (getTimezone("Stryker was here") returns null)
        expect(result).toEqual([]);
      }
    }
    
    // Also check without deprecated option
    const allCountriesNoDep = getAllCountries();
    const emptyTzCountriesNoDep = Object.entries(allCountriesNoDep)
      .filter(([_, c]: any) => !c.timezones || c.timezones.length === 0)
      .map(([id]) => id);
    
    for (const id of emptyTzCountriesNoDep) {
      const result = getTimezonesForCountry(id);
      expect(result).toEqual([]);
    }
  });
});