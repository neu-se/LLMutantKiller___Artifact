// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly distinguish StopIteration from other exceptions in async generators", async () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Create a regular error
    const regularError = new Error("Regular error");

    // Generator that throws StopIteration
    function* genWithStopIteration() {
      yield 1;
      throw stopIteration;
    }

    // Generator that throws regular error
    function* genWithRegularError() {
      yield 1;
      throw regularError;
    }

    const asyncGen1 = Q.async(genWithStopIteration);
    const asyncGen2 = Q.async(genWithRegularError);

    let result1, result2;
    try {
      result1 = await asyncGen1();
    } catch (e) {
      result1 = e;
    }

    try {
      result2 = await asyncGen2();
    } catch (e) {
      result2 = e;
    }

    // In original code: result1 should be stopIteration, result2 should be regularError
    // In mutated code: both might be handled the same way
    expect(result1).toBe(stopIteration);
    expect(result2).toBe(regularError);

    // This assertion will fail in mutated code where both are treated identically
    expect(result1 !== result2).toBe(true);
  });
});