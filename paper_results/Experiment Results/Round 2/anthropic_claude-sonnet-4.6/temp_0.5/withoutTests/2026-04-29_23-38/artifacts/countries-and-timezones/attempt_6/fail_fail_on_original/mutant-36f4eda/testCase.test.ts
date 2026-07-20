import { getTimezonesForCountry, getCountry, getAllCountries } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe("getTimezonesForCountry", () => {
  it("returns empty array not [null] for country referenced by no timezones", () => {
    // buildCountry builds timezone list by scanning data.timezones for country references
    // If no timezone references a country, timezones might be null (not [])
    // Find countries not referenced by any timezone
    const tzData = (data as any).timezones;
    const countriesReferencedByTimezones = new Set<string>();
    Object.values(tzData).forEach((tz: any) => {
      (tz.countries || []).forEach((c: string) => countriesReferencedByTimezones.add(c));
    });

    const allCountryIds = Object.keys((data as any).countries);
    const unreferencedCountries = allCountryIds.filter(
      id => !countriesReferencedByTimezones.has(id)
    );

    expect(unreferencedCountries.length).toBeGreaterThan(0);

    for (const code of unreferencedCountries) {
      const result = getTimezonesForCountry(code);
      // Original: country.timezones is null/undefined, fallback [] → result = []
      // Mutant: fallback ["Stryker was here"] → getTimezone returns null → result = [null]
      expect(result).toEqual([]);
    }
  });
});