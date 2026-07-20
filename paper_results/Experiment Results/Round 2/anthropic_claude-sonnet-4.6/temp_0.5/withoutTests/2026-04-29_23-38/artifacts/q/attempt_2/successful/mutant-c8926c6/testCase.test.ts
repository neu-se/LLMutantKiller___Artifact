describe("Q Node.js environment detection", () => {
  it("should use setImmediate when process.toString() does not return [object process]", async () => {
    const originalToString = process.toString;
    (process as any).toString = () => "[object Object]";

    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    (process as any).toString = originalToString;

    const order: string[] = [];

    // We need to observe whether Q.nextTick fires via process.nextTick or setImmediate
    // Strategy: schedule Q.nextTick, then immediately schedule a process.nextTick
    // If Q uses process.nextTick: Q fires first (it was scheduled first)
    // If Q uses setImmediate: native process.nextTick fires first

    await new Promise<void>((resolve) => {
      Q.nextTick(() => {
        order.push("Q-nextTick");
      });

      process.nextTick(() => {
        order.push("native-nextTick");
      });

      // Use setImmediate to wait for everything to settle
      setImmediate(() => {
        setImmediate(() => {
          resolve();
        });
      });
    });

    const qIndex = order.indexOf("Q-nextTick");
    const nativeIndex = order.indexOf("native-nextTick");

    expect(order).toContain("Q-nextTick");
    expect(order).toContain("native-nextTick");

    // Original (isNodeJS=false → setImmediate): native-nextTick fires BEFORE Q-nextTick
    // Mutated (isNodeJS=true → process.nextTick): Q-nextTick fires BEFORE native-nextTick
    expect(nativeIndex).toBeLessThan(qIndex);
  });
});