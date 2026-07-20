// Test case to detect the mutation in the filterStackString function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should handle stack traces with multiple lines correctly", () => {
    // Create a scenario that forces stack trace processing
    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access when processing stack traces
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                 "    at line1\n" +
                 "    at line2\n" +
                 "    at line3";

    const promise = Q.reject(error);

    return promise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      (caughtError: Error) => {
        // Verify we got the expected error
        expect(caughtError.message).toBe("Test error");
        // The test passes if we get here without throwing an out-of-bounds error
        return true;
      }
    );
  });
});