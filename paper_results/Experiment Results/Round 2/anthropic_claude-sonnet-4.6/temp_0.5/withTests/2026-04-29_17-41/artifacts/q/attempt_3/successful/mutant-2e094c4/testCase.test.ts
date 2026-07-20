import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("should filter out node.js internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Create an error with a stack that includes node internal frames
      const error = new Error("test error");
      // Inject fake node internal frames - using format that matches indexOf checks
      error.stack = `Error: test error
    at Object.<anonymous> (/user/project/test.js:10:5)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions (node.js:120:10)`;

      let caughtError: any = null;

      // Use a promise chain so makeStackTraceLong gets called
      const deferred = Q.defer<void>();
      
      const resultPromise = deferred.promise
        .then(() => {
          throw error;
        })
        .fail((e: any) => {
          caughtError = e;
        });

      deferred.resolve();
      await resultPromise;

      expect(caughtError).toBeTruthy();
      const stack: string = caughtError.stack || "";

      // Original: isNodeFrame filters lines with "(module.js:" or "(node.js:"
      // so these lines are removed from the stack.
      // Mutant: always returns false, so these lines remain in the stack.
      // We check that "(node.js:" line is NOT present (filtered by original, kept by mutant)
      expect(stack).not.toMatch(/\(node\.js:/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});