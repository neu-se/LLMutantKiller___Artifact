const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace parsing", () => {
  it("should correctly parse named function stack traces", () => {
    const Q = qModule;
    // Create a promise chain to generate a stack trace with named function
    const promise = Q.Promise((resolve, reject) => {
      const namedFunction = () => {
        reject(new Error("Test error"));
      };
      namedFunction();
    });

    return promise.then(() => {
      expect(true).toBe(false); // Should not reach here
    }).catch((error: Error) => {
      // Verify the stack trace contains the expected pattern
      expect(error.stack).toBeDefined();
      const lines = error.stack!.split("\n");
      const namedFunctionLine = lines.find(line =>
        line.includes("at namedFunction") &&
        line.includes(".js:")
      );
      expect(namedFunctionLine).toBeDefined();
      // Extract file and line number using the same regex as the original code
      const match = /at .+? \((.+?):(\d+):\d+\)/.exec(namedFunctionLine!);
      expect(match).not.toBeNull();
      expect(match![1]).toBeDefined();
      expect(Number(match![2])).toBeGreaterThan(0);
    });
  });
});