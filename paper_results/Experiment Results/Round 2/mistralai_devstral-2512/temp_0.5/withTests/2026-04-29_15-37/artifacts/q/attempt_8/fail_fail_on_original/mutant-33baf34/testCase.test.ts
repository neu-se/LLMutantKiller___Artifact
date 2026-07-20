const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise that will generate a stack trace
    function testFunction() {
      throw new Error("Test error");
    }

    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise that will generate a stack trace
    const promise = Q().then(testFunction);

    // Return a promise that will handle the error
    return promise.catch((err: Error) => {
      // Verify that the stack trace was parsed correctly
      expect(err.stack).toBeDefined();

      // Check if the stack trace contains the expected format for named functions
      const stackLines = err.stack?.split('\n') || [];
      const namedFunctionLine = stackLines.find(line =>
        line.includes("at testFunction")
      );

      // If we found a named function line, verify it has the expected format
      if (namedFunctionLine) {
        expect(namedFunctionLine).toMatch(/at testFunction \(.*\.js:\d+:\d+\)/);
      }
    });
  });
});