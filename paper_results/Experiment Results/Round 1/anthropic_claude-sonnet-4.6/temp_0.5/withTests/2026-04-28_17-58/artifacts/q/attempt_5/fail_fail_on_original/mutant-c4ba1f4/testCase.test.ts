import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q setImmediate branch", () => {
  it("should use setImmediate for scheduling when available, firing after process.nextTick", () => {
    return new Promise<void>((resolve, reject) => {
      const order: string[] = [];

      // In original: Q uses setImmediate, so process.nextTick fires FIRST
      // In mutated: Q uses process.nextTick, so Q's task and this nextTick interleave

      // Queue a Q task
      Q.nextTick(() => {
        order.push("Q");
      });

      // Queue a native process.nextTick - fires before setImmediate but after current tick
      process.nextTick(() => {
        order.push("native-nextTick");
      });

      setImmediate(() => {
        setImmediate(() => {
          try {
            // Original (setImmediate): native-nextTick runs before Q's setImmediate
            expect(order).toEqual(["native-nextTick", "Q"]);
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  });
});