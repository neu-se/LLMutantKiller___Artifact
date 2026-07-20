const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q rejection tracking behavior", () => {
  it("should demonstrate different behavior between original and mutated code", () => {
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

    // Track emissions
    const emissions: string[] = [];
    mockProcess.emit.mockImplementation((event: string) => {
      emissions.push(event);
    });

    // Create and handle multiple rejected promises
    const promises = [
      Q.reject(new Error("test1")),
      Q.reject(new Error("test2")),
      Q.reject(new Error("test3"))
    ];

    // Handle all promises
    promises.forEach(p => p.catch(() => {}));

    // Force async operations
    mockProcess.nextTick.mock.calls.forEach(call => call[0]());

    // The key difference: in original code, we expect rejectionHandled events
    // In mutated code, we expect NO rejectionHandled events due to inverted condition
    // This test will pass on original and fail on mutated
    const hasRejectionHandled = emissions.includes("rejectionHandled");
    expect(hasRejectionHandled).toBe(true);

    // Clean up
    delete (global as any).process;
  });
});