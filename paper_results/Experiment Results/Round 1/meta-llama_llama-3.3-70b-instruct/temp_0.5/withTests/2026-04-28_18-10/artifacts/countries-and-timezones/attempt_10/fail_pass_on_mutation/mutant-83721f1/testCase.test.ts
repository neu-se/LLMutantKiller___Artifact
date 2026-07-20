import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should return less timezones than total when not including deprecated', () => {
    const totalTimezones = Object.keys(getAllTimezones({ deprecated: true }));
    const nonDeprecatedTimezones = Object.keys(getAllTimezones());
    expect(nonDeprecatedTimezones.length).toBeLessThan(totalTimezones.length);
  });
});