import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async", () => {
  it("handles generator return value correctly when StopIteration is defined", async () => {
    const globalAny = global as any;
    const originalStopIteration = globalAny.StopIteration;

    // Define StopIteration so the original code takes the SpiderMonkey else-branch
    globalAny.StopIteration = {};

    try {
      const expectedValue = 42;

      // Create a mock SpiderMonkey-style generator:
      // - next() throws a QReturnValue (recognized by isStopIteration) with the return value
      const mockGenerator = {
        next: function() {
          // Q["return"] throws a QReturnValue which isStopIteration recognizes
          Q["return"](expectedValue);
        }
      };

      const asyncFn = Q.async(function() {
        return mockGenerator;
      });

      const result = await asyncFn();
      // Original (SpiderMonkey path): catches QReturnValue via isStopIteration, returns Q(exception.value) = 42
      // Mutated (ES6 path always): tries result.done on undefined (next() returns undefined), throws TypeError
      expect(result).toBe(expectedValue);
    } finally {
      if (originalStopIteration === undefined) {
        delete globalAny.StopIteration;
      } else {
        globalAny.StopIteration = originalStopIteration;
      }
    }
  });
});