import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones', () => {
  it('should not return all timezones by default', () => {
    const defaultTimezones = getAllTimezones();
    expect(Object.keys(defaultTimezones).length).toBeLessThan(Object.keys(timezones).length);
  });
});