const qFactory = require("../../../../../../../../../../../subject_repositories/q/q.js");
const Q = qFactory();

describe("Q library mutation test", () => {
  it("should handle StopIteration in async generators", () => {
    // Create a generator that throws StopIteration
    function* testGenerator() {
      yield 1;
      // This should be caught as a StopIteration
      const stopIteration = new Error();
      stopIteration.toString = () => "[object StopIteration]";
      throw stopIteration;
    }

    // Wrap it with Q.async
    const asyncFn = Q.async(testGenerator);

    // The original code should handle StopIteration properly
    // The mutated code will fail because it requires both conditions
    return asyncFn().then(
      () => {
        // Should not reach here in original code
        throw new Error("Should have been rejected");
      },
      (error) => {
        // Original code should reject with the StopIteration
        expect(error.toString()).toBe("[object StopIteration]");
      }
    );
  });
});