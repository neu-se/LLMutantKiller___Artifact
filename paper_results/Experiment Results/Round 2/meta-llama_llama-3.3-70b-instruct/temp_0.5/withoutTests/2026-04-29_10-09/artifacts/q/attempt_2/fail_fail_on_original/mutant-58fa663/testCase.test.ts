import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should untrack rejection correctly", () => {
    const promise = Q.reject("error");
    const process = {
      emit: jest.fn(),
      nextTick: jest.fn(),
    };
    const originalProcess = global.process;
    global.process = process;
    Q.untrackRejection(promise);
    expect(process.emit).toHaveBeenCalledTimes(1);
    expect(process.emit).toHaveBeenCalledWith("rejectionHandled", "error", promise);
    global.process = originalProcess;
  });
});