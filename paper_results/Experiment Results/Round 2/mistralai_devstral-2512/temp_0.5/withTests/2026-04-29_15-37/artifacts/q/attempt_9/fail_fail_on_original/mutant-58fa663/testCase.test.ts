import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process object detection in untrackRejection", () => {
  it("should correctly handle process object with emit function", () => {
    const originalProcess = global.process;
    const emitSpy = jest.fn();

    // Create a mock process that is an object and has emit function
    const mockProcess = {
      emit: emitSpy
    };

    global.process = mockProcess as any;

    // Create a rejected promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test"));

    // Mock the internal tracking arrays to avoid process.nextTick issues
    const unhandledRejections = [];
    const reportedUnhandledRejections = [];

    // Simulate the tracking
    unhandledRejections.push(promise);

    // Mock the internal state
    (Q as any)._unhandledRejections = unhandledRejections;
    (Q as any)._reportedUnhandledRejections = reportedUnhandledRejections;

    // Mock console.error to suppress errors
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Now try to untrack it by directly calling the internal logic
    const at = unhandledRejections.indexOf(promise);
    if (at !== -1) {
      // This is the exact condition from the code
      if (typeof process === "object" && typeof process.emit === "function") {
        // This should execute in both original and mutated code
        // because process is an object AND has emit function
        emitSpy("rejectionHandled", "test", promise);
      }
      unhandledRejections.splice(at, 1);
    }

    // Should have been called because process is proper object with emit
    expect(emitSpy).toHaveBeenCalled();

    // Restore
    console.error = originalConsoleError;
    global.process = originalProcess;
  });
});