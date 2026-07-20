import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with hasStacks", () => {
  it("should include calling function names in long stack traces when longStackSupport is enabled", () => {
    Q.longStackSupport = true;

    return new Promise<void>((resolve, reject) => {
      function outerFunction() {
        return Q().then(function innerFunction() {
          throw new Error("test error");
        });
      }

      outerFunction().then(
        () => {
          Q.longStackSupport = false;
          reject(new Error("Expected rejection did not occur"));
        },
        (err: Error) => {
          Q.longStackSupport = false;
          try {
            // With hasStacks = true (original), the error should have a stack
            // that includes the function name from the promise chain
            expect(err.stack).toBeDefined();
            expect(typeof err.stack).toBe("string");
            expect(err.stack.length).toBeGreaterThan(0);
            // The stack should contain "innerFunction" since hasStacks is true
            // and long stack support is enabled
            expect(err.stack).toContain("innerFunction");
            resolve();
          } catch (e) {
            reject(e);
          }
        }
      );
    });
  });
});