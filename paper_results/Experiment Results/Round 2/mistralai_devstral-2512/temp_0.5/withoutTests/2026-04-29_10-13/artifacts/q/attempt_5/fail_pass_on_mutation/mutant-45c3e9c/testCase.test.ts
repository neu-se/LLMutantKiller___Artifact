const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick.runAfter behavior", () => {
  it("should execute runAfter tasks when flushing is false", (done) => {
    let executionOrder: string[] = [];

    Q.nextTick(function() {
      executionOrder.push("main");
    });

    Q.nextTick.runAfter(function() {
      executionOrder.push("runAfter");
    });

    setTimeout(function() {
      expect(executionOrder).toEqual(["main", "runAfter"]);
      done();
    }, 20);
  });
});