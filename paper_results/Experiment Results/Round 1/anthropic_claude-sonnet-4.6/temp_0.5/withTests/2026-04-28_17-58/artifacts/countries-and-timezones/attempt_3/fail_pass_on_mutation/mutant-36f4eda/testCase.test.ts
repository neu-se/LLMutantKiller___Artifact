import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return array of valid timezone objects for a real country, with no "Stryker was here" entry', () => {
    const result = getTimezonesForCountry('KR');
    expect(result).not.toBeNull();
    expect(Array.isArray(result)).toBe(true);
    // In mutated code, if country.timezones is falsy, result would contain a timezone named "Stryker was here"
    // which would return null from getTimezone, making result = [null]
    expect(result).toHaveLength(1);
    expect((result as any[])[0]).not.toBeNull();
    expect((result as any[])[0].name).toBe('Asia/Seoul');
  });
});