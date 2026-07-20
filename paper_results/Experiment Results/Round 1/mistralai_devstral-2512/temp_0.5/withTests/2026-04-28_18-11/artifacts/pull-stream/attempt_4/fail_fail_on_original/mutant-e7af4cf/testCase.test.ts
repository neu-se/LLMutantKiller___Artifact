import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter sync behavior', () => {
  it('should process data synchronously when filter condition is met', (done) => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [2, 4, 6, 8, 10];
    const results: number[] = [];

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const item = testData.shift();
      if (item === undefined) return cb(true);
      cb(null, item);
    };

    const drain = (data: any) => {
      results.push(data);
    };

    const onEnd = (err: any) => {
      if (err) return done(err);
      expect(results).toEqual(expectedFiltered);
      done();
    };

    pull(
      source,
      filter((d: number) => d % 2 === 0),
      (read: any) => {
        return (end: any, cb: any) => {
          if (end) return cb(end);
          read(null, (end: any, data: any) => {
            if (end) {
              onEnd(end);
              return cb(end);
            }
            drain(data);
            read(null, (end: any) => {
              onEnd(end);
              cb(end);
            });
          });
        };
      }
    )(null, (end: any) => {
      if (end && end !== true) return done(end);
    });
  });
});