const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator handling", () => {
  it("should use ES6 generator path when StopIteration is undefined", () => {
    // Ensure StopIteration is undefined (normal case)
    const originalStopIteration = (global as any).StopIteration;
    delete (global as any).StopIteration;

    try {
      // Create a simple generator function that returns a value
      function* simpleGenerator() {
        return 42;
      }

      // Wrap it with Q.async
      const asyncFn = Q.async(simpleGenerator);

      // The original code should use ES6 path and resolve with 42
      // The mutated code would incorrectly use SpiderMonkey path
      return asyncFn().then((result: any) => {
        expect(result).toBe(42);
      });
    } finally {
      // Restore original value
      if (originalStopIteration !== undefined) {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});