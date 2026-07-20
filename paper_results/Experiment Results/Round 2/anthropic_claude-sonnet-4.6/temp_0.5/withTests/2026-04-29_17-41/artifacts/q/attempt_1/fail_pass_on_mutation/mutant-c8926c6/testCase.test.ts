import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick behavior in Node.js environment", () => {
  it("should use process.nextTick for scheduling (verifying process.toString check)", (done) => {
    // The mutation changes `process.toString() === "[object process]"` to `true`
    // In real Node.js, process.toString() === "[object process]" is true, so both behave the same.
    // We verify the condition that the original code relies on is actually true in this environment,
    // and that Q correctly identifies a real Node.js environment.
    
    // Verify we're in a real Node.js environment
    expect(process.toString()).toBe("[object process]");
    
    // Verify Q's nextTick works correctly using process.nextTick behavior
    // In Node.js, process.nextTick callbacks run before setImmediate/setTimeout
    const order: string[] = [];
    
    setImmediate(() => {
      order.push("setImmediate");
    });
    
    Q.nextTick(() => {
      order.push("Q.nextTick");
    });
    
    // process.nextTick runs before setImmediate
    process.nextTick(() => {
      // After this tick, Q.nextTick should have run before setImmediate
      setImmediate(() => {
        // By now both should have run, Q.nextTick should be before setImmediate
        expect(order).toEqual(["Q.nextTick", "setImmediate"]);
        done();
      });
    });
  });
});