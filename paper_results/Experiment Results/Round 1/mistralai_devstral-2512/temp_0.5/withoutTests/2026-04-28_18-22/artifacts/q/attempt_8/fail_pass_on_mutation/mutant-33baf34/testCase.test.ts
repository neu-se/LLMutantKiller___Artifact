const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse named function stack traces", () => {
    const Q = qModule;
    // Create a promise chain to generate a stack trace
    const promise = Q.Promise((resolve, reject) => {
      reject(new Error("Test error"));
    });

    return promise.then(() => {
      expect(true).toBe(false); // Should not reach here
    }).catch((error: Error) => {
      // Verify the stack trace contains the expected pattern
      expect(error.stack).toBeDefined();
      const lines = error.stack!.split("\n");
      const namedFunctionLine = lines.find(line =>
        line.includes("at ") &&
        line.includes(".js:") &&
        !line.includes("node.js:") &&
        !line.includes("module.js:")
      );
      expect(namedFunctionLine).toBeDefined();
      // Extract file and line number
      const match = /at .+? \((.+?):(\d+):\d+\)/.exec(namedFunctionLine!);
      expect(match).not.toBeNull();
      expect(match![1]).toBeDefined();
      expect(Number(match![2])).toBeGreaterThan(0);
    });
  });
});