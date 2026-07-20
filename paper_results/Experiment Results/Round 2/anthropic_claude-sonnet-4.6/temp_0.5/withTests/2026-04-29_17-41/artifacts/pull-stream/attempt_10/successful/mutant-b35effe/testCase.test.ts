import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find", () => {
  it("should pass actual error to callback when stream ends with an error and no match was found", (done) => {
    const testError = new Error("stream error");

    // Source that ends with an actual error
    const errorSource = (_abort: any, cb: (end: any, data?: any) => void) => {
      cb(testError);
    };

    const sink = find(
      () => false, // never matches
      (err: any, result: any) => {
        // Original: err === true ? null : err  => testError (passes error through)
        // Mutated:  err !== true ? null : err  => null (swallows the error!)
        if (err === null) {
          done(new Error("err was null - error was swallowed (mutation detected)"));
        } else if (err === testError) {
          done();
        } else {
          done(new Error(`Unexpected err value: ${String(err)}`));
        }
      }
    );

    sink(errorSource);
  });
});