// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-297799b/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace filtering", () => {
  it("should correctly identify node.js internal frames", async () => {
    const Q = (qModule as any).default || qModule;
    Q.longStackSupport = true;

    // Create a promise that will generate stack traces
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Manually set a stack trace that includes node.js frames
    error.stack = `
Error: Test error
    at Test.testFunction (user.js:10:5)
    at (module.js:47:11)
    at (node.js:123:45)
    at Object.<anonymous> (user.js:15:3)
`.trim();

    deferred.reject(error);

    try {
      await deferred.promise;
    } catch (e: any) {
      const stackLines = e.stack.split('\n');
      // In original code: should filter out (module.js:) and (node.js:) frames
      // In mutated code: would filter all frames (return true)
      const hasUserFrames = stackLines.some(line =>
        line.includes('user.js') && !line.includes('(module.js:') && !line.includes('(node.js:')
      );
      expect(hasUserFrames).toBe(true);

      // Check that internal frames were actually filtered
      const hasInternalFrames = stackLines.some(line =>
        line.includes('(module.js:') || line.includes('(node.js:')
      );
      expect(hasInternalFrames).toBe(false);
    }
  });
});