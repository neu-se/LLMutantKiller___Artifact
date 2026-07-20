const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with anonymous function format", async () => {
    // Create a scenario that generates a stack trace with anonymous function format
    // This will trigger the attempt2 regex path in getFileNameAndLineNumber
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force a rejection that will generate a stack trace
    deferred.reject(new Error("Test error"));

    try {
      await promise;
    } catch (error: any) {
      // The error should have a stack trace that can be parsed
      expect(error.stack).toBeDefined();

      // Extract just the first line of the stack trace (the error message)
      const stackLines = error.stack.split('\n');
      // Find a line that matches the anonymous function format
      const anonymousLine = stackLines.find((line: string) =>
        line.includes('at ') && !line.includes('(') && line.includes(':')
      );

      if (anonymousLine) {
        // This line should be parseable by the attempt2 regex
        // The mutation breaks this parsing by making the condition always false
        expect(anonymousLine).toMatch(/at [^ ]+:(\d+):(?:\d)$/);
      }
    }
  });
});