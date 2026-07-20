// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should distinguish between StopIteration and other exceptions", async () => {
    // Create a mock StopIteration exception
    const stopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Create a regular error
    const regularError = new Error("Regular error");

    // Test with StopIteration
    function* generatorWithStopIteration() {
      yield 1;
      throw stopIteration;
    }

    // Test with regular error
    function* generatorWithRegularError() {
      yield 1;
      throw regularError;
    }

    // The mutation changes isStopIteration to always return true
    // In the original code, only StopIteration should be caught specially
    // In the mutated code, all exceptions will be treated as StopIteration
    const asyncGen1 = Q.async(generatorWithStopIteration);
    const asyncGen2 = Q.async(generatorWithRegularError);

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
    expect(result1).not.toBe(result2);
  });
});