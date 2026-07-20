import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should not call getAllTimezones with all timezones by default', () => {
    const initialTimezones = getAllTimezones();
    const allTimezones = getAllTimezones();
    expect(Object.keys(initialTimezones)).toEqual(Object.keys(allTimezones));
  });
});