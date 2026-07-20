const Q = require("./q.js");

describe("Q.nextTick", () => {
  it("should process tasks in the laterQueue", (done) => {
    const task = jest.fn();
    const spy = jest.spyOn(Q, "nextTick");
    Q.nextTick.runAfter(task);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(task).toHaveBeenCalledTimes(1);
      done();
    }, 10);
  });
});