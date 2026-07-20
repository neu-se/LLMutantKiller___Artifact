import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('Timezones cache', () => {
  it('should return timezones without deprecated ones by default', () => {
    const timezones = getAllTimezones();
    const expectedLength = Object.keys(timezones).length;
    getAllTimezones();
    const timezonesAgain = getAllTimezones();
    expect(Object.keys(timezonesAgain).length).toStrictEqual(expectedLength);
  });
});