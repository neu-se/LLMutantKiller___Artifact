// Test case to detect the mutation in Q.race function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.race mutation test", () => {
  it("should handle empty array correctly", () => {
    // This test will pass with the original code but fail with the mutated code
    // because the mutated code has an off-by-one error in the loop condition
    // that would cause it to try to access answerPs[answerPs.length]
    return Q.race([]).then(
      () => {
        // Expected behavior: should fulfill with undefined
      },
      (error) => {
        // If we get here, the mutation caused an error
        throw error;
      }
    );
  });
});