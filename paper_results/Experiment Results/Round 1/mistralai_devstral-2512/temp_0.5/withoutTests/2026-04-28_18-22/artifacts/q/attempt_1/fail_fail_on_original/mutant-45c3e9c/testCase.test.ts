import { Q } from "./q.js";

describe("Q.nextTick.runAfter behavior", () => {
  it("should execute tasks added via runAfter when not flushing", (done) => {
    let taskExecuted = false;

    // Add a task via runAfter
    Q.nextTick.runAfter(() => {
      taskExecuted = true;
    });

    // Give the event loop time to process the task
    setTimeout(() => {
      expect(taskExecuted).toBe(true);
      done();
    }, 10);
  });
});