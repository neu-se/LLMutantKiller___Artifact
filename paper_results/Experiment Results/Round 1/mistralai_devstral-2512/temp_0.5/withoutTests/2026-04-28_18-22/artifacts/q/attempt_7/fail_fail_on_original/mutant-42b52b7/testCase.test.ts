const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly track rejection handling when process.emit exists", () => {
    // Create a complete mock process object
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

    // Track emission calls
    let rejectionHandledCalled = false;
    mockProcess.emit.mockImplementation((event: string) => {
      if (event === "rejectionHandled") {
        rejectionHandledCalled = true;
      }
    });

    // Create and immediately handle a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));
    rejectedPromise.catch(() => {
      // This callback will be called when the promise is handled
    });

    // Force the async operations to complete
    mockProcess.nextTick.mock.calls.forEach(call => call[0]());

    // In original code, rejectionHandled should be called (process.emit exists)
    // In mutated code, it won't be called (condition is inverted)
    expect(rejectionHandledCalled).toBe(true);

    // Clean up
    delete (global as any).process;
  });
});