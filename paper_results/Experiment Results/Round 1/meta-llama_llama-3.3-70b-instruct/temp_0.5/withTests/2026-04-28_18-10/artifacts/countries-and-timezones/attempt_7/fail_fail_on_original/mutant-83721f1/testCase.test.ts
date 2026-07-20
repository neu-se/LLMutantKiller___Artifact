import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should not return all timezones by default when called twice', () => {
    const firstCallTimezones = getAllTimezones();
    const secondCallTimezones = getAllTimezones();
    expect(Object.keys(firstCallTimezones)).not.toEqual(Object.keys(secondCallTimezones));
  });
});