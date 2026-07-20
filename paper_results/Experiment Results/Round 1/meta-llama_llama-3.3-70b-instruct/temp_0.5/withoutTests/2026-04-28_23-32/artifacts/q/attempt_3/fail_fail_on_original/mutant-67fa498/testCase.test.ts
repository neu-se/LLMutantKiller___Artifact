import { Q } from "./q.js";

describe("Q.nextTick", () => {
  it("should process tasks in the laterQueue", (done) => {
    const task = jest.fn();
    Q.nextTick.runAfter(task);
    Q.nextTick(() => {
      if (task.mock.calls.length === 0) {
        throw new Error("Task was not called");
      }
      done();
    });
  });
});