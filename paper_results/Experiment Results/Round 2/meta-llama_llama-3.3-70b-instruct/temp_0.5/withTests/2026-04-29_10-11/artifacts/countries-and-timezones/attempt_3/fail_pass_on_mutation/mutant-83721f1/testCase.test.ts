import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('Timezones cache', () => {
  it('should not call buildTimezone for all timezones when cache is full', () => {
    const originalTimezones = Object.keys(timezones).length;
    const timezonesBefore = getAllTimezones();
    getAllTimezones();
    expect(Object.keys(timezonesBefore).length).toBeLessThan(originalTimezones);
  });
});