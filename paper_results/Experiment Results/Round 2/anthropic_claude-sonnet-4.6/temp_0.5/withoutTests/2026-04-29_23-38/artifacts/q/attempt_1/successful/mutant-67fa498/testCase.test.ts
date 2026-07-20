import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick.runAfter", () => {
  it("should execute tasks scheduled with runAfter", (done) => {
    const results: string[] = [];
    
    Q.nextTick.runAfter(function () {
      results.push("runAfter");
    });
    
    // Use a regular promise resolution to wait for async processing
    Q.resolve(1).then(function () {
      // After this tick, runAfter tasks should have run
      return Q.resolve(2);
    }).then(function () {
      setTimeout(function () {
        expect(results).toContain("runAfter");
        done();
      }, 50);
    });
  });
});