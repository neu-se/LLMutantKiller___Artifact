import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce sink behavior', () => {
  it('should correctly handle end signal and call callback with accumulated value', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;
    const expectedSum = 6;

    pull(
      pull.values(input),
      reduce(reducer, 0, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(expectedSum);
        done();
      })
    );
  });
});