const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
  it("should properly handle rejection tracking with process.emit available", (done) => {
    // Create a complete mock process object
    const mockProcess = {
      emit: jest.fn(),
      on: jest.fn(),
      nextTick: jest.fn((callback) => setTimeout(callback, 0)),
      domain: undefined,
      env: {},
      toString: () => "[object process]"
    };

    // Mock global process object
    (global as any).process = mockProcess;

    // Track emission calls
    const emissions: string[] = [];
    mockProcess.emit.mockImplementation((event: string) => {
      emissions.push(event);
    });

    // Create and handle a rejected promise
    const rejectedPromise = Q.reject(new Error("test error"));

    // Handle the rejection after a short delay
    setTimeout(() => {
      rejectedPromise.catch(() => {
        // Check if rejectionHandled was emitted
        const hasRejectionHandled = emissions.includes("rejectionHandled");

        // In original code, this should be true (process.emit exists)
        // In mutated code, this will be false (condition is inverted)
        expect(hasRejectionHandled).toBe(true);

        // Clean up
        delete (global as any).process;
        done();
      });
    }, 100);
  });
});