// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-297799b/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace filtering", () => {
  it("should preserve non-internal stack frames in error traces", async () => {
    const Q = (qModule as any).default || qModule;

    // Create a scenario that will generate stack traces with both internal and external frames
    const deferred = Q.defer();
    Q.longStackSupport = true;

    // Create a custom error with a stack trace that includes node.js frames
    const error = new Error("Test error");
    error.stack = `
Error: Test error
    at Test.testFunction (test.js:10:5)
    at (module.js:47:11)
    at (node.js:123:45)
    at Object.<anonymous> (test.js:15:3)
`.trim();

    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      // In original code: should preserve non-internal frames (test.js lines)
      // In mutated code: all frames would be filtered (return true)
      const stackLines = e.stack.split('\n');
      const hasTestFrame = stackLines.some(line => line.includes('test.js'));
      expect(hasTestFrame).toBe(true);
    }
  });
});