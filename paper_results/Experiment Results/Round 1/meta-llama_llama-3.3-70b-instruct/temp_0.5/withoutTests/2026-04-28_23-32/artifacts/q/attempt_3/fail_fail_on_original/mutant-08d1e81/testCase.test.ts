import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not track unhandled rejections when process.emit is not a function", (done) => {
    const originalProcessEmit = process.emit;
    process.emit = undefined;
    const promise = Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(Q.getUnhandledReasons()).toHaveLength(0);
      process.emit = originalProcessEmit;
      done();
    });
  });
});