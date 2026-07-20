import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections only when process.emit is a function", (done) => {
    const originalProcessEmit = process.emit;
    process.emit = undefined;
    const promise = Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(Q.getUnhandledReasons()).toEqual([]);
      process.emit = originalProcessEmit;
      done();
    });
  });
});