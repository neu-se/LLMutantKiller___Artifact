import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tick mechanism", () => {
  it("should use setImmediate (not process.nextTick) so native promise microtasks run before Q tasks", (done) => {
    const order: string[] = [];

    // Schedule a Q task
    Q.nextTick(() => {
      order.push("Q");
    });

    // Schedule a native promise microtask - should run before setImmediate but after process.nextTick
    Promise.resolve().then(() => {
      order.push("native");
    });

    // Check after everything settles
    setImmediate(() => {
      // With setImmediate: native microtask runs first, then Q's setImmediate
      // With process.nextTick: Q runs before native promise microtasks
      expect(order[0]).toBe("native");
      expect(order[1]).toBe("Q");
      done();
    });
  });
});