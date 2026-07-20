import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe("getTimezonesForCountry", () => {
  it("returns empty array not [null] for countries with no timezones in raw data", () => {
    // Find countries where raw data has null/undefined/empty timezones
    const countriesWithNoTimezones = Object.entries((data as any).countries)
      .filter(([, country]: [string, any]) => !country.timezones || country.timezones.length === 0)
      .map(([code]) => code);

    expect(countriesWithNoTimezones.length).toBeGreaterThan(0);

    for (const code of countriesWithNoTimezones) {
      const result = getTimezonesForCountry(code);
      // Original: country.timezones is falsy, fallback [] → result = []
      // Mutant: fallback ["Stryker was here"] → getTimezone returns null → result = [null]
      expect(result).toEqual([]);
    }
  });
});