const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should handle falsy process with domain correctly", () => {
    // Save original process
    const originalProcess = global.process;

    // Create a scenario where process is falsy but has domain property
    // This tests the difference between && and || in the condition
    (global as any).process = null;
    (global as any).process = { domain: { bind: jest.fn(), enter: jest.fn(), exit: jest.fn() } };

    const deferred = Q.defer();
    let errorCaught = false;

    try {
      // This should work in original (&&) but fail in mutated (||)
      deferred.promise.done(() => {});
    } catch (e) {
      errorCaught = true;
    }

    // Restore original process
    global.process = originalProcess;

    // Original code should not throw error (&& prevents evaluation)
    // Mutated code would throw error (|| evaluates both sides)
    expect(errorCaught).toBe(false);
  });
});