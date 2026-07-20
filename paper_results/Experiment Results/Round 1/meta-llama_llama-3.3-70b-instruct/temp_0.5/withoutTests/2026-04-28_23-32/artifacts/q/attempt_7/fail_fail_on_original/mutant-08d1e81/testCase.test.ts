import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections when process.emit is a function", (done) => {
    const originalProcessEmit = process.emit;
    const spy = jest.spyOn(process, 'emit');
    Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockReset();
      process.emit = undefined;
      Q.reject("test");
      Q.nextTick.runAfter(() => {
        expect(spy).not.toHaveBeenCalled();
        process.emit = originalProcessEmit;
        done();
      });
    });
  });
});