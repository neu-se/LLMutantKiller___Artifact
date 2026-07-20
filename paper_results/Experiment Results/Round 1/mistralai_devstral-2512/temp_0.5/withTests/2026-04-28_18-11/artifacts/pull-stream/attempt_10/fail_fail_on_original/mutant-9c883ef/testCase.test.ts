const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find callback parameter handling', () => {
  it('should correctly handle when callback is not provided', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    const testFn = (d: number) => d === 3;

    pull(
      (end: any, cb: any) => {
        if (end) {
          cb(true);
        } else if (i < values.length) {
          cb(null, values[i++]);
        } else {
          cb(true);
        }
      },
      find(testFn)
    )(null, (end: any, result: number | null) => {
      expect(end).toBeNull();
      expect(result).toBe(3);
      done();
    });
  });
});