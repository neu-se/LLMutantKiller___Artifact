const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const results: string[] = [];
    let completed = 0;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule a Q.nextTick task
      Q.nextTick(() => {
        results.push("q");
        if (++completed === 2) checkResults();
      });

      // Schedule a native setImmediate task
      setImmediate(() => {
        results.push("native");
        if (++completed === 2) checkResults();
      });

      function checkResults() {
        // In the original code, both should use the same mechanism (setImmediate)
        // so they should execute in a non-deterministic order but with similar timing
        // In the mutated code, Q falls back to MessageChannel/setTimeout which
        // executes after setImmediate, so "native" should always come first
        const qIndex = results.indexOf("q");
        const nativeIndex = results.indexOf("native");

        // The mutation causes Q to always execute after native setImmediate
        // while the original allows either order
        expect(qIndex).not.toBeGreaterThan(nativeIndex);
        done();
      }
    } else {
      done();
    }
  });
});