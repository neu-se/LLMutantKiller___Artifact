import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not call process.emit when process is not a proper object", () => {
    const originalProcess = global.process;
    const emitSpy = jest.fn();

    // Create a mock process that has emit but isn't a proper process object
    const mockProcess = {
      emit: emitSpy
    };

    global.process = mockProcess as any;

    // Create a deferred and reject it
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Manually add to tracking arrays to simulate tracking
    const unhandledRejections = (Q as any)._unhandledRejections || [];
    unhandledRejections.push(promise);

    // Now try to untrack it
    (Q as any).untrackRejection(promise);

    // In original code: emit won't be called because (typeof process === "object" && typeof process.emit === "function") is false
    // In mutated code: emit would be called because (typeof process === "object" || typeof process.emit === "function") is true
    expect(emitSpy).not.toHaveBeenCalled();

    global.process = originalProcess;
  });
});