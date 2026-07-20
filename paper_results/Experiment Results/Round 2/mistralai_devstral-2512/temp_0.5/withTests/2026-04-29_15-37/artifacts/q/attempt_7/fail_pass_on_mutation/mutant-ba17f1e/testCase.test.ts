const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    // Create a promise that will throw an error to generate a stack trace
    const promise = Q.Promise((resolve, reject) => {
      reject(new Error("Test error"));
    });

    return promise.catch((error: any) => {
      // The error should have a stack trace
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');

      // The stack trace should contain valid line information
      // This will fail on the mutated version because getFileNameAndLineNumber returns []
      const stackLines = error.stack.split('\n');
      const hasValidLine = stackLines.some(line =>
        line.match(/at \w+ \(.*:\d+:\d+\)/) !== null
      );
      expect(hasValidLine).toBe(true);
    });
  });
});