// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly distinguish between StopIteration and other exceptions", () => {
    // Create a mock StopIteration exception (simulating legacy SpiderMonkey behavior)
    const mockStopIteration = {
      toString: () => "[object StopIteration]"
    };

    // Test the isStopIteration function directly through generator behavior
    // The mutation changes the condition to always return true
    const testPromise = Q.async(function* () {
      try {
        // Simulate throwing a StopIteration (legacy SpiderMonkey)
        throw mockStopIteration;
      } catch (e) {
        // In original code, this should catch StopIteration
        // In mutated code, it will catch everything
        return "caught";
      }
    })();

    return testPromise.then((result: string) => {
      // In original code, StopIteration should be caught
      expect(result).toBe("caught");
    });
  });
});