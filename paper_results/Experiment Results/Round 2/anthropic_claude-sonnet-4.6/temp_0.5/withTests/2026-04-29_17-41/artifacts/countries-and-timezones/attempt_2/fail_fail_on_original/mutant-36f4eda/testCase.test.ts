import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return an empty array for a country with no timezones, not an array containing "Stryker was here"', () => {
    // AQ (Antarctica) or a country with empty timezones list triggers the || fallback
    // We need a country that exists but whose timezones property is falsy/empty
    // Use a country known to have timezones and verify the result does not contain "Stryker was here"
    const result = getTimezonesForCountry('KR');
    expect(result).not.toBeNull();
    const names = result!.map((tz: any) => tz.name);
    expect(names).not.toContain('Stryker was here');
    // Now test with a country that has no timezones to trigger the || branch
    const result2 = getTimezonesForCountry('AQ');
    expect(Array.isArray(result2)).toBe(true);
    expect(result2!.length).toBe(0);
  });
});