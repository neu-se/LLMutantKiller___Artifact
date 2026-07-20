import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling", () => {
  it("resolves promises via setImmediate (after setTimeout(0))", (done) => {
    const order: string[] = [];
    
    // With isNodeJS=false: requestTick uses setImmediate
    // setImmediate fires AFTER setTimeout(fn, 0) callbacks
    // With isNodeJS=true: requestTick uses process.nextTick  
    // process.nextTick fires BEFORE setTimeout(fn, 0) callbacks
    
    setTimeout(() => { order.push("timeout"); }, 0);
    
    Q(1).then(() => {
      order.push("promise");
      // Original: setImmediate-based, so "timeout" runs before "promise"
      // Mutated: process.nextTick-based, so "promise" runs before "timeout"
      expect(order).toEqual(["timeout", "promise"]);
      done();
    });
  });
});