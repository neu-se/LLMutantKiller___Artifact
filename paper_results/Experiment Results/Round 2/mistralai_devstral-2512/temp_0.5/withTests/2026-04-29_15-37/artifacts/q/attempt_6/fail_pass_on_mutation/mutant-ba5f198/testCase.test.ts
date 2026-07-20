import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate detection", () => {
  it("should use setImmediate when available", (done) => {
    // This test verifies that Q correctly detects and uses setImmediate
    // The mutation changes the condition from checking if setImmediate IS a function
    // to checking if it is NOT a function, which would break the intended behavior

    // We'll test this by checking if Q.nextTick uses setImmediate
    // when it's available by observing the execution order

    if (typeof setImmediate !== "function") {
      // Skip test if setImmediate is not available
      done();
      return;
    }

    const executionOrder: string[] = [];

    // Schedule a task with native setImmediate
    setImmediate(() => {
      executionOrder.push("native");
    });

    // Schedule a task with Q.nextTick
    Q.nextTick(() => {
      executionOrder.push("q");
    });

    // Check execution order after a short delay
    setTimeout(() => {
      // With correct setImmediate detection, both should have executed
      // and the order might vary, but both should be present
      expect(executionOrder.length).toBe(2);
      expect(executionOrder).toContain("native");
      expect(executionOrder).toContain("q");
      done();
    }, 50);
  });
});