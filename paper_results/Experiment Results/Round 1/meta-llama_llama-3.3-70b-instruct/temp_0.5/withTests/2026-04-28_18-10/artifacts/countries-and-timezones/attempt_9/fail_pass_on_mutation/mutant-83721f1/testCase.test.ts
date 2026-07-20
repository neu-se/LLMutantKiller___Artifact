import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones', () => {
  it('should not load all timezones initially', () => {
    const loadedTimezones = getAllTimezones();
    expect(Object.keys(loadedTimezones).length).toBeLessThan(Object.keys(timezones).length);
  });
});