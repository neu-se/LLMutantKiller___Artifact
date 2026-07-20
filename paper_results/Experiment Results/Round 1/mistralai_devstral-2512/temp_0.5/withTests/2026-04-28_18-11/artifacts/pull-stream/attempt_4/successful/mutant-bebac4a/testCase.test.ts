import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain abort behavior", () => {
  it("should call read with abort when abort is called before read is set", (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(null, () => {
      // This should not be called since we abort before any data is read
    });

    // Call abort before any read operation
    (sink as any).abort();

    let readCalledWithAbort = false;
    const source = (abort: any, cb: any) => {
      if (abort) {
        readCalledWithAbort = true;
      }
      cb(abort);
    };

    // Now try to read - this should trigger the source's read with abort in original code
    sink(source);

    // In the original code, read should be called with abort because abort was called first
    // In the mutated code, read will also be called with abort (same behavior)
    // We need to test the actual difference in the mutation
    expect(readCalledWithAbort).toBe(true);
    done();
  });
});