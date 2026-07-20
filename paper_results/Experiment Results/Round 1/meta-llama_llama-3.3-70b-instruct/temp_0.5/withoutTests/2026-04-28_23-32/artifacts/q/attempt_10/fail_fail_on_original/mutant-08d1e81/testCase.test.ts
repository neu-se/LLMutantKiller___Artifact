import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections when process.emit is defined", (done) => {
    const originalProcessEmit = process.emit;
    const spy = jest.spyOn(process, 'emit');
    process.emit = (event: string, reason: any, promise: any) => {
      if (event === 'unhandledRejection') {
        return true;
      }
    };
    Q.reject("test");
    Q.nextTick.runAfter(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      process.emit = originalProcessEmit;
      done();
    });
  });
});