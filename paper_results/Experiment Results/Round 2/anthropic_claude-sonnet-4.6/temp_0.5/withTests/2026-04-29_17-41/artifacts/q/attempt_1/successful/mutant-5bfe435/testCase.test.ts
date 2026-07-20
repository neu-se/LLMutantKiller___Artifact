import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick behavior in Node.js environment", () => {
  it("should use process.nextTick for scheduling, completing promise resolution before setImmediate callbacks", (done) => {
    const order: string[] = [];

    // setImmediate runs after process.nextTick in Node.js event loop
    setImmediate(() => {
      order.push("setImmediate");
    });

    // Q.nextTick should use process.nextTick in original code (runs before setImmediate)
    // In mutated code, it uses setImmediate (runs at same time or after)
    Q.nextTick(() => {
      order.push("Q.nextTick");
    });

    setImmediate(() => {
      // By this point, if Q uses process.nextTick, it ran before the first setImmediate
      // If Q uses setImmediate, ordering is non-deterministic
      expect(order[0]).toBe("Q.nextTick");
      expect(order[1]).toBe("setImmediate");
      done();
    });
  });
});