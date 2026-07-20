import * as QModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when process.emit exists", (done) => {
    // Create a mock process object with emit function
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn(),
      nextTick: jest.fn((callback) => setTimeout(callback, 0)),
      domain: null
    };

    // Store original process
    const originalProcess = global.process;

    // Set up mock process
    global.process = mockProcess as any;

    // Get Q from the module
    const Q = QModule;

    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the unhandled rejection tracking to occur
    setTimeout(() => {
      try {
        // Now handle the rejection
        rejectedPromise.catch(() => {
          // Wait for the rejectionHandled event to be emitted
          setTimeout(() => {
            try {
              // Check if emit was called with 'rejectionHandled'
              // This should happen in the original code but not in the mutated code
              // because the mutation changes the condition from `=== "function"` to `!== "function"`
              expect(mockProcess.emit).toHaveBeenCalledWith(
                'rejectionHandled',
                expect.any(String),
                rejectedPromise
              );

              // Restore original process
              global.process = originalProcess;
              done();
            } catch (error) {
              // Restore original process before failing
              global.process = originalProcess;
              done(error);
            }
          }, 200);
        });
      } catch (error) {
        // Restore original process before failing
        global.process = originalProcess;
        done(error);
      }
    }, 200);
  }, 1000);
});