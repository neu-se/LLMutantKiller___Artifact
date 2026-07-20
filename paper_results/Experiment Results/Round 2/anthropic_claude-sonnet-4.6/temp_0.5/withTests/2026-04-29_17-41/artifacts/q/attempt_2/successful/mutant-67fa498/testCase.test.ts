import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute tasks scheduled with runAfter", (done) => {
    let runAfterExecuted = false;

    // Schedule a runAfter task - should run at end of flush cycle
    Q.nextTick.runAfter(function () {
      runAfterExecuted = true;
    });

    // Use setTimeout to check after the current event loop tick has fully processed
    setTimeout(function () {
      try {
        expect(runAfterExecuted).toBe(true);
        done();
      } catch (e) {
        done(e);
      }
    }, 50);
  });
});