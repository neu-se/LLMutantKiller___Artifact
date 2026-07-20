import { Q } from "./q.js";

describe("Q.nextTick behavior with setImmediate", () => {
  it("should use setImmediate when available for scheduling tasks", (done) => {
    // This test verifies that Q.nextTick properly uses setImmediate when available
    // by checking the execution order of tasks. In Node.js environments with setImmediate,
    // tasks should execute in a specific order that differs from setTimeout.

    const results: string[] = [];
    let setImmediateAvailable = typeof setImmediate === "function";

    // Skip test if setImmediate is not available
    if (!setImmediateAvailable) {
      done();
      return;
    }

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
  });
});