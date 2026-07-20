import values = require("../../../../../../../../../../../subject_repositories/pull-stream/sources/values.js");
import abortCb = require("../../../../../../../../../../../subject_repositories/pull-stream/util/abort-cb.js");

describe("values source", () => {
  it("should call onAbort exactly once when aborted, not on normal reads", (done) => {
    let onAbortCallCount = 0;
    const onAbort = () => { onAbortCallCount++; };
    const read = values([1, 2, 3], onAbort);

    // Normal read first
    read(null, (err: any, value: any) => {
      expect(onAbortCallCount).toBe(0);
      // Now abort
      read(true, (err: any) => {
        expect(onAbortCallCount).toBe(1);
        done();
      });
    });
  });
});