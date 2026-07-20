// Test case to detect the mutation in the filterStackString function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should not throw when processing stack traces with specific line patterns", () => {
    // Create a promise chain that will generate stack traces
    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access when processing stack traces
    const error = new Error("Test error");
    error.stack = "Error: Test error\n" +
                 "    at (module.js:1:1)\n" +
                 "    at (node.js:2:2)";

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