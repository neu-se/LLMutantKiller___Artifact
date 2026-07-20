import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should not memoize all timezones initially', () => {
    const initialTimezones = getAllTimezones();
    const subsequentTimezones = getAllTimezones();
    expect(Object.keys(initialTimezones).length).toBeLessThanOrEqual(Object.keys(subsequentTimezones).length);
    expect(Object.keys(initialTimezones).length).not.toBe(Object.keys(subsequentTimezones).length);
  });
});