// Test case to detect the mutation in the isStopIteration function
import { Q } from "./q.js";

describe("isStopIteration mutation", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };
    const otherException = { toString: () => "[object Error]" };

    // Test with Q.async which uses isStopIteration internally
    const testWithStopIteration = Q.async(function* () {
      throw stopIteration;
    });

    const testWithOtherException = Q.async(function* () {
      throw otherException;
    });

    // The test with StopIteration should resolve (not reject) in the original code
    // but reject in the mutated code due to the inverted condition
    return Promise.all([
      testWithStopIteration.then(
        () => "resolved", // Original behavior
        () => "rejected"   // Mutated behavior
      ),
      testWithOtherException.then(
        () => "resolved",
        () => "rejected"
      )
    ]).then(([stopResult, otherResult]) => {
      // In original code: stopIteration should resolve, other should reject
      // In mutated code: stopIteration should reject, other should reject
      expect(stopResult).toBe("resolved");
      expect(otherResult).toBe("rejected");
    });
  });
});