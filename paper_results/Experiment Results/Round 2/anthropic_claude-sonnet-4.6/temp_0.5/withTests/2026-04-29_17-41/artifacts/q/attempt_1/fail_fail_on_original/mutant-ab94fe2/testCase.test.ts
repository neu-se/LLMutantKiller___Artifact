import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done error propagation", () => {
  it("should call Q.onerror when a rejected promise is passed to done() with no errback", (done) => {
    const originalOnerror = Q.onerror;
    const testError = new Error("test rejection error");

    Q.onerror = function (error: any) {
      Q.onerror = originalOnerror;
      expect(error).toBe(testError);
      done();
    };

    // Set a timeout to fail the test if Q.onerror is never called (mutant behavior)
    const timeout = setTimeout(() => {
      Q.onerror = originalOnerror;
      done(new Error("Q.onerror was never called - error was silently swallowed"));
    }, 500);

    Q.reject(testError).done();

    // Clear timeout if done() is called first
    const originalDone = done;
    (done as any).__timeout = timeout;
  });
});