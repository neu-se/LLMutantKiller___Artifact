import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import buildTimezone from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones memoization condition', () => {
  it('should only memoize timezones when totalTimezones does not equal memoizedTimezones', () => {
    const buildTimezoneSpy = sinon.spy(buildTimezone);
    const totalTimezones = Object.keys(data.timezones).length;

    const ct = proxyquire('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js', {
      './build-timezone': {
        __esModule: true,
        default: buildTimezoneSpy,
      }
    });

    // First call should memoize all timezones
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(totalTimezones);

    // Reset spy to track new calls
    buildTimezoneSpy.resetHistory();

    // Second call should NOT re-memoize if condition is working correctly
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(0);
  });
});