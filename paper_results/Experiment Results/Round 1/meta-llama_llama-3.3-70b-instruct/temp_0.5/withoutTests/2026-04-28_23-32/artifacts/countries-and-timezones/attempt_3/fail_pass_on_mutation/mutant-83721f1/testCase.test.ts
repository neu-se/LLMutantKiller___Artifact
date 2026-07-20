import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should not memoize all timezones when not all timezones are memoized', () => {
    const originalTimezones = getAllTimezones();
    const timezones = getAllTimezones();
    expect(Object.keys(timezones)).toEqual(Object.keys(originalTimezones));
  });
});