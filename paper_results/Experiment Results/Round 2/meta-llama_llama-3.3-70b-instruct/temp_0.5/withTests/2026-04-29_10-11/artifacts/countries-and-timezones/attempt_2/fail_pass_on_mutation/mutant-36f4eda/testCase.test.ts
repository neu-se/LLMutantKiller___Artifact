import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country without adding extra timezones', () => {
    const countryId = 'MX';
    const result = getTimezonesForCountry(countryId);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every(tz => tz.name.startsWith('America/') || tz.name.startsWith('Mexico/'))).toBe(true);
  });
});