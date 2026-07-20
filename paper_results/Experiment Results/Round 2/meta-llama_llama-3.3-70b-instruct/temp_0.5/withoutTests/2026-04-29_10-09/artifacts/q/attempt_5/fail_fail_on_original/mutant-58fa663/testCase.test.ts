import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejection tracking correctly", () => {
    const promise = Q.reject("error");
    const process = {
      emit: jest.fn(),
      nextTick: jest.fn(),
    };
    const originalProcess = global.process;
    global.process = process;
    Q.nextTick.runAfter(() => {
      expect(process.emit).toHaveBeenCalledTimes(1);
      expect(process.emit).toHaveBeenCalledWith("unhandledRejection", "error", promise);
    });
    Q.stopUnhandledRejectionTracking();
    Q.nextTick.runAfter(() => {
      expect(process.emit).toHaveBeenCalledTimes(1);
    });
    global.process = originalProcess;
  });
});