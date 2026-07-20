import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress error propagation without Q.onerror", () => {
  it("should propagate errors thrown in progress callbacks when Q.onerror is not set", (done) => {
    const theError = new Error("progress error test");
    const def = Q.defer();

    // Ensure Q.onerror is not set
    Q.onerror = null;

    def.promise.progress(function () {
      throw theError;
    });

    // Listen for uncaught exceptions - in the original code, the error is re-thrown
    // via setTimeout when Q.onerror is not set
    const originalListeners = process.listeners("uncaughtException");
    process.removeAllListeners("uncaughtException");

    let caughtError: Error | null = null;
    process.once("uncaughtException", function (err) {
      caughtError = err;
      // Restore original listeners
      originalListeners.forEach(l => process.on("uncaughtException", l));
      expect(caughtError).toBe(theError);
      done();
    });

    // If the error is swallowed (mutant), done won't be called via uncaughtException
    setTimeout(function () {
      if (!caughtError) {
        originalListeners.forEach(l => process.on("uncaughtException", l));
        done(new Error("Expected error to be thrown but it was swallowed"));
      }
    }, 200);

    def.notify("value");
    def.resolve();
  });
});