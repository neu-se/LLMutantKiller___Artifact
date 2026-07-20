import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.async generator mutation test", () => {
  it("should correctly handle generator execution in SpiderMonkey-style generators", async () => {
    // This test targets the mutation in the async function where
    // the try-catch block was emptied, which would prevent proper
    // execution of SpiderMonkey-style generators

    // Force SpiderMonkey-style generator path by defining StopIteration
    const originalStopIteration = typeof StopIteration !== 'undefined' ? StopIteration : undefined;
    global.StopIteration = function(value) {
      this.value = value;
    };

    try {
      const testGenerator = Q.async(function() {
        return {
          next: function() {
            return { value: "test result", done: true };
          }
        };
      });

      const result = await testGenerator();
      expect(result).toBe("test result");
    } finally {
      // Restore original StopIteration
      if (originalStopIteration !== undefined) {
        global.StopIteration = originalStopIteration;
      } else {
        delete global.StopIteration;
      }
    }
  });
});