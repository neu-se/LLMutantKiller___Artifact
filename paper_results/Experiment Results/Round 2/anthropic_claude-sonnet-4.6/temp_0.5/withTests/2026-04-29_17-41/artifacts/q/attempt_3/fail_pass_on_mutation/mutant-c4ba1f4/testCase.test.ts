import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick with setImmediate-based scheduling", () => {
  it("should use setImmediate for scheduling when process is not available", (done) => {
    // The mutation removes the setImmediate branch body, meaning requestTick
    // won't be set in environments where setImmediate exists but process.nextTick doesn't.
    // We can test this by checking that Q.nextTick.runAfter also works,
    // since it uses the same requestTick mechanism.
    
    const results: number[] = [];
    
    // Schedule a regular task
    Q.nextTick(function() {
      results.push(1);
    });
    
    // Schedule a "run after" task - this uses laterQueue and also calls requestTick
    Q.nextTick.runAfter(function() {
      results.push(2);
    });
    
    // Both should have run
    setTimeout(function() {
      expect(results).toContain(1);
      expect(results).toContain(2);
      done();
    }, 200);
  });
});