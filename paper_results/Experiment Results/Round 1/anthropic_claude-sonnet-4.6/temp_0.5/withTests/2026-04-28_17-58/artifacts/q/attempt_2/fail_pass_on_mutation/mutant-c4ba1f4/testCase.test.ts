import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick scheduling", () => {
  it("should execute tasks in correct order using setImmediate over process.nextTick", () => {
    return new Promise<void>((resolve, reject) => {
      const order: string[] = [];

      // process.nextTick fires before setImmediate in Node.js event loop
      // In original code: requestTick uses setImmediate (when available in Node)
      // In mutated code: requestTick uses process.nextTick

      // Schedule something with process.nextTick - it should run BEFORE Q's flush
      // if Q uses setImmediate (original), but AFTER or interleaved if Q uses process.nextTick (mutated)
      process.nextTick(() => {
        order.push("nextTick");
      });

      Q.nextTick(() => {
        order.push("Q.nextTick");
      });

      // Use setImmediate to check results after both have run
      setImmediate(() => {
        setImmediate(() => {
          try {
            // In original (setImmediate): nextTick runs before Q.nextTick
            // In mutated (process.nextTick): Q.nextTick runs before or same as nextTick
            expect(order[0]).toBe("nextTick");
            expect(order[1]).toBe("Q.nextTick");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  });
});