describe("Q", () => {
  it("should track unhandled rejections correctly", () => {
    const Q = require('./q.js');
    const promise = Q.reject("Test rejection");
    const originalProcess = global.process;
    const emitSpy = jest.spyOn(originalProcess, 'emit');
    Q.nextTick.runAfter(() => {
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', "Test rejection", promise);
    });
    jest.restoreAllMocks();
  });
});