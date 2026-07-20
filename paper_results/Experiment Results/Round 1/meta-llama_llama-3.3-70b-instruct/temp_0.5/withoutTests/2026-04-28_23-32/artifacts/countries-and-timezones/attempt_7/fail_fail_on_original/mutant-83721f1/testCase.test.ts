import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should not return all timezones when totalTimezones does not equal memoizedTimezones', () => {
    const timezones1 = getAllTimezones();
    const timezones2 = getAllTimezones();
    expect(Object.keys(timezones1).length).toBeLessThan(Object.keys(timezones2).length);
  });
});