import { Q } from "./q.js";

describe("Q.nextTick", () => {
  it("should process tasks in the laterQueue", (done) => {
    const task = jest.fn();
    Q.nextTick.runAfter(task);
    Q.nextTick(() => {
      expect(task).not.toHaveBeenCalled();
    });
    setTimeout(() => {
      expect(task).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});