import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick uses process.nextTick in Node.js environment", () => {
  it("should schedule callbacks using process.nextTick (before setImmediate) when running in real Node.js", (done) => {
    const executionOrder: string[] = [];

    // Schedule via setImmediate - should run AFTER process.nextTick
    setImmediate(() => {
      executionOrder.push("setImmediate");
    });

    // Schedule via Q.nextTick - in original code this uses process.nextTick
    // which runs before setImmediate in Node.js event loop
    Q.nextTick(() => {
      executionOrder.push("Q.nextTick");
    });

    // Use process.nextTick directly to check the result after both have run
    // process.nextTick callbacks are drained before setImmediate
    // So we need to wait for setImmediate to complete before checking
    setImmediate(() => {
      // By this point, if Q used process.nextTick, Q.nextTick ran before setImmediate
      // If Q used setImmediate (mutated code), order could be different
      try {
        expect(executionOrder[0]).toBe("Q.nextTick");
        expect(executionOrder[1]).toBe("setImmediate");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});