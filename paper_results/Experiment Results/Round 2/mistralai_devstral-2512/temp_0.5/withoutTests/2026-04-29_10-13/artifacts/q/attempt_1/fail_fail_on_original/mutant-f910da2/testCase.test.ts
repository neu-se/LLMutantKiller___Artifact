import { Q } from "./q";

describe("Q.async with SpiderMonkey generators", () => {
  it("should handle StopIteration correctly in older SpiderMonkey environments", async () => {
    // This test simulates the behavior of older SpiderMonkey generators
    // that throw StopIteration to signal completion
    const testValue = "test result";

    // Create a mock generator function that mimics SpiderMonkey behavior
    function* testGenerator() {
      yield Q.delay(10, "intermediate");
      // In older SpiderMonkey, this would throw StopIteration with the return value
      return testValue;
    }

    // Mock the global StopIteration to simulate older SpiderMonkey environment
    const originalStopIteration = global.StopIteration;
    global.StopIteration = function(value) {
      const error = new Error("StopIteration");
      error.value = value;
      return error;
    };

    try {
      // Use Q.async to wrap the generator
      const asyncFn = Q.async(testGenerator);
      const result = await asyncFn();

      // In the original code, this should work correctly
      // In the mutated code, it will fail because the condition is inverted
      expect(result).toBe(testValue);
    } finally {
      // Restore original StopIteration
      if (originalStopIteration) {
        global.StopIteration = originalStopIteration;
      } else {
        delete global.StopIteration;
      }
    }
  });
});