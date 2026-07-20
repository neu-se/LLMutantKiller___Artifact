import sinon from 'sinon';
import proxyquire from 'proxyquire';
import buildTimezone from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

const totalTimezones = Object.keys(data.timezones).length;

describe('getAllTimezones caching behavior', () => {
  it('should only call buildTimezone once per timezone when called multiple times', () => {
    const buildTimezoneSpy = sinon.spy(buildTimezone);

    const ct = proxyquire('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js', {
      './build-timezone': {
        __esModule: true,
        default: buildTimezoneSpy
      }
    });

    // First call to getAllTimezones - should build all timezones
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(totalTimezones);

    // Second call - should use cached data and not rebuild timezones
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(totalTimezones);

    // Third call - should still use cached data
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(totalTimezones);
  });
});