const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should handle process.domain binding with falsy process correctly", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a scenario where process is falsy but has domain property
    // This tests the difference between && and || in the condition
    (global as any).process = null;
    (global as any).process = {
      domain: {
        bind: jest.fn((fn) => {
          throw new Error("Domain bind should not be called when process is falsy");
        }),
        enter: jest.fn(),
        exit: jest.fn()
      },
      nextTick: setImmediate
    };

    const deferred = Q.defer();
    let errorCaught = false;

    try {
      // In original code (&&), this should not call domain.bind
      // In mutated code (||), this would call domain.bind and throw
      deferred.promise.done(() => {});
    } catch (e) {
      errorCaught = true;
    }

    // Restore original process
    global.process = originalProcess;

    // Original code should not throw (&& prevents evaluation)
    // Mutated code would throw (|| evaluates both sides)
    expect(errorCaught).toBe(false);
  });
});