import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit unhandledRejection event when process.emit exists", (done) => {
    // Create a mock process object with emit function
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn()
    };

    // Store original process
    const originalProcess = global.process;

    // Set up mock process
    global.process = mockProcess as any;

    // Create a rejected promise that will not be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait a bit for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Check if emit was called with 'unhandledRejection'
      expect(mockProcess.emit).toHaveBeenCalledWith(
        'unhandledRejection',
        expect.any(Error),
        rejectedPromise
      );

      // Restore original process
      global.process = originalProcess;

      // Handle the rejection to clean up
      rejectedPromise.catch(() => {});

      done();
    }, 100);
  });
});