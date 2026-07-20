import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should not return all timezones when not all are memoized', () => {
    const originalTimezones = Object.keys(timezones).length;
    const timezonesBefore = getAllTimezones();
    expect(Object.keys(timezonesBefore).length).toBeLessThan(originalTimezones);
  });
});