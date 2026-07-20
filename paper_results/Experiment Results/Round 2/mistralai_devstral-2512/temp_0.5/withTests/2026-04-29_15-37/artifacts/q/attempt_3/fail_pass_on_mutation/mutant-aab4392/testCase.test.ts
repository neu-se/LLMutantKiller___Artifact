// Test case to detect the mutation in the filterStackString function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should correctly process error stacks without out-of-bounds access", () => {
    // Create a promise chain that will generate stack traces
    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access when processing stack traces
    const promise = Q.reject(new Error("Test error"));

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (error: Error) => {
        // Verify we got the expected error
        expect(error.message).toBe("Test error");
        // The test passes if we get here without throwing an out-of-bounds error
        return true;
      }
    );
  });
});