const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should handle process.domain binding correctly", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a mock process with domain
    const mockDomain = { bind: jest.fn((fn) => fn) };
    (global as any).process = { domain: mockDomain, nextTick: setImmediate };

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Trigger the done method which contains the mutated code
    promise.done(() => {});

    // In original code (&&), domain.bind should be called
    // In mutated code (||), domain.bind would also be called
    // The key difference is when process is falsy but has domain
    expect(mockDomain.bind).toHaveBeenCalled();

    // Restore original process
    global.process = originalProcess;
  });
});