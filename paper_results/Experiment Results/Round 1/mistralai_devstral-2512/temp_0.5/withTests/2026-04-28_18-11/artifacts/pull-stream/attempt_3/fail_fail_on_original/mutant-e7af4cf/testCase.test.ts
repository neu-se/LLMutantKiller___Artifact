import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js';
import filter from '../../../../../../../../../../../subject_repositories/pull-stream/throughs/filter.js';

describe('filter sync behavior', () => {
  it('should process data synchronously when filter condition is met', (done) => {
    const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const expectedFiltered = [2, 4, 6, 8, 10];

    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      const item = testData.shift();
      if (item === undefined) return cb(true);
      cb(null, item);
    };

    const collect = (cb: any) => {
      const results: number[] = [];
      return (end: any, data: any) => {
        if (end) {
          if (end === true) return cb(null, results);
          return cb(end);
        }
        results.push(data);
      };
    };

    pull(
      source,
      filter((d: number) => d % 2 === 0),
      pull.drain(collect((err: any, data: any) => {
        if (err) return done(err);
        expect(data).toEqual(expectedFiltered);
        done();
      }))
    );
  });
});