import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should not throw when there is no active process domain", (done) => {
    // In the mutated code, `if (true)` replaces `if (typeof process === "object" && process && process.domain)`
    // This causes `process.domain.bind(onUnhandledError)` to be called even when process.domain is null,
    // resulting in a TypeError: Cannot read property 'bind' of null
    // The original code only calls process.domain.bind when process.domain is truthy.
    
    // Ensure there is no active domain (normal Node.js test environment)
    // process.domain should be null here
    
    let errorCaught: Error | null = null;
    const originalOnerror = Q.onerror;
    
    Q.onerror = (err: Error) => {
      errorCaught = err;
    };

    try {
      // Call done() on a fulfilled promise - this should work without error
      Q(42).done(
        (value: number) => {
          expect(value).toBe(42);
          Q.onerror = originalOnerror;
          done();
        },
        (err: Error) => {
          Q.onerror = originalOnerror;
          done(err);
        }
      );
    } catch (e) {
      Q.onerror = originalOnerror;
      done(e as Error);
    }
  });
});