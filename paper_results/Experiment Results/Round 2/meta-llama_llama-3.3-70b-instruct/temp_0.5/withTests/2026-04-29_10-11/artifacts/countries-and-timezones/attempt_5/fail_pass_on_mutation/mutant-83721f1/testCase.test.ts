import { getAllTimezones, getTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should only memoize timezones when necessary', () => {
    const originalTimezones = Object.keys(timezones).length;
    const memoizedTimezonesBefore = Object.keys(getAllTimezones()).length;
    getTimezone(Object.keys(timezones)[0]);
    const memoizedTimezonesAfter = Object.keys(getAllTimezones()).length;
    expect(memoizedTimezonesAfter).toBeLessThan(originalTimezones);
  });
});