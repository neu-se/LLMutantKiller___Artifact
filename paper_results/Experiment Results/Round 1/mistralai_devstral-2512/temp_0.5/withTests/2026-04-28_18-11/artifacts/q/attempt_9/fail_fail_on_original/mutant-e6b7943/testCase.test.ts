// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly handle Q.return() in async generators", async () => {
    // Create a generator that uses Q.return()
    function* testGenerator() {
      yield 1;
      Q["return"]("returned value");
      yield 2; // This should never be reached
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In original code: Q.return() throws QReturnValue which should be caught by isStopIteration
    // In mutated code: All exceptions are treated as StopIteration, potentially changing behavior
    const result = await asyncGenerator();

    // In original code we expect "returned value"
    // In mutated code the behavior might be different
    expect(result).toBe("returned value");
  });
});