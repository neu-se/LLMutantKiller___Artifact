const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q stack trace filtering", () => {
  it("should execute the stack frame filtering loop", () => {
    // Create a promise that will generate a stack trace
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // Enable long stack traces
    Q.longStackSupport = true;

    return deferred.promise.catch((error: Error) => {
      const stack = error.stack || "";
      const lines = stack.split("\n");

      // The mutation changes the loop condition from i < lines.length to i >= lines.length
      // This means the loop won't execute at all in the mutated version
      // We can detect this by checking if the stack contains specific internal markers

      // Look for the STACK_JUMP_SEPARATOR which is added during filtering
      const hasSeparator = stack.includes("From previous event:");

      // Original code should have the separator (true)
      // Mutated code won't execute the filtering loop (false)
      expect(hasSeparator).toBe(true);
    });
  });
});