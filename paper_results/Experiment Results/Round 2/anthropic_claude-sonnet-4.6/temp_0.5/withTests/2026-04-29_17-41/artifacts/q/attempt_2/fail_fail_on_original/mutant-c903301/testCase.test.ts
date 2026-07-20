import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error when Q.onerror is not set", () => {
  it("should throw the error (not swallow it) when a progress callback throws and Q.onerror is not set", (done) => {
    const theError = new Error("progress-callback-error-unique-12345");

    // Ensure Q.onerror is not set so we hit the `else { throw e }` branch
    Q.onerror = null;

    const originalListeners = process.listeners("uncaughtException");
    process.removeAllListeners("uncaughtException");

    let errorWasThrownAsUncaught = false;

    process.once("uncaughtException", function (err: Error) {
      if (err === theError) {
        errorWasThrownAsUncaught = true;
        // Restore original listeners
        originalListeners.forEach((l) => process.on("uncaughtException", l));
        expect(errorWasThrownAsUncaught).toBe(true);
        done();
      } else {
        // Restore and re-throw if it's not our error
        originalListeners.forEach((l) => process.on("uncaughtException", l));
        throw err;
      }
    });

    const def = Q.defer();

    def.promise.progress(function () {
      throw theError;
    });

    def.notify("value");
    def.resolve();

    // If the error is never thrown as uncaught, the test should fail
    setTimeout(function () {
      if (!errorWasThrownAsUncaught) {
        originalListeners.forEach((l) => process.on("uncaughtException", l));
        done(new Error("Error from progress callback was silently swallowed instead of being thrown"));
      }
    }, 300);
  });
});