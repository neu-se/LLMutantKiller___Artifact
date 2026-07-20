import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick re-triggering after flush completes", () => {
  it("should execute tasks queued after a flush cycle has completed", (done) => {
    // First, let an initial flush cycle complete
    Q.nextTick(function () {
      // Now flushing is false again. Queue a new task.
      // Original: !flushing is true, so requestTick() is called
      // Mutated: if (false), so requestTick() is never called, task never runs
      let secondTaskRan = false;
      Q.nextTick(function () {
        secondTaskRan = true;
        expect(secondTaskRan).toBe(true);
        done();
      });
    });
  });
});