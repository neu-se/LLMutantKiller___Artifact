// Test case to detect the mutation in the async function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("async function mutation detection", () => {
  it("should correctly handle ES6 generators with StopIteration", () => {
    // Create a mock StopIteration to simulate SpiderMonkey environment
    const originalStopIteration = (global as any).StopIteration;
    (global as any).StopIteration = function(value: any) {
      this.value = value;
    };

    try {
      const testGenerator = function* () {
        yield Q(10);
        return Q(15);
      };

      // In the original code, this would use the SpiderMonkey path
      // In the mutated code, it would incorrectly use the ES6 path
      return Q.async(testGenerator)().then((result: any) => {
        // The result should be a Q promise in SpiderMonkey path
        // or the resolved value in ES6 path
        return Q.when(result, (val: number) => {
          expect(val).toBe(15);
        });
      });
    } finally {
      // Restore original state
      if (originalStopIteration === undefined) {
        delete (global as any).StopIteration;
      } else {
        (global as any).StopIteration = originalStopIteration;
      }
    }
  });
});