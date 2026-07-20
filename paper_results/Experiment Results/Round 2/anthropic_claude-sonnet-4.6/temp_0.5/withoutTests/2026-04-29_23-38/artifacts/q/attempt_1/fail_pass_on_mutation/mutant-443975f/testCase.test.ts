import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling", () => {
  it("should use setImmediate for scheduling when available, firing before setTimeout", async () => {
    const order: string[] = [];
    
    // Schedule via setTimeout first
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        order.push("setTimeout");
        resolve();
      }, 0);
      
      // Q.nextTick should use setImmediate which fires before setTimeout
      Q.nextTick(() => {
        order.push("nextTick");
      });
    });
    
    // In original: setImmediate fires before setTimeout, so nextTick comes first
    // In mutated: setTimeout is used, ordering may be different
    expect(order[0]).toBe("nextTick");
  });
});