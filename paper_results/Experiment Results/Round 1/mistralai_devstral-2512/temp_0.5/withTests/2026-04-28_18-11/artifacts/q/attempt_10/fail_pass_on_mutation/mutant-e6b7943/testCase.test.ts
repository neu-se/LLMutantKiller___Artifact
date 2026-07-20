// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly handle exceptions in async generator with Q.async", async () => {
    // Create a regular error (not StopIteration)
    const testError = new Error("Test error");

    // Create a generator that throws a regular error
    function* testGenerator() {
      yield 1;
      throw testError;
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In original code: regular errors should propagate normally
    // In mutated code: all exceptions are treated as StopIteration
    let caughtError = null;
    try {
      await asyncGenerator();
    } catch (e) {
      caughtError = e;
    }

    // In original code we expect to catch the testError
    // In mutated code the behavior might be different
    expect(caughtError).toBe(testError);
    expect(caughtError.message).toBe("Test error");
  });
});