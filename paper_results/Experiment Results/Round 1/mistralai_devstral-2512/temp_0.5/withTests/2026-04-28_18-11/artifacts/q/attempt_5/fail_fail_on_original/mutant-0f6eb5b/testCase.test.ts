import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
  it("should include long stack traces when Q.longStackSupport is enabled", () => {
    // Save original value
    const originalLongStackSupport = Q.longStackSupport;

    try {
      // Enable long stack traces
      Q.longStackSupport = true;

      function func1() {
        return Q.resolve().then(() => func2());
      }

      function func2() {
        return new Q.Promise((resolve: any, reject: any) => {
          func3().then(resolve, reject);
        });
      }

      function func3() {
        return new Q.Promise((resolve: any, reject: any) => {
          setTimeout(() => {
            reject(new Error("test error"));
          }, 0);
        });
      }

      return func1()
        .catch((err: any) => {
          // Check that the stack trace includes all functions
          expect(err.stack).toMatch(/func3(.|\n)*func2(.|\n)*func1/);
        });

    } finally {
      // Restore original value
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});