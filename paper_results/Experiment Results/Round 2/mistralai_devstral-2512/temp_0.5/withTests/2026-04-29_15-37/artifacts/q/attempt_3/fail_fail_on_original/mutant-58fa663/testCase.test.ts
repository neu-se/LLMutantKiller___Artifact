import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit rejectionHandled when process is not a proper object", () => {
    const originalProcess = global.process;
    const mockProcess = {
      emit: jest.fn()
    };

    // Mock process to have emit but not be a proper object
    global.process = mockProcess as any;

    // Create a rejected promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test"));

    // Manually add to tracking (since process.nextTick isn't available)
    const unhandledRejections = (Q as any).getUnhandledRejections();
    unhandledRejections.push(promise);

    // Now try to untrack it
    (Q as any).untrackRejection(promise);

    // In original code: won't emit because (typeof process === "object" && typeof process.emit === "function") is false
    // In mutated code: will emit because (typeof process === "object" || typeof process.emit === "function") is true
    expect(mockProcess.emit).not.toHaveBeenCalled();

    global.process = originalProcess;
  });
});