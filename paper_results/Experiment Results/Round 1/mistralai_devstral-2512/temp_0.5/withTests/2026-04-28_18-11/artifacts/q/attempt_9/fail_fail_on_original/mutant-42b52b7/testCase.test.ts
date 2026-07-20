import * as QModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should track and untrack rejections properly when process.emit exists", (done) => {
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

    // Create a rejected promise with an error that has a stack
    const error = new Error("Test rejection");
    error.stack = "Error: Test rejection\n    at test\n    at test";
    const rejectedPromise = Q.reject(error);

    // Wait for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Now handle the rejection
      rejectedPromise.catch(() => {
        // Wait for the rejectionHandled event to be emitted
        setTimeout(() => {
          try {
            // Check if emit was called with 'unhandledRejection' first
            const unhandledCalls = mockProcess.emit.mock.calls.filter(call => call[0] === 'unhandledRejection');
            expect(unhandledCalls.length).toBeGreaterThan(0);

            // Check if emit was called with 'rejectionHandled' after handling
            const handledCalls = mockProcess.emit.mock.calls.filter(call => call[0] === 'rejectionHandled');
            expect(handledCalls.length).toBeGreaterThan(0);

            // The key difference: in the original code, the second parameter of rejectionHandled
            // should be the error stack (string), but in the mutated code it will be undefined
            // because the condition is inverted
            const rejectionHandledCall = handledCalls[0];
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