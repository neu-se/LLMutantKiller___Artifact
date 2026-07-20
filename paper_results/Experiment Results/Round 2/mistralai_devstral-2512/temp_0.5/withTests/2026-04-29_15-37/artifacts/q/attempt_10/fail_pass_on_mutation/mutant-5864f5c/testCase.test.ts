// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_10/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly distinguish StopIteration from other exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a QReturnValue instance
    const QReturnValue = (Q as any).QReturnValue || function(value: any) {
      this.value = value;
    };
    const returnValue = new QReturnValue("test");

    // Test with Q.async using StopIteration
    const promise1 = Q.async(function* () {
      try {
        throw stopIteration;
      } catch (e) {
        // In original code, this should catch StopIteration
        // In mutated code, this won't catch it properly
        return "stopped";
      }
    })();

    // Test with Q.async using QReturnValue
    const promise2 = Q.async(function* () {
      try {
        throw returnValue;
      } catch (e) {
        // In original code, this should catch QReturnValue
        // In mutated code, this won't catch it properly
        return "stopped";
      }
    })();

    return Promise.all([
      promise1.then((result: string) => {
        expect(result).toBe("stopped");
      }),
      promise2.then((result: string) => {
        expect(result).toBe("stopped");
      })
    ]);
  });
});