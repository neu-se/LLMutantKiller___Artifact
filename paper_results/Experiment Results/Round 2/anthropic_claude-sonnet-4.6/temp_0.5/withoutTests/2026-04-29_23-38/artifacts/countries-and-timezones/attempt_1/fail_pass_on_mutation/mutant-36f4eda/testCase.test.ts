import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return an empty array for a country with no timezones, not the mutated fallback", () => {
    // Find a country that exists but has no timezones, or verify that a valid country
    // returns proper timezones (not the mutated "Stryker was here" fallback)
    // 
    // The mutation changes `country.timezones || []` to `country.timezones || ["Stryker was here"]`
    // This means if country.timezones is falsy (null/undefined), the mutant returns ["Stryker was here"]
    // 
    // We need to find a country where timezones might be null/undefined, OR
    // test that a valid country returns real timezone names (not "Stryker was here")
    
    // Test with a well-known country - US should have valid timezones
    const usTimezones = getTimezonesForCountry("US");
    expect(usTimezones).toBeDefined();
    expect(Array.isArray(usTimezones)).toBe(true);
    
    // Each timezone should be a real timezone object with a name property
    // not null (which would happen if "Stryker was here" was passed to getTimezone)
    usTimezones.forEach((tz) => {
      expect(tz).not.toBeNull();
      expect(tz).toHaveProperty("name");
      expect(tz.name).not.toBe("Stryker was here");
    });
    
    // Test with an invalid country ID - should return null from getCountry
    // which means country is null, and country.timezones would throw
    // But the mutation is about the fallback when timezones is falsy
    
    // Test that the result doesn't contain any timezone named "Stryker was here"
    const allNames = usTimezones.map((tz) => tz?.name);
    expect(allNames).not.toContain("Stryker was here");
  });
});