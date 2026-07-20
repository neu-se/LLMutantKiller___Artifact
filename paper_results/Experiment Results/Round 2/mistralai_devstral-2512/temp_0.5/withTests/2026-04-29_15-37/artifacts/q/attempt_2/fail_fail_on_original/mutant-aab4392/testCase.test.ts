// Test case to detect the mutation in the filterStackString function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should correctly filter stack traces without out-of-bounds access", () => {
    // Enable long stack traces to trigger filterStackString
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.Promise(function(resolve, reject) {
      reject(new Error("Test error"));
    });

    // The mutation changes the loop condition from i < lines.length to i <= lines.length
    // which would cause an out-of-bounds access when processing stack traces
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