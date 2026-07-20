const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library mutation test", () => {
  it("should correctly handle async generator with StopIteration", () => {
    // Create a mock generator function that throws StopIteration
    const mockGenerator = function*() {
      yield 1;
      // This should trigger the isStopIteration check
      const stopIteration = { toString: () => "[object StopIteration]" };
      throw stopIteration;
    };

    // Test that the async function properly handles StopIteration
    return Q.async(mockGenerator)()
      .then((result: any) => {
        // If we get here, the StopIteration was properly handled
        expect(true).toBe(true);
      })
      .catch((error: any) => {
        // If we get here with the mutated code, the test fails
        throw new Error("StopIteration was not properly handled");
      });
  });
});