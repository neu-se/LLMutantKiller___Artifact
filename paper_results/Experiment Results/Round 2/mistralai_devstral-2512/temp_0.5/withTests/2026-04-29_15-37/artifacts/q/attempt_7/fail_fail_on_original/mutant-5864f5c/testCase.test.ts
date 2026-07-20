// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions in async context", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };

    // Create a mock generator that throws StopIteration
    const mockGenerator = {
      next: () => {
        throw stopIteration;
      }
    };

    // Test with Q.async - should catch StopIteration
    const promise = Q.async(function* () {
      try {
        yield mockGenerator.next();
        return "not stopped";
      } catch (e) {
        // Check if the exception is StopIteration using the internal function
        const isStopIteration = (Q as any).isStopIteration;
        if (isStopIteration && isStopIteration(e)) {
          return "stopped";
        }
        throw e;
      }
    })();

    return promise.then((result: string) => {
      expect(result).toBe("stopped");
    });
  });
});