describe("Q runSingle error handling - non-Node environment", () => {
  it("should continue processing remaining tasks in same flush when a task throws (non-Node behavior)", () => {
    let Q: any;

    jest.isolateModules(() => {
      const origToString = process.toString;
      const origSetImmediate = (global as any).setImmediate;
      const origMessageChannel = (global as any).MessageChannel;

      // Force isNodeJS = false by making process.toString return non-Node string
      (process as any).toString = () => "[object Object]";
      // Force requestTick to use setTimeout (not setImmediate or MessageChannel)
      (global as any).setImmediate = undefined;
      (global as any).MessageChannel = undefined;

      Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

      (process as any).toString = origToString;
      (global as any).setImmediate = origSetImmediate;
      (global as any).MessageChannel = origMessageChannel;
    });

    jest.useFakeTimers();

    const results: string[] = [];

    Q.nextTick(() => {
      results.push("task1");
      throw new Error("intentional error");
    });

    Q.nextTick(() => {
      results.push("task2");
    });

    try {
      jest.runOnlyPendingTimers();
    } catch (e) {
      // In mutated code (if true), error thrown synchronously propagates out of flush
    }

    // Original (isNodeJS=false): async throw, flush continues, task2 runs in same flush
    // Mutated (if true): sync throw interrupts flush, task2 not yet run
    expect(results).toEqual(["task1", "task2"]);

    jest.useRealTimers();
  });
});