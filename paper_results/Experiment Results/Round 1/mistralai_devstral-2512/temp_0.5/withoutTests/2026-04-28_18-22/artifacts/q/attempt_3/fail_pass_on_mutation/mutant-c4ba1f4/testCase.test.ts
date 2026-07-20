const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick with setImmediate", () => {
  it("should schedule tasks using setImmediate when available", (done) => {
    const results: string[] = [];

    // Only run this test if setImmediate is available
    if (typeof setImmediate === "function") {
      Q.nextTick(() => {
        results.push("qNextTick");
      });

      setImmediate(() => {
        results.push("setImmediate");
        // Give a small delay to allow Q's nextTick to potentially execute
        setTimeout(() => {
          // In the original code, Q should use setImmediate, so "qNextTick" should
          // appear before or with "setImmediate" in the results
          // In the mutated code, Q falls through to MessageChannel/setTimeout,
          // which would execute after setImmediate
          expect(results.indexOf("qNextTick")).toBeLessThanOrEqual(results.indexOf("setImmediate"));
          done();
        }, 10);
      });
    } else {
      // If setImmediate is not available, skip the test
      done();
    }
  });
});