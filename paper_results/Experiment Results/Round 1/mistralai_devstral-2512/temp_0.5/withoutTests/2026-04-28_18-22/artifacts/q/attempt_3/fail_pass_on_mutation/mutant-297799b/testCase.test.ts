// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-297799b/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal stack frames", async () => {
    // Access Q through the module's default export
    const Q = (qModule as any).default || qModule;

    // Create a promise chain that will generate stack traces
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Reject the promise to trigger stack trace generation
    deferred.reject(new Error("Test error"));

    try {
      await promise;
    } catch (e: any) {
      // The mutation changes isInternalFrame to always return true
      // This should cause all stack frames to be filtered out
      // In the original code, some frames should remain
      const stackLines = e.stack.split('\n');
      expect(stackLines.length).toBeGreaterThan(1);
    }
  });
});