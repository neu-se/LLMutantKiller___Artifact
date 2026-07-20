import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";
import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain error handling", () => {
  it("should throw error when end is not true and no done callback", (done) => {
    const error = new Error("test error");
    const source = pull.values([1, 2, 3]);
    const sink = drain(null, undefined);

    let hasThrown = false;
    try {
      pull(source, sink);
      sink(error, () => {});
    } catch (e) {
      hasThrown = true;
    }

    // Give time for async operations to complete
    setImmediate(() => {
      expect(hasThrown).toBe(true);
      done();
    });
  });
});