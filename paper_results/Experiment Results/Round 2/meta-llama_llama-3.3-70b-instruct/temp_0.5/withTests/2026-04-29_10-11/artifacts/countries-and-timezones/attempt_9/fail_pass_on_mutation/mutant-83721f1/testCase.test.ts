import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should not memoize all timezones on first call', () => {
    const originalTimezones = Object.keys(timezones).length;
    const firstCall = getAllTimezones();
    expect(Object.keys(firstCall).length).toBeLessThan(originalTimezones);
    const secondCall = getAllTimezones();
    expect(Object.keys(secondCall).length).toBeLessThan(originalTimezones);
  });
});