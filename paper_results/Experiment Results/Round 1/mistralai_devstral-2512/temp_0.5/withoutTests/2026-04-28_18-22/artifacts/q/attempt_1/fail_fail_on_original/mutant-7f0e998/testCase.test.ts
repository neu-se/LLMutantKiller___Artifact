// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-7f0e998/testCase.test.ts
import { Q } from "./q.js";

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Force the promise to be handled in a way that would normally include Q internal frames
    try {
      await promise;
    } catch (e) {
      // The mutation would incorrectly include internal Q frames in the stack trace
      // We check that internal Q frames are properly filtered out
      const stack = e.stack || "";
      // The original code filters out internal frames, so we shouldn't see q.js in the stack
      // The mutated code would include them, so this test would fail
      expect(stack).not.toContain("q.js");
    }
  });
});