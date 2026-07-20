import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done() with no active domain", () => {
  it("should not throw when calling done() on a fulfilled promise outside of any domain", (done) => {
    // In Node.js, process.domain is null by default (no active domain).
    // The original code: typeof process === "object" && process && process.domain
    // evaluates to false when process.domain is null, so it skips domain.bind().
    //
    // The mutated code: typeof process === "object" || process && process.domain
    // evaluates to true (since typeof process === "object" is always true in Node),
    // causing process.domain.bind(...) to be called on null, throwing a TypeError.

    let errorCaught: Error | null = null;
    const originalOnerror = Q.onerror;

    Q.onerror = (err: Error) => {
      errorCaught = err;
      Q.onerror = originalOnerror;
      done();
    };

    try {
      // This should work without throwing - done() on a fulfilled promise
      // should call the fulfilled callback and complete normally
      Q.fulfill(42).done(
        function (value: number) {
          expect(value).toBe(42);
          Q.onerror = originalOnerror;
          done();
        },
        function (err: Error) {
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