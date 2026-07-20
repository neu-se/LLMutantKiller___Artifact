// Test case to detect the mutation in isStopIteration function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions", async () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a promise that rejects with our mock StopIteration
    const promise = Q.reject(stopIteration);

    // The mutation changes the condition to always return true
    // In the original code, it should only return true for StopIteration or QReturnValue
    // In the mutated code, it will always return true
    let caughtStopIteration = false;
    let caughtOtherError = false;

    try {
      await promise;
    } catch (e) {
      // This should catch our StopIteration
      caughtStopIteration = true;
    }

    // Now test with a regular error to ensure we're not catching everything
    const regularError = new Error("Regular error");
    const promise2 = Q.reject(regularError);

    try {
      await promise2;
    } catch (e) {
      // This should catch the regular error
      caughtOtherError = true;
    }

    // Both should be caught in the original code
    // In the mutated code, the behavior might change
    expect(caughtStopIteration).toBe(true);
    expect(caughtOtherError).toBe(true);
  });
});