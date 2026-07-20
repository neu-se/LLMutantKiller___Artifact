import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should return a subset of timezones initially', () => {
    const originalTimezones = Object.keys(timezones).length;
    const result = getAllTimezones();
    expect(Object.keys(result).length).toBeLessThan(originalTimezones);
    const allTimezones = Object.keys(timezones).filter(tz => !timezones[tz].deprecated);
    expect(Object.keys(result).length).toBe(allTimezones.length);
  });
});