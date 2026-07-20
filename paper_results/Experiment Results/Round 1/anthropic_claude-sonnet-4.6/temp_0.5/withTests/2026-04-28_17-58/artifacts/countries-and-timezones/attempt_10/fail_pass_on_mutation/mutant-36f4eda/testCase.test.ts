import { getTimezonesForCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe('getTimezonesForCountry', () => {
  it('should return valid timezones with deprecated true for country with no deprecated timezones', () => {
    const result = getTimezonesForCountry('CH', { deprecated: true }) as any[];
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).not.toBeNull();
    expect(result[0].name).toBe('Europe/Zurich');
  });
});