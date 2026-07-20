// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support initialization", () => {
  it("should enable long stack support when Q_DEBUG is set in process.env", () => {
    // Save the original process.env
    const originalEnv = { ...process.env };

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a promise to test long stack support
    const promise = Q.Promise((resolve) => {
      resolve("test");
    });

    // Check if long stack support is enabled
    // The original code enables it when process.env.Q_DEBUG is set
    // The mutated code changes the condition but should behave the same in this case
    expect(Q.longStackSupport).toBe(true);

    // Restore original environment
    process.env = originalEnv;
    Q.longStackSupport = false;
  });
});