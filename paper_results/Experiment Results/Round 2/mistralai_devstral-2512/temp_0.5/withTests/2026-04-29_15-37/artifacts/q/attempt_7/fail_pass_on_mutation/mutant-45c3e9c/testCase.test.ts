import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should immediately flush tasks when first task is added", (done) => {
    let executionCount = 0;

    Q.nextTick(() => {
      executionCount++;
    });

    // In the original code, adding the first task should trigger immediate flush
    // In the mutated code (if (false)), the flush won't happen
    setTimeout(() => {
      if (executionCount === 1) {
        done();
      } else {
        done(new Error("Task was not executed - mutation detected"));
      }
    }, 0);
  });
});