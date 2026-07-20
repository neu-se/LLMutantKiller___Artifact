const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async with SpiderMonkey generators", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", () => {
    // Create a mock generator that behaves like SpiderMonkey generators
    const mockGenerator = {
      next: function() {
        // Throw a StopIteration-like error
        const error = new Error("StopIteration");
        (error as any).name = "StopIteration";
        throw error;
      }
    };

    // Set up the environment to appear as SpiderMonkey
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = Error;

    try {
      // Create an async function that uses our mock generator
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });

      // The original code should handle StopIteration and resolve successfully
      // The mutated code will fail because the condition is reversed
      return asyncFn().then(
        (result: any) => {
          // This should execute in the original code
          // The result should be undefined since our generator throws StopIteration
          expect(result).toBeUndefined();
        },
        (error: Error) => {
          // This should NOT execute in the original code
          // But WILL execute in the mutated code
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