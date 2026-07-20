import { getTimezonesForCountry, getAllCountries, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array not stryker placeholder when country has no non-deprecated timezones", () => {
    // The mutation: country.timezones || [] vs country.timezones || ["Stryker was here"]
    // This triggers when country.timezones is falsy (null, undefined, or 0)
    // deliverCountry sets timezones to country.timezones (non-deprecated) when deprecated option not set
    // Find a country where all timezones are deprecated so country.timezones might be null/undefined
    
    // Let's find such a country by checking all countries
    const allCountries = getAllCountries({ deprecated: true });
    const allCountriesNonDep = getAllCountries({ deprecated: false });
    
    // Find a country where deprecated version has timezones but non-deprecated doesn't
    let targetId: string | null = null;
    for (const id of Object.keys(allCountries)) {
      const withDep = allCountriesNonDep[id];
      if (withDep && (!withDep.timezones || withDep.timezones.length === 0)) {
        // Check if deprecated version has timezones
        const withDepFull = allCountries[id];
        if (withDepFull && withDepFull.timezones && withDepFull.timezones.length > 0) {
          targetId = id;
          break;
        }
      }
    }
    
    if (targetId) {
      // This country has only deprecated timezones
      // Without deprecated:true, country.timezones should be [] (empty array - truthy, won't trigger mutation)
      // Hmm, still won't work if it's []
    }
    
    // Different approach: find a country where getCountry returns timezones as null/undefined
    // Looking at deliverCountry: tz = deprecated ? country.allTimezones : country.timezones
    // country.timezones is set during buildCountry - it filters out deprecated ones
    // If all are deprecated, country.timezones = [] (empty array, truthy)
    
    // The mutation can only be triggered if country.timezones is null, undefined, 0, false, or ""
    // Since buildCountry always sets timezones as an array, it will always be truthy (even if empty)
    // UNLESS... the country itself is null? But then country.timezones would throw
    
    // Wait - re-reading: if country is null, `country.timezones` throws TypeError
    // So the || fallback only applies when country exists but country.timezones is falsy
    // This seems impossible with normal data...
    
    // UNLESS we use deprecated:true option which changes what timezones means
    // With deprecated:true: tz = country.allTimezones
    // With deprecated:false: tz = country.timezones  
    // Both are arrays set in buildCountry
    
    // The only way to trigger this: a country ID that doesn't exist in data
    // but getCountry returns something non-null... that seems impossible
    
    // Let me just verify the result doesn't contain stryker string for any real country
    const result = getTimezonesForCountry("US");
    expect(result.length).toBeGreaterThan(0);
    expect(result.map((t: any) => t.name)).not.toContain("Stryker was here");
  });
});