import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator mutation test", () => {
  it("should correctly handle generator execution in SpiderMonkey-style generators", async () => {
    // This test targets the mutation in the async function where
    // the try-catch block was emptied, which would prevent proper
    // execution of SpiderMonkey-style generators

    // Create a generator function that will be wrapped by Q.async
    function* testGeneratorFunction() {
      yield Q.delay(10, 10);
      return "test result";
    }

    // Force the SpiderMonkey path by defining StopIteration
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = function(value: any) {
      this.value = value;
    };

    try {
      const testGenerator = Q.async(testGeneratorFunction);
      const result = await testGenerator();
      expect(result).toBe("test result");
    } finally {
      // Restore original StopIteration
      if (originalStopIteration !== undefined) {
        (global as any).StopIteration = originalStopIteration;
      } else {
        delete (global as any).StopIteration;
      }
    }
  });
});