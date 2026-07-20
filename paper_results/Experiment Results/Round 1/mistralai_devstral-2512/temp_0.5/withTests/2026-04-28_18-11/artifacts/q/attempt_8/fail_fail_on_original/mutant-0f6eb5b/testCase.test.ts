import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include long stack traces when Q.longStackSupport is enabled", () => {
    // Save original value
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Enable long stack traces
      Q.longStackSupport = true;

      function func1() {
        return Q.resolve(undefined).then(() => func2());
      }

      function func2() {
        return Q.Promise((resolve: any, reject: any) => {
          func3().then(resolve, reject);
        });
      }

      function func3() {
        return Q.Promise((resolve: any, reject: any) => {
          setTimeout(() => {
            reject(new Error("test error"));
          }, 0);
        });
      }

      return func1()
        .catch((err: any) => {
          // Check that the stack trace includes all functions
          expect(err.stack).toContain("func3");
          expect(err.stack).toContain("func2");
          expect(err.stack).toContain("func1");
        });

    } finally {
      // Restore original value
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});