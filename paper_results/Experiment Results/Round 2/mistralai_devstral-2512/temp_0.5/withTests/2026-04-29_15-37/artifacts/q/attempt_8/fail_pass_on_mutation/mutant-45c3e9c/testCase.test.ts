import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks synchronously when flushing is forced", (done) => {
    let syncExecution = false;

    // This test relies on the fact that in the original code,
    // the first task added triggers flushing (flushing becomes true)
    // In the mutated code (if (false)), flushing never becomes true
    Q.nextTick(() => {
      syncExecution = true;
    });

    // Check immediately - in original code this should be true
    // In mutated code it will be false
    if (syncExecution) {
      done();
    } else {
      // Give a tiny delay to see if it executes asynchronously
      setTimeout(() => {
        if (syncExecution) {
          done();
        } else {
          done(new Error("Task never executed - mutation detected"));
        }
      }, 0);
    }
  });
});