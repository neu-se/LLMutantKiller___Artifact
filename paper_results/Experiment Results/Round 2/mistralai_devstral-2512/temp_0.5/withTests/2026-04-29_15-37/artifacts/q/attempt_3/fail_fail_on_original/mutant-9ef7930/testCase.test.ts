// Test case to detect the mutation in Q.race function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should handle empty array correctly", () => {
    // This test will pass with the original code but fail with the mutated code
    // because the mutated code has an off-by-one error in the loop condition
    // that would cause it to try to access answerPs[len] (undefined)
    return Q.race([]).then(
      () => {
        // Expected behavior: should fulfill with undefined for empty array
      },
      (error: any) => {
        // This should not be called in the original code
        throw error;
      }
    );
  }, 10000); // Increased timeout to 10 seconds
});