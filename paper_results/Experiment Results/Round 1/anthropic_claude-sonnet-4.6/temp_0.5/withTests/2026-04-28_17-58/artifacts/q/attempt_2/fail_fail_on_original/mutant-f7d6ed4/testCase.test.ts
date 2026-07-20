import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done without active domain", () => {
  it("should call onerror with the rejection reason when no domain is active", (done) => {
    const q = Q as any;
    const originalOnerror = q.onerror;

    // Ensure no domain is active (process.domain should be null/undefined in normal test context)
    // The mutated code will try to call process.domain.bind(...) unconditionally,
    // causing a TypeError since process.domain is null/undefined outside a domain
    let receivedError: any = null;

    q.onerror = function (error: any) {
      receivedError = error;
      q.onerror = originalOnerror;
      expect(receivedError).toBe("expected-rejection");
      done();
    };

    // Outside of a domain, done() on a rejected promise should invoke onerror
    // In the mutated code, it crashes trying to call undefined.bind(...)
    q.reject("expected-rejection").done();

    setTimeout(() => {
      q.onerror = originalOnerror;
      if (!receivedError) {
        done(new Error("onerror was never called - likely crashed due to mutation"));
      }
    }, 300);
  });
});