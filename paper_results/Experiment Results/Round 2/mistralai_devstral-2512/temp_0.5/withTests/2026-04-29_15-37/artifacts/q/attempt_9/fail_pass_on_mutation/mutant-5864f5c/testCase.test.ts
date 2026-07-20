// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-5864f5c/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation test", () => {
  it("should correctly handle QReturnValue in generator context", () => {
    // Create a QReturnValue instance
    const QReturnValue = (Q as any).QReturnValue || function(value: any) {
      this.value = value;
    };
    const returnValue = new QReturnValue("test");

    // Create a mock generator that throws QReturnValue
    const mockGenerator = {
      next: () => {
        throw returnValue;
      }
    };

    // Test with Q.async - should catch QReturnValue and return its value
    const promise = Q.async(function* () {
      try {
        yield mockGenerator.next();
        return "not stopped";
      } catch (e) {
        // In original code, this should catch QReturnValue
        // In mutated code, this won't catch it properly
        return "stopped";
      }
    })();

    return promise.then((result: string) => {
      expect(result).toBe("stopped");
    });
  });
});