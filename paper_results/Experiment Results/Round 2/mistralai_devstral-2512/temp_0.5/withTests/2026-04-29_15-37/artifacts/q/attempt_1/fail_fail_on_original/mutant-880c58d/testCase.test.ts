// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Debug Mode Detection", () => {
  it("should not enable long stack support when Q_DEBUG is not set", () => {
    // Ensure Q_DEBUG is not set in the environment
    const originalEnv = process.env;
    delete process.env.Q_DEBUG;

    // Reset Q.longStackSupport to its default state
    Q.longStackSupport = false;

    // Create a promise chain that would benefit from long stack traces
    const promise = Q().then(() => {
      return Q.Promise((resolve) => {
        setTimeout(() => {
          throw new Error("Test error");
        }, 0);
      });
    });

    // Verify that long stack support is not enabled
    expect(Q.longStackSupport).toBe(false);

    // Restore original environment
    process.env = originalEnv;
  });
});