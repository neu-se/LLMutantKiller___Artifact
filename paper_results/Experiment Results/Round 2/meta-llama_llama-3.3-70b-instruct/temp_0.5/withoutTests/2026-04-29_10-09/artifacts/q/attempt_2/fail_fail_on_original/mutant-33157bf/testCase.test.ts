import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    const originalProcessEmit = global.process.emit;
    global.process.emit = jest.fn();
    Q.nextTick.runAfter(() => {
      expect(global.process.emit).toHaveBeenCalledTimes(1);
    });
    global.process.emit = originalProcessEmit;
  });
});