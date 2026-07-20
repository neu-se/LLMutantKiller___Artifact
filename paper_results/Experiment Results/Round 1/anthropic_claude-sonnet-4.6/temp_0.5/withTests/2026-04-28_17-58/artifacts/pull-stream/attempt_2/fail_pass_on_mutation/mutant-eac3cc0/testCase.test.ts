import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain", () => {
  it("should terminate the source when op returns false (no prior abort set)", (done) => {
    let doneCalled = false;
    let itemsProduced = 0;

    // A synchronous infinite source
    function infiniteSource(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        cb(abort);
        return;
      }
      cb(null, itemsProduced++);
    }

    const timeoutId = setTimeout(() => {
      if (!doneCalled) {
        // done was never called - this is what happens with the mutation
        // (read(false, done) doesn't abort the source)
        done(new Error("done callback was never called - stream did not terminate"));
      }
    }, 500);

    const sink = drain(
      (data: any) => {
        // Return false after receiving first item to signal stop
        if (data === 0) return false;
      },
      (err: any) => {
        doneCalled = true;
        clearTimeout(timeoutId);
        // In the original code, done is called (with true as the abort signal)
        // The important thing is that done IS called, meaning the stream terminated
        done();
      }
    );

    sink(infiniteSource);
  });
});