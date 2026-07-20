import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort with custom error", () => {
  it("should pass the custom abort error to the source when op returns false and abort is set", (done) => {
    const customError = new Error("custom abort error");
    let abortValueReceived: any = undefined;

    // Create a source that records what abort value it receives
    function source(abort: any, cb: (end: any, data?: any) => void) {
      if (abort) {
        abortValueReceived = abort;
        cb(abort);
        return;
      }
      // Always provide data synchronously
      cb(null, 1);
    }

    const sink = drain(
      function op(data: any) {
        // Return false to trigger the abort path
        return false;
      },
      function done(err: any) {
        // After stream ends, check that the abort value passed to source was the custom error
        expect(abortValueReceived).toBe(customError);
        done_called = true;
        done_resolve();
      }
    );

    let done_called = false;
    let done_resolve: () => void;

    const promise = new Promise<void>((resolve) => {
      done_resolve = resolve;
    });

    // Set abort to custom error before connecting source
    sink.abort(customError);
    sink(source);

    promise.then(() => {
      expect(done_called).toBe(true);
      done();
    });
  });
});