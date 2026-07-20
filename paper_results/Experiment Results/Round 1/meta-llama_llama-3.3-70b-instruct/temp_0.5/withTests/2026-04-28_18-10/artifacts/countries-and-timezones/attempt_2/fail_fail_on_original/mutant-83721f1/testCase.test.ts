import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getAllTimezones', () => {
  it('should not return all timezones by default', () => {
    const timezones = getAllTimezones();
    const totalTimezones = Object.keys(getAllTimezones({ deprecated: true })).length;
    expect(Object.keys(timezones).length).to.be.lessThan(totalTimezones);
  });
});