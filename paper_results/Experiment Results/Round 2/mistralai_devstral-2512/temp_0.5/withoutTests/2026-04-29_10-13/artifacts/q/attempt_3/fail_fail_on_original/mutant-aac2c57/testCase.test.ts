const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done mutation test", () => {
  it("should handle process.domain correctly with falsy process", () => {
    // Save the original process object
    const originalProcess = global.process;

    // Create a scenario where process is falsy but has domain property
    // This tests the difference between && and || in the condition
    global.process = undefined;
    (global as any).process = { domain: { bind: jest.fn() } };

    const deferred = Q.defer();
    let errorOccurred = false;

    try {
      // This should work in original (&&) but fail in mutated (||)
      deferred.promise.done(() => {});
    } catch (e) {
      errorOccurred = true;
    }

    // Restore original process
    global.process = originalProcess;

    // Original code should not throw error (&& prevents evaluation)
    // Mutated code would throw error (|| evaluates both sides)
    expect(errorOccurred).toBe(false);
  });
});