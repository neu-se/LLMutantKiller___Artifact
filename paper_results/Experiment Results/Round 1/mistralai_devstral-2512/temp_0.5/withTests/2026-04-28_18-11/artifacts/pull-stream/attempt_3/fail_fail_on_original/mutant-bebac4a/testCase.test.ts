import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain abort behavior", () => {
  it("should not call read when abort is called before read is set", (done) => {
    const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");
    const sink = drain(null, () => {
      // This should not be called since we abort before any data is read
    });

    // Call abort before any read operation
    (sink as any).abort();

    let readCalled = false;
    const source = (abort: any, cb: any) => {
      readCalled = true;
      cb(abort);
    };

    // Now try to read - this should not trigger the source's read in original code
    sink(source);

    // In the original code, read should not be called because abort was called first
    // In the mutated code, read will be called because the condition is always true
    expect(readCalled).toBe(false);
    done();
  });
});