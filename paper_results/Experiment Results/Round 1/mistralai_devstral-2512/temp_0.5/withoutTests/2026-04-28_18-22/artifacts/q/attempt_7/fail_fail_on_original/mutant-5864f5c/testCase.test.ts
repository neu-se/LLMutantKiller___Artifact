const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("isStopIteration mutation", () => {
  it("should correctly handle StopIteration in async generator", () => {
    // Create a generator that throws an object with StopIteration toString
    function* testGenerator() {
      yield 1;
      throw { toString: () => "[object StopIteration]", value: 42 };
    }

    // Test that Q.async properly handles StopIteration
    return Q.async(testGenerator)().then(
      (result: unknown) => {
        // Should resolve with the value from StopIteration
        expect(result).toBe(42);
      },
      (error: Error) => {
        // Should not reject with StopIteration
        throw new Error("Should not reject with StopIteration");
      }
    );
  });
});