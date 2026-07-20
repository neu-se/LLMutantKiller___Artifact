import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should call process.emit when tracking unhandled rejections", (done) => {
    const originalProcessEmit = process.emit;
    let emitCalled = false;
    process.emit = (event, reason, promise) => {
      emitCalled = true;
    };
    const promise = Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(emitCalled).toBe(true);
      process.emit = originalProcessEmit;
      done();
    });
  });
});