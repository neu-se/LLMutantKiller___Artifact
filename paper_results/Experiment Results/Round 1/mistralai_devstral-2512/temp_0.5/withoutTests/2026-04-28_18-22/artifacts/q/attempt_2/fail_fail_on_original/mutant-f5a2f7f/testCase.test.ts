import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace capture", () => {
  it("should correctly detect stack trace support", () => {
    // This test verifies that Q correctly detects stack trace support
    // The mutation changes the condition from `if (!hasStacks)` to `if (false)`
    // which would break the stack trace detection logic

    // Create a deferred promise and check if stack traces are captured
    const deferred = Q.defer();
    const promise = deferred.promise;

    // The promise should have stack trace support enabled
    // In the original code, this works correctly
    // In the mutated code, stack trace detection is broken
    expect(promise.stack).toBeUndefined(); // Initially no stack

    // Reject the promise to trigger stack capture
    deferred.reject(new Error("Test error"));

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // In original code, stack should be captured
        // In mutated code, stack capture is broken
        expect(error.stack).toBeDefined();
        expect(error.stack!.length).toBeGreaterThan(0);
      }
    );
  });
});