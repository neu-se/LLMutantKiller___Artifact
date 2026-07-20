import * as QModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit rejectionHandled event with error stack when process.emit exists", (done) => {
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
            // Check all emit calls
            const allCalls = mockProcess.emit.mock.calls;
            let foundRejectionHandled = false;

            for (const call of allCalls) {
              if (call[0] === 'rejectionHandled') {
                foundRejectionHandled = true;
                // The second parameter should be the error stack (string)
                expect(call[1]).toBe(error.stack);
                expect(call[2]).toBe(rejectedPromise);
                break;
              }
            }

            expect(foundRejectionHandled).toBe(true);

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