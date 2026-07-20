const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("drain error handling", () => {
  it("should throw error when end is not true and no done callback", (done) => {
    const error = new Error("test error");
    const source = values([1, 2, 3]);
    const sink = drain(null, undefined);

    let hasThrown = false;
    try {
      pull(source, sink);
      sink(error, () => {});
    } catch (e) {
      hasThrown = true;
    }

    setImmediate(() => {
      expect(hasThrown).toBe(true);
      done();
    });
  });
});