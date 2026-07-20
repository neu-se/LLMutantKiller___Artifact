import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick direct task execution", () => {
  it("should execute a task added via Q.nextTick", (done) => {
    // With the mutation (if (false)), requestTick() is never called,
    // so tasks added to the queue are never executed.
    // This directly tests that Q.nextTick actually runs the task.
    let executed = false;
    
    Q.nextTick(function () {
      executed = true;
      expect(executed).toBe(true);
      done();
    });
    
    // If mutation is present, done() is never called and Jest times out
  });
});