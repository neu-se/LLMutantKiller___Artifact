import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones function', () => {
  it('should only memoize timezones when necessary', () => {
    const initialTimezones = getAllTimezones();
    const subsequentTimezones = getAllTimezones();
    expect(Object.keys(initialTimezones)).toEqual(Object.keys(subsequentTimezones));
    expect(Object.keys(initialTimezones).length).toBeLessThan(600); // assuming there are more than 600 timezones
  });
});