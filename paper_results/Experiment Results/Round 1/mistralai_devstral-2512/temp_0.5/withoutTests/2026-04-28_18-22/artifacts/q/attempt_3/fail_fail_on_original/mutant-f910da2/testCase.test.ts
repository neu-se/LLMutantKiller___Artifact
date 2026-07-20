const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with SpiderMonkey generators", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", () => {
    // Mock a SpiderMonkey-style generator that throws StopIteration
    const mockGenerator = {
      next: function() {
        const error = new Error("StopIteration");
        throw error;
      }
    };

    // Set up the environment to appear as SpiderMonkey
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = Error;

    try {
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });

      return asyncFn().then(
        () => {
          // In the original code, this should succeed because StopIteration is handled
          // In the mutated code, this will fail because the condition is reversed
        },
        (error: Error) => {
          // If we reach here, the mutation caused the error to not be handled properly
          throw new Error("StopIteration was not properly handled");
        }
      );
    } finally {
      // Clean up
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});