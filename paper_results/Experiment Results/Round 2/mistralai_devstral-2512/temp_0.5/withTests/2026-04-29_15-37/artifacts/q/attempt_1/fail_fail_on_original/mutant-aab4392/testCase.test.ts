// Test case to detect the mutation in the filterStackString function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should not throw an error when processing stack traces", () => {
    // Create a scenario that would trigger the filterStackString function
    // by creating a rejected promise with long stack traces enabled
    Q.longStackSupport = true;

    // Create a chain of promises that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access. This test ensures the function
    // handles stack traces without throwing errors.
    return promise.then(
      () => {
        // This should not be called
        throw new Error("Promise should have been rejected");
      },
      (error) => {
        // Verify we got the expected error
        expect(error.message).toBe("Test error");
        // If we get here without throwing, the test passes
        return true;
      }
    );
  });
});