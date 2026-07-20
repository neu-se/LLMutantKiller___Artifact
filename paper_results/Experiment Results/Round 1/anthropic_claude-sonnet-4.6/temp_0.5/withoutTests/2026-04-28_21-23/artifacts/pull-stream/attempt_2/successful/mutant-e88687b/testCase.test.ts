import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain abort with callback as first argument", () => {
  it("should call the callback when a function is passed as the first argument to abort", (done) => {
    // A source that is always async
    const source = (end: any, cb: (end: any, data?: any) => void) => {
      if (end) {
        cb(end);
        return;
      }
      setImmediate(() => {
        cb(null, 42);
      });
    };

    const sink = drain(() => {});
    sink(source);

    // After sink is connected and reading, abort with just a callback function
    setImmediate(() => {
      let callbackInvoked = false;
      sink.abort((err: any) => {
        callbackInvoked = true;
        // In original: cb = err (the function), err = true, so read(true, callback) is called
        // The source calls callback(true), so err here is true
        expect(err).toBe(true);
        done();
      });

      // In mutated code, the callback is never invoked because the function is used as abort error
      // and cb becomes undefined, so the noop function is used instead
      setTimeout(() => {
        if (!callbackInvoked) {
          done(new Error("callback was never invoked - mutation detected"));
        }
      }, 100);
    });
  });
});