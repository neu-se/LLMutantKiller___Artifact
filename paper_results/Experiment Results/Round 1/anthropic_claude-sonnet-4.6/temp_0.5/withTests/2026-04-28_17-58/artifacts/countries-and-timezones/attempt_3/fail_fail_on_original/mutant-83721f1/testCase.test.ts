import proxyquire from 'proxyquire';
import buildTimezone from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

const totalTimezones = Object.keys((data as any).timezones).length;

describe('getAllTimezones caching', () => {
  it('should call buildTimezone exactly totalTimezones times across two getAllTimezones calls', () => {
    let callCount = 0;
    const wrappedBuildTimezone = (...args: Parameters<typeof buildTimezone>) => {
      callCount++;
      return (buildTimezone as any)(...args);
    };

    const ct = proxyquire('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index', {
      './build-timezone': {
        __esModule: true,
        default: wrappedBuildTimezone,
      }
    });

    ct.getAllTimezones();
    ct.getAllTimezones();

    expect(callCount).toBe(totalTimezones);
  });
});