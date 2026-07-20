import { getTimezonesForCountry, getAllTimezones, getCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("deprecated:true result has more or equal timezones than default for countries with deprecated tzs", () => {
    const allTzWithDeprecated = getAllTimezones({ deprecated: true });
    const allTzWithout = getAllTimezones();
    
    // Find countries that have deprecated timezones
    const deprecatedTzNames = Object.keys(allTzWithDeprecated).filter(n => !allTzWithout[n]);
    const countriesWithDeprecatedTz = new Set<string>();
    deprecatedTzNames.forEach(name => {
      const tz = allTzWithDeprecated[name] as any;
      (tz.countries || []).forEach((c: string) => countriesWithDeprecatedTz.add(c));
    });
    
    for (const code of countriesWithDeprecatedTz) {
      const withDeprecated = getTimezonesForCountry(code, { deprecated: true });
      const withoutDeprecated = getTimezonesForCountry(code);
      
      if (!Array.isArray(withDeprecated) || !Array.isArray(withoutDeprecated)) continue;
      
      expect(withDeprecated.length).toBeGreaterThanOrEqual(withoutDeprecated.length);
      expect(withDeprecated).not.toContain(null);
    }
  });
});