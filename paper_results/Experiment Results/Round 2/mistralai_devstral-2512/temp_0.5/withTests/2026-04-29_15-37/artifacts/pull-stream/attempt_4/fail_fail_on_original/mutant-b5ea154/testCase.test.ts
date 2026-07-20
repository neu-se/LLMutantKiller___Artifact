const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const map = require("../../../../../../../../../../../subject_repositories/pull-stream/throughs/map.js");

describe('map with null mapper', () => {
  it('should use identity function when mapper is null', (done) => {
    const input = [1, 2, 3, 4, 5];
    const values = pull.values(input);
    pull(
      values,
      map(null),
      pull.collect((err: any, result: any) => {
        expect(err).toBeNull();
        expect(result).toEqual(input);
        done();
      })
    );
  });
});