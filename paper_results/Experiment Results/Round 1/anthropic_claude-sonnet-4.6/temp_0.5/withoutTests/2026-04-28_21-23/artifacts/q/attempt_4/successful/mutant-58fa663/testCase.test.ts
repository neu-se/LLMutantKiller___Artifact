import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection", () => {
  it("should not invoke runAfter when process.emit is not a function", async () => {
    const originalEmit = process.emit;
    (process as any).emit = undefined;

    const runAfterCalls: Function[] = [];
    const originalRunAfter = Q.nextTick.runAfter;
    Q.nextTick.runAfter = (task: Function) => {
      runAfterCalls.push(task);
      originalRunAfter(task);
    };

    try {
      Q.resetUnhandledRejections();
      const d = Q.defer();
      d.reject(new Error("test"));
      await new Promise(r => setTimeout(r, 50));
      
      const countBefore = runAfterCalls.length;
      d.promise.fail(() => {});
      await new Promise(r => setTimeout(r, 100));
      
      const countAfter = runAfterCalls.length;
      // Original: no runAfter called during untrack (process.emit check fails with &&)
      // Mutated: runAfter IS called (|| makes condition true)
      expect(countAfter).toBe(countBefore);
    } finally {
      process.emit = originalEmit;
      Q.nextTick.runAfter = originalRunAfter;
    }
  });
});