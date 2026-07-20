import sinon from 'sinon';
import proxyquire from 'proxyquire';
import { buildTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-timezone';
import { timezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

const totalTimezones = Object.keys(timezones).length;

describe('Timezones cache', () => {
  const buildTimezoneSpy = sinon.spy(buildTimezone);
  let ct;

  beforeEach(() => {
    buildTimezoneSpy.resetHistory();
    ct = proxyquire('../../../../../../../../../subject_repositories/countries-and-timezones/src/index', {
      './build-timezone': {
        __esModule: true,
        default: buildTimezoneSpy
      }
    });
  });

  it('should call "buildTimezone" once for each timezone when requesting all timezones only when necessary', () => {
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
    ct.getAllTimezones();
    expect(buildTimezoneSpy.callCount).to.be.equal(totalTimezones);
  });
});