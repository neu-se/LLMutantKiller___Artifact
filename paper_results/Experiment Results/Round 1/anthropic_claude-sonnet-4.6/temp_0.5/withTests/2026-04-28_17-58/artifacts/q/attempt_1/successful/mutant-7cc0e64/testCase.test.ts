import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should call the fulfilled callback without throwing when there is no active process domain", (done) => {
    // In the mutated code, `if (true)` replaces `if (typeof process === "object" && process && process.domain)`,
    // causing it to always attempt `process.domain.bind(onUnhandledError)`.
    // When process.domain is null/undefined (no active domain), this throws a TypeError.
    // The original code only binds when a domain is actually active.
    const results: number[] = [];

    Q(42)
      .done(
        function (value: number) {
          results.push(value);
        },
        function (err: unknown) {
          done(new Error("Should not have been rejected: " + err));
        }
      );

    // Give the async resolution a chance to run
    setTimeout(() => {
      expect(results).toEqual([42]);
      done();
    }, 100);
  });
});