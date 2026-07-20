import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress error propagation", () => {
  it("throws error via uncaughtException when progress callback throws without Q.onerror", (done) => {
    jest.setTimeout(1000);
    
    const deferred = Q.defer();
    const testError = new Error("unique-test-progress-error-12345");

    delete (Q as any).onerror;

    let errorCaught = false;

    const uncaughtHandler = (err: Error) => {
      if (err.message === "unique-test-progress-error-12345") {
        errorCaught = true;
      }
    };

    process.on("uncaughtException", uncaughtHandler);

    deferred.promise.then(null, null, function () {
      throw testError;
    });

    deferred.notify("value");

    // Give time for nextTick to fire
    setImmediate(() => {
      setImmediate(() => {
        process.removeListener("uncaughtException", uncaughtHandler);
        expect(errorCaught).toBe(true);
        done();
      });
    });
  });
});