const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick scheduling behavior", () => {
  it("should use setImmediate when available for task scheduling", (done) => {
    const results: string[] = [];
    let qCompleted = false;
    let nativeCompleted = false;

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      // Schedule a Q.nextTick task
      Q.nextTick(() => {
        results.push("q");
        qCompleted = true;
        if (nativeCompleted) checkResults();
      });

      // Schedule a native setImmediate task
      setImmediate(() => {
        results.push("native");
        nativeCompleted = true;
        if (qCompleted) checkResults();
      });

      // Timeout to ensure we don't hang
      setTimeout(checkResults, 100);

      function checkResults() {
        try {
          // In the original code, both should use setImmediate
          // In the mutated code, Q falls back to MessageChannel/setTimeout
          // which executes after setImmediate, so "native" should always come first
          const qIndex = results.indexOf("q");
          const nativeIndex = results.indexOf("native");

          // The mutation causes Q to always execute after native setImmediate
          expect(qIndex).toBeLessThan(nativeIndex);
          done();
        } catch (e) {
          done(e);
        }
      }
    } else {
      done();
    }
  });
});