const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find with callback', () => {
  it('should call callback with found value when cb is provided', (done) => {
    pull(
      pull.values([1, 2, 3, 4, 5]),
      find((d: number) => d === 3, (err: any, result: number | null) => {
        expect(err).toBeNull();
        expect(result).toBe(3);
        done();
      })
    );
  });
});