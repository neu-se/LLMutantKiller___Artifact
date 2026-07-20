import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js"

describe("drain sink abort", () => {
  it("should call read with abort when sink.abort() is called after read is set", (done) => {
    // Create a source that tracks whether it was aborted
    let abortCalled = false;
    let readCallCount = 0;

    function source(end: any, cb: Function) {
      readCallCount++;
      if (end) {
        abortCalled = true;
        cb(end, null);
        return;
      }
      // Simulate async data
      setTimeout(() => {
        cb(null, readCallCount);
      }, 10);
    }

    const sink = drain(
      (data: any) => {
        // After first data, abort the stream
        if (data === 1) {
          sink.abort(new Error("test abort"), (err: any) => {
            // The abort callback should be called when original code runs
            // In mutated code, read is never called with abort, so this callback may never fire
            expect(abortCalled).toBe(true);
            done();
          });
        }
      },
      (err: any) => {
        // done callback - may be called
      }
    );

    sink(source);

    // Timeout to detect if abort callback was never called (mutation case)
    const timeout = setTimeout(() => {
      if (!abortCalled) {
        done(new Error("abort was never called on read - mutation detected"));
      }
    }, 500);

    // Clean up timeout if test completes normally
    const originalDone = done;
  });
});