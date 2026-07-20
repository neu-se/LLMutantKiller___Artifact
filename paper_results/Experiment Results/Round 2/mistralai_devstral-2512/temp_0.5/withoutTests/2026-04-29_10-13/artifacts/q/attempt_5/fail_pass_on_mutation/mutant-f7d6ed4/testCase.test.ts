const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done() with process.domain", () => {
  it("should correctly handle process.domain binding when available", (done) => {
    // Create a complete mock process object with domain
    const mockDomain = {
      bind: jest.fn((fn) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    const mockProcess = {
      nextTick: (fn: Function) => setTimeout(fn, 0),
      domain: mockDomain,
      toString: () => "[object process]"
    };

    // Temporarily replace global.process
    const originalProcess = global.process;
    global.process = mockProcess as any;

    try {
      const promise = Q.resolve("test");
      promise.done(() => {
        // Verify that domain.bind was called
        expect(mockDomain.bind).toHaveBeenCalled();
        done();
      });
    } catch (error) {
      done(error);
    } finally {
      // Restore original process
      global.process = originalProcess;
    }
  });
});