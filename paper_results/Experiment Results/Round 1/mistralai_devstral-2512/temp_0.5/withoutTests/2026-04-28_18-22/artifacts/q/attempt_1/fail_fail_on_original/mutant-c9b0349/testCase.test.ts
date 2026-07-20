// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c9b0349/testCase.test.ts
import { Q } from "./q";

describe("Q stack trace filtering", () => {
  it("should filter internal Q frames from stack traces", async () => {
    // Create a promise chain that will generate a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    // Force the promise to be handled in a way that would normally include Q internal frames
    try {
      await promise;
    } catch (e) {
      // The mutation causes all frames to be considered "internal" (true && condition)
      // This means the stack trace should be empty or minimal in the mutated version
      // while it should contain application frames in the original version
      const stackLines = e.stack.split('\n');
      const hasApplicationFrames = stackLines.some(line =>
        line.includes("testCase.test.ts") || line.includes("at ")
      );

      // In the original code, application frames should remain
      // In the mutated code, all frames are filtered out (true && condition)
      expect(hasApplicationFrames).toBe(true);
    }
  });
});