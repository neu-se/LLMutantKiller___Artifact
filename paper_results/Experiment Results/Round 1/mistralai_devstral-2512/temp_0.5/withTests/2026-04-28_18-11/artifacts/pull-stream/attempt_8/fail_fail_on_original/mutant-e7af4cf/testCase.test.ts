import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter sync behavior', () => {
  it('should process multiple items in sync mode when filter condition is met', (done) => {
    const testData = [2, 4, 6, 8, 10];
    let syncCount = 0;
    let endCalled = false;

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const item = testData.shift();
      if (item === undefined) return cb(true);
      cb(null, item);
    };

    const trackSync = (read: any) => {
      return (end: any, cb: any) => {
        if (end) {
          if (!endCalled) {
            expect(syncCount).toBeGreaterThan(1);
            endCalled = true;
            done();
          }
          return cb(end);
        }
        read(null, (end: any, data: any) => {
          if (end) {
            if (!endCalled) {
              expect(syncCount).toBeGreaterThan(1);
              endCalled = true;
              done();
            }
            return cb(end);
          }
          syncCount++;
          read(null, (end: any) => {
            if (end && !endCalled) {
              expect(syncCount).toBeGreaterThan(1);
              endCalled = true;
              done();
            }
            cb(end);
          });
        });
      };
    };

    pull(
      source,
      filter((d: number) => d % 2 === 0),
      trackSync
    )(null, (end: any) => {
      if (end && end !== true && !endCalled) {
        done(end);
      }
    });
  }, 5000);
});