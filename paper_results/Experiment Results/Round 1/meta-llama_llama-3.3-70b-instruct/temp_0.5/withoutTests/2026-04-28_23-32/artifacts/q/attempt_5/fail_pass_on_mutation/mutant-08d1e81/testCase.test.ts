import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not call process.emit when process.emit is not a function", (done) => {
    const originalProcessEmit = process.emit;
    const emitSpy = jest.fn();
    process.emit = emitSpy;
    const promise = Q.reject("test");
    Q.nextTick.runAfter(() => {
      process.emit = undefined;
      Q.nextTick.runAfter(() => {
        expect(emitSpy).not.toHaveBeenCalled();
        process.emit = originalProcessEmit;
        done();
      });
    });
  });
});