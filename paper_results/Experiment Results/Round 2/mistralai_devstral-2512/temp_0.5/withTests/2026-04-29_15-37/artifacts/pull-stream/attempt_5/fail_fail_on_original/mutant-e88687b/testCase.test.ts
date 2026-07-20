const drain = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js");

describe("drain abort with function as error", () => {
  it("should handle function as error parameter correctly", (done) => {
    let callbackInvoked = false;
    const sink = drain(null, (err: any) => {
      callbackInvoked = true;
      expect(err).toBe(true);
      done();
    });

    // Call sink.abort with a function as the first argument
    sink.abort(function (err: any) {
      // This should be treated as the callback, not as an error
      expect(err).toBe(true);
    });

    // Simulate a read that will trigger the abort
    const mockRead = (abort: any, cb: any) => {
      if (abort) {
        cb(abort);
      } else {
        cb(null, "data");
      }
    };

    sink(mockRead);

    // Ensure the test fails if the callback isn't invoked
    setTimeout(() => {
      if (!callbackInvoked) {
        done(new Error("Callback was not invoked"));
      }
    }, 100);
  });
});