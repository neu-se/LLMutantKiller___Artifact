import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection condition", () => {
  it("does not call Q.nextTick.runAfter when process.emit is not a function", (done) => {
    Q.resetUnhandledRejections();

    const originalEmit = process.emit.bind(process);
    const originalRunAfter = (Q.nextTick as any).runAfter;
    let runAfterCallCount = 0;

    // Replace emit BEFORE creating rejection
    (process as any).emit = "not a function";
    
    // Intercept runAfter
    (Q.nextTick as any).runAfter = function (task: Function) {
      runAfterCallCount++;
      return originalRunAfter(task);
    };

    const error = new Error("test");
    const rejected = Q.reject(error);  // trackRejection called - process.emit not a function, so no runAfter from trackRejection
    
    rejected.fail(function () {
      return "handled";
    });

    setTimeout(function () {
      (process as any).emit = originalEmit;
      (Q.nextTick as any).runAfter = originalRunAfter;

      // Original (&&): typeof process === "object" && typeof "not a function" === "function" = false → runAfter NOT called
      // Mutated (||): typeof process === "object" || ... = true → runAfter IS called
      // trackRejection also has its own && check (not mutated), so it won't call runAfter either
      // Total runAfter calls: 0 (original) vs 1 (mutated)
      expect(runAfterCallCount).toBe(0);
      done();
    }, 200);
  });
});