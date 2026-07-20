import { Q } from "./q.js";

describe("Q.debug mode", () => {
  it("should not enable long stack traces when Q_DEBUG is not set", () => {
    // Ensure Q_DEBUG is not set
    const originalEnv = process.env.Q_DEBUG;
    delete process.env.Q_DEBUG;

    try {
      // Create a promise chain that would show long stacks if enabled
      const promise = Q.resolve(42)
        .then(() => {
          throw new Error("Test error");
        })
        .catch((e) => {
          // Check that the stack trace doesn't contain the long stack marker
          expect(e.stack).not.toContain("From previous event:");
          return e;
        });

      return promise;
    } finally {
      // Restore original environment
      if (originalEnv !== undefined) {
        process.env.Q_DEBUG = originalEnv;
      }
    }
  });
});