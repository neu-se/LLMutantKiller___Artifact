import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should not build all timezones by default', () => {
    const initialTimezones = getAllTimezones();
    const allTimezones = getAllTimezones({ deprecated: true });
    expect(Object.keys(initialTimezones).length).toBeLessThan(Object.keys(allTimezones).length);
  });
});