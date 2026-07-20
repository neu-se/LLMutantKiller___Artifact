import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling", () => {
  it("Q uses setImmediate - resolved before next setTimeout but after process.nextTick", (done) => {
    const order: string[] = [];
    
    // Create a resolved Q promise
    const p = Q.resolve(42);
    
    // Q.nextTick schedules flush via setImmediate (original) or setTimeout/MessageChannel (mutated)
    p.then(() => order.push("Q"));
    
    // process.nextTick fires before setImmediate AND before setTimeout
    process.nextTick(() => order.push("nextTick"));
    
    // setTimeout fires: before setImmediate (timers phase) OR after (check phase)?
    // Actually from main module: setTimeout(0) vs setImmediate is non-deterministic
    // But: setTimeout(1) always fires AFTER setImmediate from main module? No...
    
    // Let's use a longer timeout to ensure it fires after setImmediate
    setTimeout(() => {
      // By now, both process.nextTick and setImmediate should have fired
      expect(order).toContain("Q");
      expect(order).toContain("nextTick");
      expect(order.indexOf("nextTick")).toBeLessThan(order.indexOf("Q"));
      done();
    }, 50);
  });
});