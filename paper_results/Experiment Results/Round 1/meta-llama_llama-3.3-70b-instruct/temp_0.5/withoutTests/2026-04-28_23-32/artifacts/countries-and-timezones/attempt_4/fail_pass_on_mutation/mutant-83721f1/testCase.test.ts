import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should not return all timezones initially', () => {
    const timezones = getAllTimezones({ deprecated: false });
    const allTimezones = getAllTimezones({ deprecated: true });
    expect(Object.keys(timezones).length).toBeLessThan(Object.keys(allTimezones).length);
  });
});