import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should track unhandled rejections correctly", () => {
    const originalProcess = global.process;
    const emitSpy = jest.spyOn(originalProcess, 'emit');
    const promise = Q.reject("Test rejection");
    Q.nextTick.runAfter(() => {
      expect(emitSpy).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', "Test rejection", promise);
    });
    jest.restoreAllMocks();
  });
});