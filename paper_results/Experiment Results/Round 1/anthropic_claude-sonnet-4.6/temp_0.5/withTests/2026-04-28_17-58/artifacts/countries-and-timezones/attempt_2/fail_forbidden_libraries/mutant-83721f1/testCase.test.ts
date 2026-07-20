import sinon from 'sinon';
import proxyquire from 'proxyquire';
import buildTimezone from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

const totalTimezones = Object.keys((data as any).timezones).length;

describe('getAllTimezones caching behavior', () => {
  it('should not call buildTimezone more than totalTimezones times even when getAllTimezones is called multiple times', () => {
    const buildTimezoneSpy = sinon.spy(buildTimezone);
    const ct = proxyquire('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index', {
      './build-timezone': {
        __esModule: true,
        default: buildTimezoneSpy,
      }
    });

    ct.getAllTimezones();
    const firstCallCount = buildTimezoneSpy.callCount;
    expect(firstCallCount).toBe(totalTimezones);

    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).toBe(totalTimezones);
  });
});