import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior", () => {
  it("should execute tasks when added to the queue", (done) => {
    let taskExecuted = false;

    // Add a task to the nextTick queue
    Q.nextTick(() => {
      taskExecuted = true;
    });

    // The mutation changes the condition from `if (!flushing)` to `if (false)`
    // which means tasks won't be executed unless we force a flush
    // We can detect this by checking if the task was executed after a timeout
    setTimeout(() => {
      if (taskExecuted) {
        done();
      } else {
        done(new Error("Task was not executed - mutation detected"));
      }
    }, 10);
  });
});