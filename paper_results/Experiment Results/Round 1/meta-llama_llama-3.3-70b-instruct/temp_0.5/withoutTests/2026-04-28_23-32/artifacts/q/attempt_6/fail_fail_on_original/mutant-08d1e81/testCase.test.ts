import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections when process.emit is a function and not when it is not", (done) => {
    const originalProcessEmit = process.emit;
    let emitCalled = false;
    process.emit = (event, reason, promise) => {
      emitCalled = true;
    };
    const promise1 = Q.reject("test1");
    Q.nextTick.runAfter(() => {
      expect(emitCalled).toBe(true);
      process.emit = undefined;
      emitCalled = false;
      const promise2 = Q.reject("test2");
      Q.nextTick.runAfter(() => {
        expect(emitCalled).toBe(false);
        process.emit = originalProcessEmit;
        done();
      });
    });
  });
});