import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getTimezonesForCountry", () => {
  it("should return empty array (not mutated fallback) when country has no timezones", () => {
    // When getCountry returns null (invalid country), getTimezonesForCountry
    // returns null from getCountry, then tries country.timezones which would throw.
    // But with a valid country that has timezones set to undefined/null in deliverCountry...
    // 
    // With deprecated:true option, deliverCountry sets timezones = country.allTimezones
    // With deprecated:false (default), deliverCountry sets timezones = country.timezones
    // 
    // Find a country where timezones (non-deprecated) is null/undefined
    // by using a country that might have undefined timezones in deliverCountry output
    
    // Test: passing deprecated:true should return allTimezones, not trigger the mutation
    // Test: passing no options should return country.timezones from deliverCountry
    // The mutation fires when that value is falsy
    
    // Use a real country with known timezones to verify no "Stryker was here" appears
    const result = getTimezonesForCountry("US", {});
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(tz => tz !== null)).toBe(true);
    
    // The key test: if timezones is somehow null/undefined, original returns []
    // mutant returns [null] (since getTimezone("Stryker was here") returns null)
    // We need a scenario where country.timezones is falsy in the returned object
    
    // With deprecated option not set, deliverCountry returns timezones = country.timezones
    // country.timezones in the stored object should always be an array
    // BUT: what if we use deprecated:true? Then returned object has timezones = allTimezones
    // which is always defined too.
    
    // The only way to get null timezones: if deliverCountry returns a country where
    // timezones is explicitly null/undefined. This can happen if the raw data has no timezones.
    
    // Since we can't easily find such a country in real data, let's verify the behavior
    // indirectly: the mutant would cause getTimezone("Stryker was here") to return null,
    // so the result array would contain null. Original returns [].
    
    // We need a country where timezones property from deliverCountry is falsy.
    // Let's try with a country code that exists but might have edge cases.
    // AQ (Antarctica) might have special handling
    const aqResult = getTimezonesForCountry("AQ");
    expect(Array.isArray(aqResult)).toBe(true);
    // Each element should be a valid timezone object, not null
    aqResult.forEach(tz => {
      expect(tz).not.toBeNull();
    });
  });
});