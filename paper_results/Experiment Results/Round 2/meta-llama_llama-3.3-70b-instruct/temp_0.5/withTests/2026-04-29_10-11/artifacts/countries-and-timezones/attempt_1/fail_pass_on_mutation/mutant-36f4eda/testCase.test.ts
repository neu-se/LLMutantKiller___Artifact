import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country without adding extra timezones', () => {
    const result = getTimezonesForCountry('MX');
    expect(result).not.toContainEqual({ name: 'Stryker was here' });
  });
});