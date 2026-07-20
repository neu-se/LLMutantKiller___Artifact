import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nextTick.runAfter", () => {
  it("should execute the runAfter task even when the event loop is not currently flushing", (done) => {
    let wasExecuted = false;

    // Call runAfter when the event loop is idle (flushing = false)
    Q.nextTick.runAfter(function () {
      wasExecuted = true;
    });

    // Give enough time for the task to execute
    setTimeout(function () {
      expect(wasExecuted).toBe(true);
      done();
    }, 100);
  });
});