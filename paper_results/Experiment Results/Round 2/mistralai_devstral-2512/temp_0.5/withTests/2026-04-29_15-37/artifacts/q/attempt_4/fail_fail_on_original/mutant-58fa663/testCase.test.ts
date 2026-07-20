import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should correctly handle process object detection in untrackRejection", () => {
    const originalProcess = global.process;

    // Create a mock process that is an object but doesn't have emit
    const mockProcessWithoutEmit = {};
    global.process = mockProcessWithoutEmit as any;

    // Create a rejected promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("test"));

    // Manually track the rejection since process.nextTick isn't available
    const unhandledRejections = (Q as any).getUnhandledRejections();
    unhandledRejections.push(promise);

    // Mock console.error to suppress error output
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Now try to untrack it
    (Q as any).untrackRejection(promise);

    // In original code: won't try to emit because process doesn't have emit function
    // In mutated code: would incorrectly try to call process.emit
    // This test verifies the original behavior works without errors
    expect(unhandledRejections.length).toBe(0);

    // Restore
    console.error = originalConsoleError;
    global.process = originalProcess;
  });
});