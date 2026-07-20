import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should not return all timezones initially', () => {
    const originalTimezones = Object.keys(timezones).length;
    const timezonesBefore = getAllTimezones();
    expect(Object.keys(timezonesBefore).length).toBeLessThan(originalTimezones);
    getAllTimezones();
    const timezonesAfter = getAllTimezones();
    expect(Object.keys(timezonesAfter).length).toBeLessThan(originalTimezones);
  });
});