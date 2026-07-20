import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick scheduling", () => {
  it("should execute a task scheduled via Q.nextTick", (done) => {
    let executed = false;
    
    expect(() => {
      Q.nextTick(function() {
        executed = true;
        expect(executed).toBe(true);
        done();
      });
    }).not.toThrow();
    
    // If requestTick is undefined (mutant), the above throws synchronously
    // Give it time to run asynchronously in the original
    setTimeout(() => {
      if (!executed) {
        done(new Error("nextTick callback was never executed"));
      }
    }, 500);
  });
});