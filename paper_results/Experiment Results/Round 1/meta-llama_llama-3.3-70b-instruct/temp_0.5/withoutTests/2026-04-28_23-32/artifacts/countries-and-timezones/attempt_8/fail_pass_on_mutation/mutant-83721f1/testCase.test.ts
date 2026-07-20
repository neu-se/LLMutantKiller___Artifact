import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should only memoize timezones when necessary', () => {
    const initialTimezones = getAllTimezones({ deprecated: false });
    const subsequentTimezones = getAllTimezones({ deprecated: false });
    expect(Object.keys(initialTimezones)).toEqual(Object.keys(subsequentTimezones));
    const initialLength = Object.keys(initialTimezones).length;
    getAllTimezones({ deprecated: true });
    const finalTimezones = getAllTimezones({ deprecated: false });
    expect(Object.keys(finalTimezones)).toEqual(Object.keys(subsequentTimezones));
    expect(Object.keys(finalTimezones).length).toBe(initialLength);
  });
});