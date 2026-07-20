const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick.runAfter behavior", () => {
  it("should execute runAfter tasks when flushing is false", (done) => {
    let runAfterExecuted = false;
    let mainTaskExecuted = false;

    // First, add a task that will set flushing to true
    Q.nextTick(function() {
      mainTaskExecuted = true;
    });

    // Then add a runAfter task that should execute
    Q.nextTick.runAfter(function() {
      runAfterExecuted = true;
    });

    setTimeout(function() {
      expect(mainTaskExecuted).toBe(true);
      expect(runAfterExecuted).toBe(true);
      done();
    }, 20);
  });
});