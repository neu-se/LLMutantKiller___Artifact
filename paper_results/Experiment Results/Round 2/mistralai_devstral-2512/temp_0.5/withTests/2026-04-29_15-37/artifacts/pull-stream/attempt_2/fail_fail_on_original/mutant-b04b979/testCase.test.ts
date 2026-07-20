const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const asyncMap = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/async-map.js");

describe('asyncMap with null mapper', () => {
  it('should pass through values when mapper is null', (done) => {
    const input = [1, 2, 3, 4, 5];
    const expected = [1, 2, 3, 4, 5];

    pull(
      pull.values(input),
      asyncMap(null),
      pull.collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(expected);
        done();
      })
    );
  });
});