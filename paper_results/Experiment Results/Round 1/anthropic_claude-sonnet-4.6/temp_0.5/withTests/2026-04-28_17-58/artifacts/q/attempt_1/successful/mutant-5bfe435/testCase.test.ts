import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick scheduling priority", () => {
  it("should use process.nextTick in Node.js, which runs before setImmediate", (done) => {
    const order: string[] = [];

    // Schedule via setImmediate first
    setImmediate(() => {
      order.push("setImmediate");
    });

    // Schedule via Q.nextTick - in original code this uses process.nextTick
    // which runs before setImmediate; in mutated code it uses setImmediate
    Q.nextTick(() => {
      order.push("Q.nextTick");
    });

    // Check after both have had a chance to run
    setImmediate(() => {
      setImmediate(() => {
        // In original: process.nextTick runs before setImmediate, so order is ["Q.nextTick", "setImmediate"]
        // In mutated: both use setImmediate, so order is ["setImmediate", "Q.nextTick"]
        expect(order[0]).toBe("Q.nextTick");
        expect(order[1]).toBe("setImmediate");
        done();
      });
    });
  });
});