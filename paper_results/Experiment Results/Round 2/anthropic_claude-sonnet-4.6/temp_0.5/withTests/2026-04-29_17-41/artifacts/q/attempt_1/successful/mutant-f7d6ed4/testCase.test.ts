import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should handle rejected promise via done without throwing when no domain is active", (done) => {
    // In Node.js, process.domain is null when no domain is active.
    // The original code checks: typeof process === "object" && process && process.domain
    // The mutated code checks: typeof process === "object" && process || process.domain
    // In the mutated version, the condition is always true in Node.js (since process is an object),
    // causing process.domain.bind(...) to be called when process.domain is null, throwing a TypeError.

    const error = new Error("test rejection");

    Q.onerror = function (err: Error) {
      expect(err).toBe(error);
      Q.onerror = null;
      done();
    };

    // This should work without throwing - the done() method should catch the rejection
    // and forward it to Q.onerror (or throw in next tick), not crash due to null.bind()
    Q.reject(error).done();

    // If mutated code throws synchronously or causes unhandled error, the test will fail
    setTimeout(() => {
      // If we reach here without done() being called, something went wrong
    }, 200);
  });
});