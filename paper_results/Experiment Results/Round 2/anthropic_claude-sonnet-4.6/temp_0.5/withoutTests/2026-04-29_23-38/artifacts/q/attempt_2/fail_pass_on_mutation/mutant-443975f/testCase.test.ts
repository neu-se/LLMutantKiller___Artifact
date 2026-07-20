import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q scheduling mechanism", () => {
  it("Q.nextTick fires before setTimeout when setImmediate is available", (done) => {
    const order: string[] = [];
    
    // This setTimeout fires after setImmediate in Node.js
    const timeoutId = setTimeout(() => {
      order.push("setTimeout");
      // By the time setTimeout fires, Q.nextTick should have already fired
      // (original uses setImmediate, mutated uses setTimeout)
      expect(order[0]).toBe("Q.nextTick");
      done();
    }, 0);
    
    Q.nextTick(() => {
      order.push("Q.nextTick");
    });
  });
});