// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly handle non-StopIteration exceptions in async generators", async () => {
    // Create a regular error (not StopIteration)
    const regularError = new Error("This is a regular error");

    // Create a generator that throws a regular error
    function* testGenerator() {
      yield 1;
      throw regularError;
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // Track whether the error was caught
    let caughtError = null;
    try {
      await asyncGenerator();
    } catch (e) {
      caughtError = e;
    }

    // In the original code, regular errors should propagate normally
    // In the mutated code (where isStopIteration always returns true),
    // the error handling behavior changes
    expect(caughtError).toBe(regularError);
    expect(caughtError.message).toBe("This is a regular error");
  });
});