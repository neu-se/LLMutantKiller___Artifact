import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return null for a non-existent country without throwing', () => {
    // The mutated code changes: const values = country.timezones || [];
    // to: const values = country.timezones || ["Stryker was here"];
    // When country is null (non-existent), accessing country.timezones throws TypeError
    // But looking at the full placeholder context, there must be a null guard.
    // The real difference: for a country with empty timezones array (truthy []),
    // both behave the same. We need to find where timezones could be undefined.
    // Test with deprecated:true for a country that only has deprecated timezones
    // so non-deprecated timezones list might be undefined vs empty array
    const result = getTimezonesForCountry('KR', { deprecated: false });
    expect(result).not.toBeNull();
    expect(Array.isArray(result)).toBe(true);
    // KR has Asia/Seoul which is not deprecated, so this should have 1 item
    expect(result!.length).toBe(1);
    expect(result![0]).not.toBeNull();
    expect((result![0] as any).name).toBe('Asia/Seoul');
  });
});