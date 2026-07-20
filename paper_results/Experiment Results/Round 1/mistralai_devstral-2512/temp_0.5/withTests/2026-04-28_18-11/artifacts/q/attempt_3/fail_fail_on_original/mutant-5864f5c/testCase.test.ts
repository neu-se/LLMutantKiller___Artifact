// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle StopIteration exceptions in async generator context", () => {
    // Create a mock StopIteration object that would be thrown by SpiderMonkey generators
    const mockStopIteration = {
      value: 42,
      toString: () => "[object StopIteration]"
    };

    // Create a generator function that throws our mock StopIteration
    function* testGenerator() {
      yield "first";
      throw mockStopIteration;
    }

    // Use Q.async to wrap the generator
    const asyncFunc = Q.async(testGenerator);

    // Call the async function and observe the behavior
    return asyncFunc().then(
      (result: any) => {
        // In the original code, this should resolve with the value (42)
        // because isStopIteration would return true and the value would be extracted
        expect(result).toBe(42);
      },
      (error: any) => {
        // In the mutated code, this would reject because isStopIteration returns false
        throw new Error("Promise was rejected when it should have resolved with StopIteration value");
      }
    );
  });
});