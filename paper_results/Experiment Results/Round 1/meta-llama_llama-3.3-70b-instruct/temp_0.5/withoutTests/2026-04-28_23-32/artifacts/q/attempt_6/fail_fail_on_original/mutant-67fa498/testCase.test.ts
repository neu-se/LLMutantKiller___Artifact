import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick", () => {
  it("should process tasks in the laterQueue", () => {
    const task = jest.fn();
    Q.nextTick.runAfter(task);
    expect(task).not.toHaveBeenCalled();
  });
});