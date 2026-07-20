import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame filtering in stack traces", () => {
  it("should filter out node.js internal frames from long stack traces", async () => {
    Q.longStackSupport = true;

    try {
      // Create a rejection that will have a long stack trace
      // We want to verify that the stack filtering works correctly
      // The key behavior: filterStackString uses isNodeFrame to remove lines containing "(node.js:"
      // In the original: isNodeFrame returns true for lines with "(node.js:", so they get filtered out
      // In the mutant: isNodeFrame always returns false, so node.js frames are NOT filtered

      // We can test this indirectly by checking that the Q library correctly handles
      // stack traces. The observable difference is in the stack property of errors
      // caught via long stack support.

      // Create a promise chain that will reject and capture the stack
      const capturedError = await new Promise<Error>((resolve) => {
        Q.reject(new Error("test error"))
          .then(() => {})
          .fail((err: Error) => {
            resolve(err);
          });
      });

      // The stack should exist
      expect(capturedError).toBeDefined();
      expect(capturedError.stack).toBeDefined();

      // The key test: in the original code, lines containing "(node.js:" are filtered
      // In the mutant, they are NOT filtered (isNodeFrame always returns false)
      // We simulate what filterStackString does and verify the behavior
      
      // Create a fake stack line that would be filtered by isNodeFrame in original
      // but NOT filtered in the mutant
      const nodeInternalLine = "    at Object.<anonymous> (node.js:123:45)";
      const normalLine = "    at myFunction (myfile.js:10:5)";
      const fakeStack = `Error: test\n${normalLine}\n${nodeInternalLine}`;

      // Use Q's internal stack filtering by creating an error with a known stack
      // and checking what gets through via long stack support
      const testError = new Error("stack test");
      // Override the stack to include a node.js internal line
      Object.defineProperty(testError, 'stack', {
        value: fakeStack,
        configurable: true
      });

      const result = await new Promise<string>((resolve, reject) => {
        const deferred = Q.defer();
        deferred.promise.fail((err: any) => {
          resolve(err.stack || '');
        });
        deferred.reject(testError);
      });

      // In the original: node.js lines ARE filtered out (isNodeFrame returns true for them)
      // In the mutant: node.js lines are NOT filtered (isNodeFrame always returns false)
      // So in original, "(node.js:" should NOT appear in filtered stack
      // In mutant, "(node.js:" WOULD appear in filtered stack
      expect(result).not.toContain("(node.js:");
    } finally {
      Q.longStackSupport = false;
    }
  });
});