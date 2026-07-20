const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick.runAfter behavior", () => {
  it("should execute runAfter tasks when not flushing", (done) => {
    let runAfterCalled = false;

    // Add a runAfter task before any nextTick tasks
    Q.nextTick.runAfter(function() {
      runAfterCalled = true;
    });

    setTimeout(function() {
      expect(runAfterCalled).toBe(true);
      done();
    }, 20);
  });
});