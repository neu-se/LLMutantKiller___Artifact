const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q rejection handling", () => {
  it("should properly handle rejection tracking when process.emit exists", () => {
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
    mockProcess.emit.mockImplementation((event: string) => {
      if (event === "rejectionHandled") {
        rejectionHandledCalled = true;
      }
    });

    // Create and handle a rejected promise
    const rejectedPromise = Q.reject(new Error("test"));
    rejectedPromise.catch(() => {});

    // Force the async operations to complete
    mockProcess.nextTick.mock.calls.forEach(call => call[0]());

    // In original code, this should be true (process.emit exists)
    // In mutated code, this will be false (condition is inverted)
    // The mutation changes the condition from `=== "function"` to `!== "function"`
    // which means the rejectionHandled event won't be emitted when process.emit exists
    expect(rejectionHandledCalled).toBe(true);

    // Clean up
    delete (global as any).process;
  });
});