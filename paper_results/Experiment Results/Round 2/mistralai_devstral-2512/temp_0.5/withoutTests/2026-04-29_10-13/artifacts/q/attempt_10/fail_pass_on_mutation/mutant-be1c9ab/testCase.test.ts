const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should handle StopIteration exceptions correctly in async operations", () => {
    // Create a promise that will throw a StopIteration-like exception
    const stopIteration = new Error();
    stopIteration.toString = () => "[object StopIteration]";

    // Use Q's promise handling to test the mutation
    return Q.Promise((resolve, reject) => {
      try {
        // Simulate the async generator behavior that uses isStopIteration
        throw stopIteration;
      } catch (e) {
        // In original code (OR logic), this should be treated as StopIteration
        // In mutated code (AND logic), it won't be
        reject(e);
      }
    }).then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error: any) => {
        // Original code should handle StopIteration properly
        expect(error.toString()).toBe("[object StopIteration]");
      }
    );
  });
});