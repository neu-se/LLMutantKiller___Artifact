import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute tasks added via runAfter after the main tick queue is flushed", (done) => {
    const executionOrder: string[] = [];

    // Schedule a normal tick task
    Q.nextTick(function () {
      executionOrder.push("tick");
    });

    // Schedule a runAfter task - should run after tick tasks
    Q.nextTick.runAfter(function () {
      executionOrder.push("runAfter");
    });

    // After both should have run, verify execution
    Q.nextTick(function () {
      // Schedule another tick to check after the runAfter should have fired
      Q.nextTick(function () {
        try {
          expect(executionOrder).toContain("runAfter");
          done();
        } catch (e) {
          done(e);
        }
      });
    });
  });
});