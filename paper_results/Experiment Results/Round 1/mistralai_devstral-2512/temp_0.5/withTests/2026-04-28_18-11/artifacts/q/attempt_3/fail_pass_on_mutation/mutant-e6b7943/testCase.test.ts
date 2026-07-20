// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly handle non-StopIteration exceptions in generators", async () => {
    // Create a regular error (not StopIteration)
    const regularError = new Error("This is a regular error");

    // Create a generator function that throws a regular error
    function* testGenerator() {
      yield 1;
      throw regularError;
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In the original code, regular errors should be propagated normally
    // In the mutated code, all errors will be treated as StopIteration
    let caughtError;
    try {
      await asyncGenerator();
    } catch (e) {
      caughtError = e;
    }

    // In the original code, we should catch the regular error
    // In the mutated code, the error might be handled differently
    expect(caughtError).toBe(regularError);
  });
});