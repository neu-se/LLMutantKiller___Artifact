import { getAllTimezones, getTimezonesForCountry, getAllCountries } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array not [null] for country whose timezones are all deprecated", () => {
    const allTzWithDep = getAllTimezones({ deprecated: true });
    const allTzNoDep = getAllTimezones();
    
    // Find deprecated-only timezones
    const deprecatedOnlyTzNames = Object.keys(allTzWithDep).filter(
      name => !allTzNoDep[name]
    );
    
    // Find countries that only have deprecated timezones
    const allCountries = getAllCountries({ deprecated: true });
    
    for (const [id, country] of Object.entries(allCountries) as any) {
      const tzList = country.timezones || [];
      const allDeprecatedOnly = tzList.length > 0 && tzList.every((tz: string) => deprecatedOnlyTzNames.includes(tz));
      
      if (allDeprecatedOnly) {
        // This country only has deprecated timezones
        // Without deprecated:true, country.timezones should be [] or undefined
        const result = getTimezonesForCountry(id);
        // Original: [] (empty array)
        // Mutant: [null] if country.timezones is falsy
        expect(result).toEqual([]);
        return; // Found one, test passes
      }
    }
  });
});