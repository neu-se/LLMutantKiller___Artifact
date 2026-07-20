const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const reduce = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js");

describe('reduce behavior with two arguments', () => {
  it('should correctly handle reduce with only reducer and callback (no initial value)', (done) => {
    const values = [1, 2, 3, 4];
    const reducer = (acc: number, val: number) => acc + val;

    pull(
      pull.values(values),
      reduce(reducer, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(10); // 1+2+3+4 = 10
        done();
      })
    );
  });
});