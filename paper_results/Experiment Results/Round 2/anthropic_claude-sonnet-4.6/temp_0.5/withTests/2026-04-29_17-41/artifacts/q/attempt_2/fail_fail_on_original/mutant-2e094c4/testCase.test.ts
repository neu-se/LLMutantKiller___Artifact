import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering", () => {
  it("should filter out node.js internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Create an error with a stack that includes a node internal frame
      const error = new Error("test error");
      // Inject a fake node internal frame into the stack
      error.stack = `Error: test error
    at Object.<anonymous> (/user/project/test.js:10:5)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (node.js:120:10)`;

      let caughtError: any = null;

      await Q.reject(error).fail((e: any) => {
        caughtError = e;
      });

      expect(caughtError).toBeTruthy();
      const stack: string = caughtError.stack || "";

      // Original isNodeFrame returns true for lines with "(module.js:" or "(node.js:"
      // so filterStackString removes them from the stack.
      // Mutant always returns false, so those lines are NOT removed.
      expect(stack).not.toMatch(/\(module\.js:/);
      expect(stack).not.toMatch(/\(node\.js:/);
    } finally {
      Q.longStackSupport = false;
    }
  });
});