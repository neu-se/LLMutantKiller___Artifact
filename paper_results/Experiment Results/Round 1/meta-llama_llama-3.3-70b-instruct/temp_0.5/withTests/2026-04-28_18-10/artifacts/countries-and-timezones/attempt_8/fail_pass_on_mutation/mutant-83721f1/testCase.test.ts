import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should return the same timezones when called twice', () => {
    const firstCallTimezones = getAllTimezones();
    const secondCallTimezones = getAllTimezones();
    expect(Object.keys(firstCallTimezones)).toEqual(Object.keys(secondCallTimezones));
  });
});