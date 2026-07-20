import { reduce } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js";
import { values } from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("reduce with two arguments", () => {
  it("should use the first value as the initial accumulator when no initial value is provided", (done) => {
    const input = [2, 3, 4];
    const reducer = (acc: number, val: number) => acc * val;

    reduce(reducer, (err: any, result: number) => {
      expect(err).toBeNull();
      expect(result).toBe(24); // 2 * 3 * 4
      done();
    })(values(input));
  });
});