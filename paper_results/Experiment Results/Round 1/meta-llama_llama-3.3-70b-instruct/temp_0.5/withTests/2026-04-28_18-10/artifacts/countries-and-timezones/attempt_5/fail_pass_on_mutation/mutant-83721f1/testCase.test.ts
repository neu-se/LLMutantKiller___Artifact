import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should return less timezones than the total when not including deprecated', () => {
    const timezones = getAllTimezones();
    const allTimezones = getAllTimezones({ deprecated: true });
    expect(Object.keys(timezones).length).toBeLessThan(Object.keys(allTimezones).length);
  });
});