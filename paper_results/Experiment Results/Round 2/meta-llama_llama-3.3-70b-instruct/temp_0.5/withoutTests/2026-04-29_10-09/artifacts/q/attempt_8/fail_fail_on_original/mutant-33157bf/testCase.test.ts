import { Q } from "../../../q";

describe("Q", () => {
  it("should track unhandled rejections correctly", () => {
    const promise = Q.reject("Test rejection");
    const originalProcess = global.process;
    const emitSpy = jest.spyOn(originalProcess, 'emit');
    Q.nextTick.runAfter(() => {
      if (typeof originalProcess === "object" && typeof originalProcess.emit === "function") {
        expect(emitSpy).toHaveBeenCalledTimes(1);
        expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', "Test rejection", promise);
      } else {
        expect(emitSpy).not.toHaveBeenCalled();
      }
    });
    jest.restoreAllMocks();
  });
});