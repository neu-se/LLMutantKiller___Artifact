import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection process.emit guard", () => {
  it("schedules runAfter only when process.emit is a function", (done) => {
    const originalEmit = process.emit;
    let runAfterCallCount = 0;
    const originalRunAfter = (Q.nextTick as any).runAfter;

    // Spy on runAfter to count how many times it's called during untrackRejection
    (Q.nextTick as any).runAfter = function(task: Function) {
      runAfterCallCount++;
      return originalRunAfter.call(this, task);
    };

    // Make process.emit NOT a function
    (process as any).emit = null;

    Q.resetUnhandledRejections();

    // Create rejected promise - trackRejection is called
    // But since process.emit is null, trackRejection's runAfter won't be called either
    const rejected = Q.reject(new Error("test"));

    // Handle the rejection - untrackRejection is called
    rejected.fail(function() { return "handled"; });

    setTimeout(() => {
      (process as any).emit = originalEmit;
      (Q.nextTick as any).runAfter = originalRunAfter;

      // Original: runAfter NOT called in untrackRejection (typeof process.emit === "function" is false)
      // Mutated: runAfter IS called in untrackRejection (condition is always true)
      expect(runAfterCallCount).toBe(0);
      done();
    }, 200);
  });
});