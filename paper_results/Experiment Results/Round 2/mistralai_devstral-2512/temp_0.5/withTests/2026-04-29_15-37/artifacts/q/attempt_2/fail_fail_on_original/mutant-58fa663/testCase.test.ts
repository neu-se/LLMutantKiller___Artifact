import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should correctly handle untracking when process is not an object but has emit function", () => {
    const originalProcess = global.process;
    const mockProcess = {
      emit: jest.fn()
    };

    global.process = mockProcess as any;

    // Create a rejected promise to track
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test"));

    // Get the index of the promise in the tracking array
    const unhandledRejections = (Q as any).getUnhandledRejections();
    const at = unhandledRejections.indexOf(promise);

    // Now untrack it - this should not emit rejectionHandled
    // because process is not a proper object (just has emit function)
    (Q as any).untrackRejection(promise);

    // In the original code, this won't emit because both conditions must be true (AND)
    // In the mutated code, this will incorrectly emit because only one condition needs to be true (OR)
    expect(mockProcess.emit).not.toHaveBeenCalled();

    global.process = originalProcess;
  });
});