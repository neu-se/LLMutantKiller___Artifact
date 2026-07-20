import { getCountry, getAllTimezones, getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("returns empty array not [null] for country with only deprecated timezones", () => {
    // Get all deprecated timezones to find countries that only have deprecated timezones
    const allTzWithDeprecated = getAllTimezones({ deprecated: true });
    const allTzWithoutDeprecated = getAllTimezones();
    
    // Find deprecated timezones
    const deprecatedTzNames = Object.keys(allTzWithDeprecated).filter(
      name => !allTzWithoutDeprecated[name]
    );
    
    // Find countries that appear ONLY in deprecated timezones
    const countriesInDeprecated = new Set<string>();
    const countriesInNonDeprecated = new Set<string>();
    
    Object.values(allTzWithDeprecated).forEach((tz: any) => {
      if (tz.deprecated) {
        (tz.countries || []).forEach((c: string) => countriesInDeprecated.add(c));
      } else {
        (tz.countries || []).forEach((c: string) => countriesInNonDeprecated.add(c));
      }
    });
    
    // Countries that only appear in deprecated timezones
    const onlyDeprecatedCountries = [...countriesInDeprecated].filter(
      c => !countriesInNonDeprecated.has(c)
    );
    
    if (onlyDeprecatedCountries.length > 0) {
      const testCountry = onlyDeprecatedCountries[0];
      const result = getTimezonesForCountry(testCountry);
      // Original: country.timezones is null/undefined/[], falls back to []
      // Mutant: falls back to ["Stryker was here"], getTimezone returns null, result = [null]
      expect(result).toEqual([]);
      expect(result).not.toContain(null);
    }
  });
});