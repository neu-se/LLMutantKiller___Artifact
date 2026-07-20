const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("isStopIteration mutation", () => {
  it("should correctly handle StopIteration in async generator", () => {
    // Create a generator that throws StopIteration with a value
    function* testGenerator() {
      yield 1;
      const stopIteration = new Q.QReturnValue(42);
      throw stopIteration;
    }

    // Test that Q.async properly handles StopIteration and returns the value
    return Q.async(testGenerator)().then(
      (result: unknown) => {
        // Should resolve with the value from StopIteration
        expect(result).toBe(42);
      }
    );
  });
});