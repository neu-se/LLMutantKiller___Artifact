// Test case to detect the mutation in the isStopIteration function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Test with Q.async which uses isStopIteration internally
    const testWithStopIteration = Q.async(function* () {
      throw stopIteration;
    });

    // The test with StopIteration should resolve in the original code
    // but reject in the mutated code due to the inverted condition
    return testWithStopIteration.then(
      () => "resolved", // Original behavior
      () => "rejected"   // Mutated behavior
    ).then((result) => {
      // In original code: stopIteration should resolve
      // In mutated code: stopIteration should reject
      expect(result).toBe("resolved");
    });
  });
});