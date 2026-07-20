const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly extract file name and line number from stack traces", () => {
    // Create a scenario that will generate a stack trace
    function namedFunction() {
      throw new Error("Test error");
    }

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q().then(namedFunction);

    // Return a promise that will handle the error and verify stack parsing
    return promise.catch((err) => {
      // Verify that the stack trace contains the expected format
      expect(err.stack).toBeDefined();
      expect(err.stack.includes("at namedFunction")).toBe(true);

      // Check if the stack trace contains the file name and line number
      const stackLines = err.stack.split('\n');
      const hasValidStackLine = stackLines.some(line =>
        line.includes("at namedFunction") && line.includes(".js:")
      );
      expect(hasValidStackLine).toBe(true);
    });
  });
});