// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it.skip('should return correct timezones for country without additional values', () => {
    const result = ct.getTimezonesForCountry('MX');
    const expectedResult = ct.getTimezone('America/Mexico_City');
    expect(result[0].name).toStrictEqual(expectedResult.name);
  });

  it.skip('should return correct timezones for country with deprecated option', () => {
    const result = ct.getTimezonesForCountry('MX', { deprecated: true });
    const expectedResult = ct.getTimezone('America/Mexico_City');
    expect(result[0].name).toStrictEqual(expectedResult.name);
  });

  it('should not return additional values for country', () => {
    const result = ct.getTimezonesForCountry('MX');
    expect(result).not.toContainEqual({ name: 'Stryker was here' });
  });
});