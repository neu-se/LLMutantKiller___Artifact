// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly handle QReturnValue in async generators", async () => {
    // Create a QReturnValue instance
    const returnValue = new Q.QReturnValue("test value");

    // Create a generator that returns using Q.return
    function* testGenerator() {
      yield 1;
      Q["return"]("test value");
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In the original code, QReturnValue should be handled specially
    // In the mutated code, the behavior might be different
    const result = await asyncGenerator();

    // In the original code, this should return "test value"
    // In the mutated code, the behavior might be different
    expect(result).toBe("test value");
  });
});