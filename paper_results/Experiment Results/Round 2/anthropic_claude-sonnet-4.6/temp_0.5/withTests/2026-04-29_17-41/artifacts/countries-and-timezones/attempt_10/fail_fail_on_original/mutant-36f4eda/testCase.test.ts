import { getTimezonesForCountry, getAllCountries, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return empty array (not [null]) for a country whose non-deprecated timezones list is falsy', () => {
    // Get all countries with deprecated timezones included
    const allWithDeprecated = getAllCountries({ deprecated: true }) as Record<string, any>;
    
    // Find a country where ALL timezones are deprecated (non-deprecated list would be undefined/falsy)
    const allWithoutDeprecated = getAllCountries({ deprecated: false }) as Record<string, any>;
    
    // Find country that has timezones with deprecated:true but undefined timezones without deprecated
    const targetId = Object.keys(allWithDeprecated).find(id => {
      const withDep = allWithDeprecated[id];
      const withoutDep = allWithoutDeprecated[id];
      return withDep.timezones && withDep.timezones.length > 0 && 
             (!withoutDep.timezones || withoutDep.timezones.length === 0);
    });

    expect(targetId).toBeDefined();
    
    const result = getTimezonesForCountry(targetId!, { deprecated: false });
    // Original: values = country.timezones || [] => maps [] => []
    // Mutated:  values = country.timezones || ["Stryker was here"] => maps => [null]
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([]);
  });
});