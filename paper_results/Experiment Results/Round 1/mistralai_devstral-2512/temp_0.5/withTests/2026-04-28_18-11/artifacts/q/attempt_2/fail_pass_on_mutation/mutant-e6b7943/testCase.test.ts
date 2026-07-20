// Test case to detect the mutation in isStopIteration function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions in async generators", async () => {
    // Create a mock StopIteration exception that mimics what SpiderMonkey generates
    const mockStopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Create a generator function that throws our mock StopIteration
    function* testGenerator() {
      yield 1;
      throw mockStopIteration;
    }

    // Use Q.async to wrap the generator
    const asyncGenerator = Q.async(testGenerator);

    // The mutation changes isStopIteration to always return true
    // In the original code, it should only return true for actual StopIteration or QReturnValue
    // In the mutated code, it will treat all exceptions as StopIteration
    let result;
    try {
      result = await asyncGenerator();
      // If we get here with the mutated code, it means the StopIteration was caught incorrectly
      // and the generator continued execution
    } catch (e) {
      // In the original code, this should catch the StopIteration
      // In the mutated code, the behavior might be different
      result = e;
    }

    // In the original code, we should get the StopIteration exception
    // In the mutated code, the behavior might be different
    expect(result).toBe(mockStopIteration);
  });
});