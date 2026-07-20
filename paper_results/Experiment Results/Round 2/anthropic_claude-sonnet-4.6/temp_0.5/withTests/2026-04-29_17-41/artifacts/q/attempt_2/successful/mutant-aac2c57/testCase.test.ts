import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done", () => {
  it("should successfully call done() on a fulfilled promise when there is no active domain", (done) => {
    // In Node.js without an active domain, process.domain is null.
    // Original code: `typeof process === "object" && process && process.domain`
    //   -> false when process.domain is null, so bind is never called. Works fine.
    // Mutated code: `typeof process === "object" || process && process.domain`
    //   -> true always (since typeof process === "object" is true in Node),
    //      so it tries process.domain.bind(...) where process.domain is null -> TypeError
    expect(process.domain).toBeNull();

    // This should complete without error on the original code.
    // On the mutated code, done() will throw a TypeError synchronously
    // because it tries to call null.bind(onUnhandledError).
    let threw = false;
    try {
      Q.resolve(42).done(
        function () {
          if (!threw) {
            done();
          }
        },
        function (err: any) {
          done(new Error("Unexpected rejection: " + err));
        }
      );
    } catch (e) {
      threw = true;
      done(new Error("done() threw: " + e));
    }
  });
});