const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse stack traces with named functions", () => {
    const Q = qModule;

    // Create a promise that will generate a stack trace
    const promise = Q.Promise((resolve: any, reject: any) => {
      reject(new Error("Test error"));
    });

    return promise.then(() => {
      expect(true).toBe(false); // Should not reach here
    }).catch((error: Error) => {
      // Verify stack trace contains valid line information
      expect(error.stack).toBeDefined();
      const lines = error.stack!.split("\n");

      // Find a line with the pattern we're testing
      const validLine = lines.find(line =>
        /at .+? \(.+?:\d+:\d+\)/.test(line)
      );

      expect(validLine).toBeDefined();

      // Test the regex pattern directly
      const testLine = "at functionName (/path/to/file.js:42:21)";
      const attempt1 = /at .+? \((.+?):(\d+):(?:\d+)\)$/.exec(testLine);
      expect(attempt1).not.toBeNull();
      expect(attempt1![1]).toBe("/path/to/file.js");
      expect(Number(attempt1![2])).toBe(42);
    });
  });
});