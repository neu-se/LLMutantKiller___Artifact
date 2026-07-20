import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress callback error propagation", () => {
  it("throws error from progress callback when Q.onerror is not set", (done) => {
    const deferred = Q.defer();
    const error = new Error("test progress error");
    // Ensure Q.onerror is not set
    (Q as any).onerror = null;

    let errorCaught = false;
    const timeoutHandle = setTimeout(() => {
      // If we reach here, the error was NOT thrown (mutated behavior)
      process.removeListener("uncaughtException", handler);
      done(new Error("Expected uncaughtException to be thrown but it was swallowed"));
    }, 500);

    function handler(e: Error) {
      clearTimeout(timeoutHandle);
      if (e === error) {
        errorCaught = true;
        done();
      } else {
        done(e);
      }
    }

    process.once("uncaughtException", handler);

    deferred.promise.then(null, null, () => { throw error; });
    deferred.notify("value");
  });
});