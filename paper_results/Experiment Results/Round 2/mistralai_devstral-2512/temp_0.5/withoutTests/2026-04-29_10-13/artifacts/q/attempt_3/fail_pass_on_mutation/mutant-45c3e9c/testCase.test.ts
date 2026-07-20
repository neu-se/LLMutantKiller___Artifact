const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick.runAfter behavior", () => {
  it("should execute tasks added via runAfter when not flushing", (done) => {
    let executed = false;
    Q.nextTick(function() {
      // This should trigger flushing
    });

    Q.nextTick.runAfter(function() {
      executed = true;
    });

    setTimeout(function() {
      expect(executed).toBe(true);
      done();
    }, 10);
  });
});