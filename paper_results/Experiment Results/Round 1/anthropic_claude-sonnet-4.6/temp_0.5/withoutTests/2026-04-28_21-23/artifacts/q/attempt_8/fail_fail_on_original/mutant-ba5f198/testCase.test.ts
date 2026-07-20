import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tick mechanism uses setImmediate", () => {
  it("a setImmediate scheduled before Q.nextTick should run before Q task when Q uses setImmediate", (done) => {
    const order: string[] = [];

    // Schedule setImmediate FIRST
    setImmediate(() => {
      order.push("setImmediate");
    });

    // Then schedule Q task - if Q uses setImmediate, it goes into setImmediate queue AFTER
    // If Q uses process.nextTick, Q task runs BEFORE setImmediate
    Q.nextTick(() => {
      order.push("Q");
      // With setImmediate: setImmediate was first, so order is ["setImmediate", "Q"]
      // With process.nextTick: Q runs before setImmediate, so order is ["Q", ...]
      expect(order[0]).toBe("setImmediate");
      done();
    });
  });
});