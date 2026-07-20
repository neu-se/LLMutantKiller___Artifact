import { Q } from "./q.js";

describe("Q.async with SpiderMonkey generators", () => {
  it("should handle StopIteration correctly in SpiderMonkey generators", () => {
    // This test simulates the behavior of SpiderMonkey generators
    // which throw StopIteration when they complete
    const mockGenerator = {
      next: () => {
        throw new Error("StopIteration");
      }
    };

    // Mock the environment to appear as SpiderMonkey
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = Error;

    try {
      // The async function should handle StopIteration correctly
      const asyncFn = Q.async(function() {
        return mockGenerator;
      });

      return asyncFn().then(
        () => {
          // Should not reach here in the mutated version
          throw new Error("Expected to catch StopIteration");
        },
        (error: any) => {
          // In the original code, this should be caught and handled
          // In the mutated code, this will be treated differently
          if (error.message === "StopIteration") {
            throw new Error("StopIteration was not properly handled");
          }
        }
      );
    } finally {
      // Restore original value
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});