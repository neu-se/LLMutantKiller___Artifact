import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return null for a non-existent country, not an array with "Stryker was here"', () => {
    const result = getTimezonesForCountry('NOT_EXISTENT_COUNTRY');
    expect(result).toBeNull();
  });
});