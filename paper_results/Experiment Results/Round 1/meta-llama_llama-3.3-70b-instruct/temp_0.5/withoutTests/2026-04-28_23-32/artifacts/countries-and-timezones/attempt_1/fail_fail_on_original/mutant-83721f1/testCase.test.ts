import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should not return all timezones when not all timezones are memoized', () => {
    const timezones = getAllTimezones();
    expect(Object.keys(timezones).length).toBeLessThan(100); // assuming there are more than 100 timezones
  });
});