import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q unhandled rejection tracking", () => {
  it("should track unhandled rejections when process.emit is a function", (done) => {
    // Create a mock process object with emit as a function
    const mockProcess = {
      emit: jest.fn(),
      domain: undefined
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    global.process = mockProcess as any;

    // Reset unhandled rejection tracking
    Q.resetUnhandledRejections();

    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("Test rejection"));

    // Wait for the next tick to allow the rejection tracking to occur
    setTimeout(() => {
      // Verify that process.emit was called with "unhandledRejection"
      expect(mockProcess.emit).toHaveBeenCalledWith("unhandledRejection", expect.any(Error), rejectedPromise);

      // Restore original process
      global.process = originalProcess;

      done();
    }, 10);
  });
});