import { getAllTimezones, getTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should not call getAllTimezones when only one timezone is needed', () => {
    const originalTimezones = Object.keys(timezones).length;
    getTimezone(Object.keys(timezones)[0]);
    const timezonesAfter = getAllTimezones();
    expect(Object.keys(timezonesAfter).length).toBeLessThan(originalTimezones);
  });
});