const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("reduce with two arguments", () => {
  it("should use the first value as the initial accumulator when no initial value is provided", (done) => {
    pull(
      values([2, 3, 4]),
      reduce((acc: number, val: number) => acc * val, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(24); // 2 * 3 * 4
        done();
      })
    );
  });
});