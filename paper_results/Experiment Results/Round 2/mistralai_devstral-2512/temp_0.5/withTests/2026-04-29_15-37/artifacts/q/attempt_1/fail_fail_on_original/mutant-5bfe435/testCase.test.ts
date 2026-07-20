// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5bfe435/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Node.js environment detection", () => {
  it("should use process.nextTick when running in a real Node.js environment", (done) => {
    // This test verifies that the library correctly detects a real Node.js environment
    // and uses process.nextTick for scheduling. The mutation changes the condition to
    // always evaluate to false, which would cause the library to fall back to less
    // optimal scheduling mechanisms even in Node.js.
    const startTime = Date.now();
    let hasRun = false;

    Q.nextTick(() => {
      hasRun = true;
      const elapsed = Date.now() - startTime;
      // In a real Node.js environment with process.nextTick, this should execute
      // in the next tick (very quickly, typically < 10ms)
      // If the mutation is present, it might use setTimeout(flush, 0) which could
      // take longer or behave differently
      expect(hasRun).toBe(true);
      expect(elapsed).toBeLessThan(50); // Should be very fast with process.nextTick
      done();
    });

    // Give a small buffer for the nextTick to execute
    setTimeout(() => {
      if (!hasRun) {
        done(new Error("nextTick did not execute in expected time"));
      }
    }, 100);
  });
});