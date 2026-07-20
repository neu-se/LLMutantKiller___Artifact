import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute tasks added via runAfter even when not currently flushing", (done) => {
    let taskExecuted = false;

    // Call runAfter when the flush cycle is not currently running
    // In the original code: if (!flushing) { flushing = true; requestTick(); }
    // In the mutated code: if (false) { ... } — the tick is never requested
    // so the laterQueue task never runs
    Q.nextTick.runAfter(function () {
      taskExecuted = true;
    });

    // Give enough time for the async flush to complete
    setTimeout(function () {
      if (taskExecuted) {
        done();
      } else {
        done(new Error("runAfter task was never executed — mutation detected"));
      }
    }, 200);
  });
});