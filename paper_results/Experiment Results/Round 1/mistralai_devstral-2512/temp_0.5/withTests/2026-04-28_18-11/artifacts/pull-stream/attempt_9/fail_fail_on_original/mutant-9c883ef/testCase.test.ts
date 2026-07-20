const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe('find with falsy callback', () => {
  it('should handle falsy callback values correctly', (done) => {
    const values = [1, 2, 3, 4, 5];
    let i = 0;

    const testFn = (d: number) => d === 3;
    const callback = (err: any, result: number | null) => {
      expect(err).toBeNull();
      expect(result).toBe(3);
      done();
    };

    // Test with 0 as callback (falsy but not undefined/null)
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
      find(testFn, 0 as any)
    )(null, callback);
  });
});