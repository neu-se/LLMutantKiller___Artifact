import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter sync behavior', () => {
  it('should process items synchronously when filter condition is met', (done) => {
    const testData = [2, 4, 6, 8, 10];
    let syncCount = 0;

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const item = testData.shift();
      if (item === undefined) return cb(true);
      cb(null, item);
    };

    const trackSync = (read: any) => {
      return (end: any, cb: any) => {
        if (end) return cb(end);
        read(null, (end: any, data: any) => {
          if (end) return cb(end);
          syncCount++;
          read(null, (end: any) => {
            if (end) {
              expect(syncCount).toBeGreaterThan(1);
              done();
              return cb(end);
            }
            cb(null);
          });
        });
      };
    };

    pull(
      source,
      filter((d: number) => d % 2 === 0),
      trackSync
    )(null, (end: any) => {
      if (end && end !== true) return done(end);
    });
  });
});