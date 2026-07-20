import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done domain handling", () => {
  it("should not throw when done() is called on a rejected promise outside of a domain", (done) => {
    // Ensure no domain is active
    const proc = process as any;
    const originalDomain = proc.domain;
    proc.domain = undefined;

    const originalOnerror = Q.onerror;
    let caughtError: any = null;

    Q.onerror = function (error: any) {
      caughtError = error;
      // Restore and finish
      proc.domain = originalDomain;
      Q.onerror = originalOnerror;
      // The error should be the rejection reason, not a TypeError about undefined.bind
      expect(caughtError).toBe("test-rejection-reason");
      expect(caughtError instanceof TypeError).toBe(false);
      done();
    };

    try {
      // This should trigger onUnhandledError with the rejection reason
      // In the mutated code, it tries to call process.domain.bind(onUnhandledError)
      // when process.domain is undefined, causing a TypeError before onerror is called
      Q.reject("test-rejection-reason").done();
    } catch (e) {
      proc.domain = originalDomain;
      Q.onerror = originalOnerror;
      // In mutated code, a TypeError would be thrown synchronously
      done(new Error("Unexpected synchronous throw: " + e));
    }

    // Timeout fallback
    setTimeout(() => {
      proc.domain = originalDomain;
      Q.onerror = originalOnerror;
      if (!caughtError) {
        done(new Error("onerror was never called"));
      }
    }, 500);
  });
});