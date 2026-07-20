import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce sink behavior', () => {
  it('should handle end condition correctly when source ends', (done) => {
    const values = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;

    pull(
      pull.values(values),
      reduce(reducer, 0, (err, result) => {
        expect(err).toBeNull();
        expect(result).toBe(6);
        done();
      })
    );
  });
});