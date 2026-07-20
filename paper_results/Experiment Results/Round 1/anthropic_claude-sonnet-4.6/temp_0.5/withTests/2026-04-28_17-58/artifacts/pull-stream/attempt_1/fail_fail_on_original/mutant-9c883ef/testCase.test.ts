import { find } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import values from "../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js";

describe("find with single callback argument (no test function)", () => {
  it("should find the first element when called with only a callback and no test function", (done) => {
    const source = values([1, 2, 3, 4, 5]);
    const sink = find(function (err: Error | null, result: number | null) {
      expect(err).toBeNull();
      expect(result).toBe(1);
      done();
    });
    sink(source);
  });
});