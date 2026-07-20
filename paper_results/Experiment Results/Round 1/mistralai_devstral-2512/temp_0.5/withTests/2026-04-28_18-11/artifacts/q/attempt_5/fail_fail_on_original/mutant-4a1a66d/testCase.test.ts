// Test case to detect the mutation in the async function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("async function mutation detection", () => {
  it("should correctly handle ES6 generators with StopIteration", async () => {
    // Create a mock StopIteration to simulate SpiderMonkey environment
    const originalStopIteration = global.StopIteration;
    global.StopIteration = function(value) {
      this.value = value;
    };

    try {
      const testGenerator = function* () {
        yield Q(10);
        return 15;
      };

      // In the original code, this would use the SpiderMonkey path
      // In the mutated code, it would incorrectly use the ES6 path
      const result = await Q.async(testGenerator)();

      expect(result).toBe(15);
    } finally {
      // Restore original state
      if (originalStopIteration === undefined) {
        delete global.StopIteration;
      } else {
        global.StopIteration = originalStopIteration;
      }
    }
  });
});