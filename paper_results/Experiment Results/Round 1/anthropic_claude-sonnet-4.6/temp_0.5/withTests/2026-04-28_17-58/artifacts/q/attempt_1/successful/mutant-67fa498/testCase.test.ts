import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute tasks added to the laterQueue via runAfter after regular tick tasks", (done) => {
    const executionOrder: string[] = [];

    // Schedule a regular nextTick task
    Q.nextTick(function () {
      executionOrder.push("regular");
    });

    // Schedule a runAfter task - this uses laterQueue which is mutated to never run
    Q.nextTick.runAfter(function () {
      executionOrder.push("runAfter");
      // Verify both tasks ran and in correct order
      expect(executionOrder).toEqual(["regular", "runAfter"]);
      done();
    });

    // Set a timeout to fail the test if runAfter never executes (mutant case)
    setTimeout(function () {
      if (executionOrder.indexOf("runAfter") === -1) {
        done(new Error("runAfter task was never executed - laterQueue not being processed"));
      }
    }, 500);
  });
});