import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('reduce with two arguments', () => {
  it('should use the second argument as the callback when only two arguments are provided', (done) => {
    const input = [1, 2, 3];
    const reducer = (acc: number, val: number) => acc + val;

    pull(
      pull.values(input),
      reduce(reducer, (err: any, result: number) => {
        expect(err).toBeNull();
        expect(result).toBe(6);
        done();
      })
    );
  });
});