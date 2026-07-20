import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";
import reduce from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe('reduce sink behavior', () => {
  it('should correctly handle end signal when source ends', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;
    const expectedSum = 6;

    pull(
      values(input),
      reduce(reducer, 0, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(expectedSum);
        done();
      })
    );
  });
});