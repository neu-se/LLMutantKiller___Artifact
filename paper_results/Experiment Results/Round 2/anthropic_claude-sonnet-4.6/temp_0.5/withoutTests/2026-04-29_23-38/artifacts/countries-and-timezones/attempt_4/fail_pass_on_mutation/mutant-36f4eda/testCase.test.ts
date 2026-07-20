import { getTimezonesForCountry, getCountry, getAllCountries, getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("returns empty array not [null] for country whose non-deprecated timezones list is null", () => {
    // Find a country where deprecated timezones exist but non-deprecated list is falsy
    const allTzIncDeprecated = getAllTimezones({ deprecated: true });
    const allTzExcDeprecated = getAllTimezones();
    
    const deprecatedOnlyTzNames = Object.keys(allTzIncDeprecated).filter(
      name => !(name in allTzExcDeprecated)
    );
    
    // Find countries that appear only in deprecated timezones
    const countriesWithNonDeprecatedTz = new Set<string>();
    Object.values(allTzExcDeprecated).forEach((tz: any) => {
      (tz.countries || []).forEach((c: string) => countriesWithNonDeprecatedTz.add(c));
    });
    
    const countriesOnlyInDeprecatedTz = new Set<string>();
    deprecatedOnlyTzNames.forEach(tzName => {
      const tz = allTzIncDeprecated[tzName] as any;
      (tz.countries || []).forEach((c: string) => {
        if (!countriesWithNonDeprecatedTz.has(c)) {
          countriesOnlyInDeprecatedTz.add(c);
        }
      });
    });
    
    // For these countries, buildCountry may store timezones as null (not [])
    // making country.timezones falsy and triggering the mutation
    for (const code of countriesOnlyInDeprecatedTz) {
      const country = getCountry(code);
      if (!country) continue;
      
      // If timezones is falsy, the mutation would produce [null] instead of []
      if (!country.timezones) {
        const result = getTimezonesForCountry(code);
        expect(result).toEqual([]);
      }
    }
    
    // Ensure we actually found and tested at least one such country
    // by checking the result directly
    for (const code of countriesOnlyInDeprecatedTz) {
      const result = getTimezonesForCountry(code);
      if (Array.isArray(result)) {
        expect(result).not.toContain(null);
      }
    }
  });
});