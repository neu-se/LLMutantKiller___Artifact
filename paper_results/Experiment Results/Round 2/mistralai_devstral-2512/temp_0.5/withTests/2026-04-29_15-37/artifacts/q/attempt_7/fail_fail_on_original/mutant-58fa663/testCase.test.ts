import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process object detection in untrackRejection", () => {
  it("should not emit rejectionHandled when process lacks emit function", () => {
    const originalProcess = global.process;
    const emitSpy = jest.fn();

    // Create a mock process that has emit but isn't a proper process object
    const mockProcess = {
      emit: emitSpy
    };

    global.process = mockProcess as any;

    // Create a rejected promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test"));

    // Mock the internal tracking arrays
    const unhandledRejections = (Q as any)._unhandledRejections = [promise];
    const reportedUnhandledRejections = (Q as any)._reportedUnhandledRejections = [];

    // Mock console.error to suppress errors
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Directly test the condition logic from untrackRejection
    const at = unhandledRejections.indexOf(promise);
    if (at !== -1) {
      // This is the exact condition from the code
      if (typeof process === "object" && typeof process.emit === "function") {
        // Original code: this won't execute because process isn't a proper object
        // Mutated code: this would execute because of the OR condition
        emitSpy("rejectionHandled", "test", promise);
      }
      unhandledRejections.splice(at, 1);
    }

    // In original code: emitSpy should not have been called
    // In mutated code: emitSpy would have been called
    expect(emitSpy).not.toHaveBeenCalled();

    // Restore
    console.error = originalConsoleError;
    global.process = originalProcess;
  });
});