const pull = require('../../../../../../../../../../../subject_repositories/pull-stream/pull.js');
const asyncMap = require('../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js');

describe('asyncMap identity function behavior', () => {
  it('should pass through data unchanged when map is null', (done) => {
    const input = [1, 2, 3];
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

    pull(
      { source },
      asyncMap(null),
      pull.collect((err: any, results: number[]) => {
        try {
          expect(results).toEqual(input);
          done();
        } catch (error) {
          done(error);
        }
      })
    );
  });
});