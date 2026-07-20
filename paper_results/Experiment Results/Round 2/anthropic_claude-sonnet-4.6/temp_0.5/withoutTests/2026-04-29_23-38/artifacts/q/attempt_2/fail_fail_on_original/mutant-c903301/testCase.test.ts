import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q progress error propagation", () => {
  it("throws synchronously when progress callback throws and Q.onerror is not set", () => {
    const deferred = Q.defer();
    const testError = new Error("test progress error");

    // Ensure Q.onerror is not set
    delete (Q as any).onerror;

    deferred.promise.then(null, null, function () {
      throw testError;
    });

    // In the original, throw e propagates synchronously through promiseDispatch
    // In the mutant, it is silently swallowed
    let caughtError: Error | null = null;
    try {
      deferred.notify("value");
    } catch (e) {
      caughtError = e as Error;
    }

    expect(caughtError).toBe(testError);
  });
});