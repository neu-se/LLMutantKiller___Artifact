import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick uses process.nextTick in Node.js environment", () => {
  it("should schedule Q.nextTick callbacks before setImmediate callbacks", (done) => {
    const order: string[] = [];

    // Schedule via setImmediate - should run AFTER process.nextTick
    setImmediate(() => {
      order.push("setImmediate");
    });

    // Schedule via Q.nextTick - if using process.nextTick internally,
    // this should run BEFORE setImmediate
    Q.nextTick(() => {
      order.push("Q.nextTick");
    });

    // Use setImmediate to check the result after both have run
    setImmediate(() => {
      setImmediate(() => {
        // In original code: Q.nextTick uses process.nextTick, so order is ["Q.nextTick", "setImmediate"]
        // In mutated code: Q.nextTick uses setImmediate, so order is ["setImmediate", "Q.nextTick"]
        expect(order).toEqual(["Q.nextTick", "setImmediate"]);
        done();
      });
    });
  });
});