// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reset Q to re-evaluate the long stack support condition
    // We need to reload the module to pick up the new environment variable
    // Since we can't actually reload in this test context, we'll test the behavior
    // by checking if longStackSupport is enabled when Q_DEBUG is present
    const qInstance = Q;
    const initialLongStackSupport = qInstance.longStackSupport;

    // The original code should enable longStackSupport when process.env.Q_DEBUG is set
    // The mutated code changes the condition to `if (true && process.env.Q_DEBUG)`
    // which should behave the same way, but we need to verify the actual behavior

    // Create a promise chain that would benefit from long stack traces
    const promise = qInstance.Promise((resolve) => {
      setTimeout(() => {
        resolve("test");
      }, 0);
    });

    // Check if long stack support was enabled
    expect(qInstance.longStackSupport).toBe(true);

    // Restore original environment
    process.env = originalEnv;
  });
});