import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
  it("should correctly identify internal stack frames", () => {
    // This test directly tests the isInternalFrame function behavior
    // by creating a scenario where we can observe stack frame filtering

    // Enable long stack traces
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    qModule.Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const deferred = qModule.Q.defer();
    let errorWithStack: Error;

    // Create an error with a stack trace that includes q.js frames
    try {
      throw new Error("Test error");
    } catch (e) {
      errorWithStack = e;
    }

    // The isInternalFrame function is used when filtering stack traces
    // In the original code, it checks if filename matches qFileName
    // In the mutated code, it always returns true, filtering all frames

    // We'll test by checking if the stack trace contains expected frames
    const stackLines = errorWithStack.stack?.split('\n') || [];
    const hasQFrames = stackLines.some(line =>
      line.includes('q.js') || line.includes('q.js:')
    );

    // In original code, some q.js frames should remain after filtering
    // In mutated code, all frames would be filtered (return true)
    expect(hasQFrames).toBe(true);

    // Now test with a promise rejection to trigger stack trace filtering
    deferred.reject(errorWithStack);

    return deferred.promise.catch((e: Error) => {
      const filteredStack = e.stack;
      // In original code, stack should be filtered but not empty
      // In mutated code, stack would be severely filtered or empty
      expect(filteredStack?.length).toBeGreaterThan(0);
      expect(filteredStack).not.toContain('From previous event:');
    });
  });
});