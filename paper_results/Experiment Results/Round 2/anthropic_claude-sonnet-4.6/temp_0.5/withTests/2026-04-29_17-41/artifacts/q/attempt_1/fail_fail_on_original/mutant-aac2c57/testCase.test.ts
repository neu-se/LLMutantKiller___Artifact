import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.done without an active domain", () => {
  it("should not throw when done() is called with no active process.domain", (done) => {
    // Ensure there is no active domain
    const proc = process as any;
    const originalDomain = proc.domain;
    proc.domain = null;

    let errorThrown = false;

    try {
      // In the mutated code, `typeof process === "object"` is always true,
      // so it tries to call `process.domain.bind(...)` where domain is null,
      // causing a TypeError: Cannot read property 'bind' of null.
      // In the original code, the `&&` ensures we only enter the block
      // when process.domain is truthy.
      Q.resolve(42).done(
        function () {
          proc.domain = originalDomain;
          if (!errorThrown) {
            done();
          }
        },
        function (err: any) {
          proc.domain = originalDomain;
          done(new Error("Unexpected rejection: " + err));
        }
      );
    } catch (e) {
      errorThrown = true;
      proc.domain = originalDomain;
      done(new Error("done() threw synchronously: " + e));
    }
  });
});