import { getCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should export the getCountry function', () => {
    expect(getCountry).toBeInstanceOf(Function);
    expect(getCountry('US')).toBeDefined();
  });
});