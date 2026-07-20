const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q rejection tracking", () => {
  it("should call untrackRejection when process.emit is available", () => {
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

    // Spy on the untrackRejection function
    const untrackRejection = require("../../../../../../../../../../../subject_repositories/q/q.js").untrackRejection;
    const untrackSpy = jest.spyOn(require("../../../../../../../../../../../subject_repositories/q/q.js"), 'untrackRejection');

    // Create and handle a rejected promise
    const rejectedPromise = Q.reject(new Error("test"));
    rejectedPromise.catch(() => {});

    // Force any pending operations
    mockProcess.nextTick.mock.calls.forEach(call => call[0]());

    // In original code, untrackRejection should be called
    // In mutated code, it won't be called due to inverted condition
    expect(untrackSpy).toHaveBeenCalled();

    // Clean up
    untrackSpy.mockRestore();
    delete (global as any).process;
  });
});