import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should handle unhandled rejection tracking correctly", () => {
    const originalTrackUnhandledRejections = Q.trackUnhandledRejections;
    Q.trackUnhandledRejections = true;
    const process = {
      emit: jest.fn(),
    };
    const originalProcess = global.process;
    global.process = process;
    const promise = Q.reject("error");
    Q.nextTick.runAfter(() => {
      expect(process.emit).toHaveBeenCalledTimes(1);
      expect(process.emit).toHaveBeenCalledWith("unhandledRejection", "error", promise);
    });
    Q.trackUnhandledRejections = originalTrackUnhandledRejections;
    global.process = originalProcess;
  });
});