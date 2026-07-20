// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_8/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly handle StopIteration in generator context", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a mock generator that throws StopIteration
    const mockGenerator = {
      next: () => {
        throw stopIteration;
      }
    };

    // Test with Q.async - should catch StopIteration and return its value
    const promise = Q.async(function* () {
      try {
        yield mockGenerator.next();
        return "not stopped";
      } catch (e) {
        // In original code, this should catch StopIteration
        // In mutated code, this won't catch it properly
        return "stopped";
      }
    })();

    return promise.then((result: string) => {
      expect(result).toBe("stopped");
    });
  });
});