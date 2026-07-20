const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe('reduce with two arguments', () => {
  it('should use second argument as callback when only two arguments are provided', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;

    pull(
      values(input),
      reduce(reducer, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(6);
        done();
      })
    );
  });
});