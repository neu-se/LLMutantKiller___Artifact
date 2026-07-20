import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return an empty array (not array with "Stryker was here") when country has no timezones property', () => {
    // Find a country where timezones is undefined/falsy to trigger the || fallback
    // CS (Serbia and Montenegro - dissolved) may have no timezones
    // Try AN (Netherlands Antilles - dissolved)
    const result = getTimezonesForCountry('AN');
    expect(Array.isArray(result)).toBe(true);
    expect(result!.length).toBe(0);
  });
});