import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should not track unhandled rejections when process.emit is not a function", (done) => {
    const originalProcessEmit = process.emit;
    const spy = jest.spyOn(process, 'emit');
    process.emit = undefined;
    Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(spy).not.toHaveBeenCalled();
      process.emit = originalProcessEmit;
      done();
    });
  });
});