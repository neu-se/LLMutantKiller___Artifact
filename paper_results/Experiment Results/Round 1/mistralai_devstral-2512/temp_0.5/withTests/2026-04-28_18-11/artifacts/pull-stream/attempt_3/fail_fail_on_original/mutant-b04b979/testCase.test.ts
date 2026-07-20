const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js');

describe('asyncMap identity function behavior', () => {
  it('should pass through data unchanged when map is null', (done) => {
    const input = [1, 2, 3, 4, 5];
    let index = 0;

    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else if (index >= input.length) {
        cb(true);
      } else {
        cb(null, input[index++]);
      }
    };

    const read = pull(null)(source);

    const results: number[] = [];
    const expected = [...input];

    const drain = (abort: any, cb: (end: any, data?: any) => void) => {
      read(abort, (end: any, data?: any) => {
        if (end === true) {
          try {
            expect(results).toEqual(expected);
            done();
          } catch (error) {
            done(error);
          }
        } else if (end) {
          done(end);
        } else {
          results.push(data);
          cb(null);
        }
      });
    };

    drain(null, () => {});
  });
});