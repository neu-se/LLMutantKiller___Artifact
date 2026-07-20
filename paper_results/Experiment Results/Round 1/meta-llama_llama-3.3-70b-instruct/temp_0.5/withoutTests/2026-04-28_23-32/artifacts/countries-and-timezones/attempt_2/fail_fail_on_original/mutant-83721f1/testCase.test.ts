import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should return an empty object when no timezones are memoized', () => {
    const originalMemoizedTimezones = global.memoizedTimezones;
    global.memoizedTimezones = 0;
    const timezones = getAllTimezones({ deprecated: true });
    expect(Object.keys(timezones).length).toBe(0);
    global.memoizedTimezones = originalMemoizedTimezones;
  });
});