const pull = require("../../../../../../../../../../../subject_repositories/pull-stream/pull.js");
const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
const values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");

describe("drain with done callback", () => {
  it("should call done callback when stream ends with done provided", (done) => {
    let doneCalled = false;
    const mockDone = (err: any) => {
      doneCalled = true;
      expect(err).toBeNull();
    };

    const source = values([1, 2, 3]);
    const sink = drain(null, mockDone);

    pull(
      source,
      sink
    );

    setTimeout(() => {
      expect(doneCalled).toBe(true);
      done();
    }, 100);
  });
});