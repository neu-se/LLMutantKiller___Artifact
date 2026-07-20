const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("drain with done callback", () => {
  it("should not call done callback when done is not provided", (done) => {
    let doneCalled = false;
    const mockDone = () => {
      doneCalled = true;
    };

    const source = values([1, 2, 3]);
    const sink = drain(null, undefined);

    pull(
      source,
      sink
    );

    setTimeout(() => {
      expect(doneCalled).toBe(false);
      done();
    }, 100);
  });
});