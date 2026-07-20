import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress error propagation", () => {
  it("throws when progress callback throws and Q.onerror is not set", (done) => {
    const deferred = Q.defer();
    const testError = new Error("test progress error");

    delete (Q as any).onerror;

    const originalListeners = process.listeners("uncaughtException").slice();
    process.removeAllListeners("uncaughtException");

    let resolved = false;

    process.once("uncaughtException", (err) => {
      originalListeners.forEach((l) => process.on("uncaughtException", l as any));
      if (!resolved) {
        resolved = true;
        expect(err).toBe(testError);
        done();
      }
    });

    deferred.promise.then(null, null, function () {
      throw testError;
    });

    deferred.notify("value");

    setTimeout(() => {
      originalListeners.forEach((l) => process.on("uncaughtException", l as any));
      if (!resolved) {
        resolved = true;
        done(new Error("Expected uncaughtException but none was thrown"));
      }
    }, 200);
  });
});