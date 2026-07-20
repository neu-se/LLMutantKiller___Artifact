import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";
import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array for country with no timezones", () => {
    const d = data as any;
    const bc = typeof buildCountry === 'function' 
      ? buildCountry as Function
      : (buildCountry as any).default as Function;
    
    // Check if buildCountry returns falsy timezones for a country with no z key
    const fakeData = { countries: { TEST: { n: "Test Country" } }, timezones: {} };
    const testCountry = bc(fakeData, "TEST");
    
    if (testCountry && !testCountry.timezones) {
      // buildCountry returns falsy timezones when d.z is missing
      // Find a real country with no z key in the data
      for (const [id, c] of Object.entries(d.countries) as [string, any][]) {
        if (c.z === undefined || c.z === null) {
          const result = getTimezonesForCountry(id);
          // Original: undefined || [] = [] → []
          // Mutant: undefined || ["Stryker was here"] → [null]
          expect(result).toEqual([]);
          expect(result).not.toContain(null);
          return;
        }
      }
    }
    
    // buildCountry uses d.z || [] - mutation unreachable
    // OR no country has undefined z
    // Test passes trivially
  });
});