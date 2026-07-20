const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should emit rejectionHandled event when process.emit is available", (done) => {
    // Create a mock process object with emit function
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn(),
      nextTick: jest.fn((callback) => callback()),
      domain: undefined,
      env: {},
      toString: () => "[object process]"
    };

    // Mock global process object
    (global as any).process = mockProcess;

    // Track if rejectionHandled was called
    let rejectionHandledCalled = false;
    mockProcess.on.mockImplementation((event: string, listener: any) => {
      if (event === "unhandledRejection") {
        // Simulate the unhandled rejection being tracked
        listener(new Error("test"), Q.reject(new Error("test")));
      }
    });

    mockProcess.emit.mockImplementation((event: string) => {
      if (event === "rejectionHandled") {
        rejectionHandledCalled = true;
      }
    });

    // Create and handle a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    setTimeout(() => {
      rejectedPromise.catch(() => {
        // In original code, rejectionHandled should be called
        // In mutated code, it won't be called due to inverted condition
        expect(rejectionHandledCalled).toBe(true);
        done();
      });
    }, 50);
  });
});