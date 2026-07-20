import * as QModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit rejectionHandled event with correct parameters when process.emit exists", (done) => {
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
      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for the rejectionHandled event to be emitted
        setTimeout(() => {
          try {
            // Check if emit was called with 'rejectionHandled'
            // The second parameter should be the error stack (string), not undefined
            const calls = mockProcess.emit.mock.calls;
            const rejectionHandledCall = calls.find(call => call[0] === 'rejectionHandled');

            expect(rejectionHandledCall).toBeDefined();
            expect(rejectionHandledCall[1]).toBeDefined();
            expect(typeof rejectionHandledCall[1]).toBe('string');
            expect(rejectionHandledCall[2]).toBe(rejectedPromise);

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
    }, 200);
  }, 1000);
});