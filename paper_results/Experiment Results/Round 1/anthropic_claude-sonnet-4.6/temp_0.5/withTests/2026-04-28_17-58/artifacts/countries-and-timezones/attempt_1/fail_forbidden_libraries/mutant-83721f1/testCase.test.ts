import { jest } from '@jest/globals';
import buildTimezone from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone';

describe('getAllTimezones caching behavior', () => {
  it('should not call buildTimezone again on second getAllTimezones call when all timezones are already cached', async () => {
    const buildTimezoneSpy = jest.fn(buildTimezone);
    
    jest.resetModules();
    jest.mock('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone', () => ({
      __esModule: true,
      default: buildTimezoneSpy,
    }));

    const { getAllTimezones } = await import('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js');
    
    getAllTimezones();
    const callCountAfterFirst = buildTimezoneSpy.mock.calls.length;
    
    getAllTimezones();
    const callCountAfterSecond = buildTimezoneSpy.mock.calls.length;
    
    expect(callCountAfterSecond).toBe(callCountAfterFirst);
  });
});