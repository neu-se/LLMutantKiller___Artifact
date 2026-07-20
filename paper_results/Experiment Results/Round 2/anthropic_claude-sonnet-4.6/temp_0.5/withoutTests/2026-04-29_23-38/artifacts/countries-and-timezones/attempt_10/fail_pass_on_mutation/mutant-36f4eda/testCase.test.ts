import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("returns null for invalid country id instead of throwing", () => {
    // Original has: if (!country) return null; const values = country.timezones || [];
    // Mutant has: const values = country.timezones || ["Stryker was here"];
    // For invalid country, getCountry returns null
    // Original: null check triggers, returns null
    // Mutant: no null check, null.timezones throws TypeError
    const result = getTimezonesForCountry("INVALID_COUNTRY_CODE");
    expect(result).toBeNull();
  });
});