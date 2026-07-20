import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tick scheduling relative to setImmediate", () => {
  it("Q.nextTick task should run after a setImmediate scheduled before it", () => {
    return new Promise<void>((resolve, reject) => {
      const order: string[] = [];
      const timeout = setTimeout(() => reject(new Error("timed out")), 1000);

      // Schedule setImmediate first
      setImmediate(() => {
        order.push("setImmediate");
      });

      // Then schedule Q task
      Q.nextTick(() => {
        order.push("Q");
      });

      // Check after both should have fired
      setImmediate(() => {
        setImmediate(() => {
          clearTimeout(timeout);
          try {
            // Original (Q uses setImmediate): both are setImmediate, first-in-first-out
            // so "setImmediate" fires before "Q"
            // Mutated (Q uses process.nextTick): "Q" fires before "setImmediate"
            expect(order[0]).toBe("setImmediate");
            expect(order[1]).toBe("Q");
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  });
});