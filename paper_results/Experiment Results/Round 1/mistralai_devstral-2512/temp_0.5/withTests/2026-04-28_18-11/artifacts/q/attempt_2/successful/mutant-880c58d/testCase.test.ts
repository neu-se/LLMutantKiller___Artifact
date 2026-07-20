import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should not enable long stack support when Q_DEBUG is not set", () => {
    // Save the original value
    const originalEnv = process.env.Q_DEBUG;
    // Ensure Q_DEBUG is not set
    delete process.env.Q_DEBUG;

    // Reset Q to pick up the new environment variable
    // We need to re-import Q to ensure the module is re-evaluated with the new env
    // Since we can't actually re-import in this context, we'll test the behavior indirectly
    // by checking if longStackSupport is enabled when Q_DEBUG is not set
    const qDebugEnabled = Q.longStackSupport;

    // Restore original environment
    if (originalEnv !== undefined) {
      process.env.Q_DEBUG = originalEnv;
    }

    // The test should pass if longStackSupport is false when Q_DEBUG is not set
    // In the original code, this would be false (since Q_DEBUG check is proper)
    // In the mutated code, this would be true (since condition is always true)
    expect(qDebugEnabled).toBe(false);
  });
});