import { Q } from "./q";

describe("Q.done() with process.domain", () => {
  it("should correctly handle process.domain binding when available", (done) => {
    // Create a mock process object with domain support
    const mockProcess = {
      domain: {
        bind: jest.fn((fn) => fn)
      }
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    global.process = mockProcess;

    try {
      const promise = Q.resolve("test");
      promise.done(() => {
        // Verify that domain.bind was called
        expect(mockProcess.domain.bind).toHaveBeenCalled();
        done();
      });
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});