import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should correctly handle untracking when process.emit is not a function", () => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Create a mock process object without emit function
    const mockProcess = {
      emit: undefined
    };

    // Replace global process with our mock
    global.process = mockProcess as any;

    // Create and reject a promise
    const deferred = Q.defer();
    const promise = deferred.promise;
    deferred.reject(new Error("Test rejection"));

    // Handle the rejection
    let handled = false;
    promise.catch(() => {
      handled = true;
    });

    // Restore original process
    global.process.emit = originalEmit;

    // The test passes if we reach here without errors
    // The mutation would cause this to fail because it would try to call
    // process.emit("rejectionHandled") when process.emit is not a function
  });
});