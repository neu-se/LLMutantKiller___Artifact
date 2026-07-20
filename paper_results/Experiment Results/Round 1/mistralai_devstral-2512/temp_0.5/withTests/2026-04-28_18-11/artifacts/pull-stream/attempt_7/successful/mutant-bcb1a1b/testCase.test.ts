const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('reduce with two arguments', () => {
  it('should handle reduce with exactly two arguments differently than with three', (done) => {
    const input = [2, 3, 4];
    const reducer = (acc: number, val: number) => acc * val;

    // Test with exactly 2 arguments (reducer and callback)
    pull(
      values(input),
      reduce(reducer, (err: any, result: number) => {
        // In original code: should use first value (2) as initial accumulator
        // In mutated code: will try to use callback as initial value
        expect(err).toBeNull();
        expect(result).toBe(24); // 2*3*4 = 24
        done();
      })
    );
  });
});