const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly check process type before emitting unhandledRejection", (done) => {
    // Create a rejected promise that will NOT be handled
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Simulate a Node.js environment with process.emit
    const originalProcess = global.process;
    global.process = {
      emit: jest.fn(),
      env: {},
      nextTick: setImmediate
    } as any;

    try {
      // Set up listener for unhandledRejection
      const emitSpy = jest.spyOn(global.process, 'emit');

      // Reject the promise
      deferred.reject(new Error("Test error"));

      // Wait for the next tick to allow the unhandled rejection tracking to occur
      setTimeout(() => {
        try {
          // The unhandledRejection event should have been emitted
          expect(emitSpy).toHaveBeenCalledWith('unhandledRejection', expect.any(Error), promise);

          // Verify the process type check was correct
          expect(typeof global.process).toBe('object');

          // Clean up
          Q.stopUnhandledRejectionTracking();
          done();
        } catch (error) {
          done(error);
        } finally {
          // Restore original process
          global.process = originalProcess;
        }
      }, 10);
    } catch (error) {
      global.process = originalProcess;
      done(error);
    }
  });
});