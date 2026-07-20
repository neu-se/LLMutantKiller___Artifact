const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly handle process.domain binding when available", (done) => {
    // Create a more complete mock process object
    const mockProcess = {
      nextTick: (fn) => setTimeout(fn, 0),
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