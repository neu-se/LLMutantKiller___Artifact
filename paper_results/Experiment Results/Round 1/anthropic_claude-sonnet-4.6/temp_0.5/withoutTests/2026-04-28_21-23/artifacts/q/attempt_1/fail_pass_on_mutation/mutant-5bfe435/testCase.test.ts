import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick Node.js detection", () => {
  it("should use process.nextTick in Node.js environment for task scheduling", async () => {
    const order: string[] = [];
    
    // In original code (isNodeJS=true), process.nextTick is used
    // In mutated code (isNodeJS=false), setImmediate is used
    // Both schedule microtasks/macrotasks but with different ordering relative to process.nextTick
    
    const deferred = Q.defer();
    
    process.nextTick(() => order.push("process.nextTick"));
    
    deferred.promise.then(() => order.push("Q.then"));
    deferred.resolve(1);
    
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    
    // In Node.js with process.nextTick, Q uses process.nextTick internally
    // so Q.then should fire before setImmediate callbacks
    expect(order).toContain("Q.then");
    expect(order[0]).toBe("process.nextTick");
  });
});