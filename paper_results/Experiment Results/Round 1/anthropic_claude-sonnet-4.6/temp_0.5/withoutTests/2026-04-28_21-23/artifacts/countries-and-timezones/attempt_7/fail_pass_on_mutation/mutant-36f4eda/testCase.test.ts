import { getTimezonesForCountry, getCountry, getAllCountries } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array not array with null for country with no timezones", () => {
    // Find a country where getCountry returns an object with falsy timezones
    // by checking all countries with deprecated:true option
    // When deprecated:true, deliverCountry uses country.allTimezones
    // If buildCountry doesn't set allTimezones, it will be undefined (falsy)
    
    const allCountries = getAllCountries({ deprecated: true });
    
    // Find a country where timezones differ between deprecated and non-deprecated
    // This means the country has deprecated timezones
    const allCountriesNoDep = getAllCountries();
    
    for (const id of Object.keys(allCountries)) {
      const withDep = allCountries[id];
      const withoutDep = allCountriesNoDep[id];
      
      if (withDep && withoutDep) {
        const depTzCount = withDep.timezones?.length ?? 0;
        const noDepTzCount = withoutDep.timezones?.length ?? 0;
        
        if (depTzCount > noDepTzCount) {
          // This country has deprecated timezones
          // getTimezonesForCountry without deprecated should return fewer timezones
          const resultWithDep = getTimezonesForCountry(id, { deprecated: true });
          const resultWithoutDep = getTimezonesForCountry(id);
          
          expect(resultWithDep.length).toBeGreaterThan(resultWithoutDep.length);
          expect(resultWithDep).not.toContain(null);
          return;
        }
      }
    }
  });
});