import { Q } from "./q";

describe("Q debug mode", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save original process.env
    const originalEnv = process.env;

    try {
      // Set Q_DEBUG environment variable
      process.env.Q_DEBUG = "1";

      // Re-import Q to get fresh instance with new env
      delete require.cache[require.resolve("./q")];
      const QWithDebug = require("./q");

      // Create a promise chain that would benefit from long stacks
      const promise = QWithDebug.reject(new Error("test error"))
        .then(() => {
          throw new Error("should not reach here");
        })
        .catch((err) => {
          // In debug mode with long stack support, the error should have an enhanced stack
          // The mutant removes the assignment that enables longStackSupport
          if (QWithDebug.longStackSupport) {
            expect(err.stack).toContain("From previous event:");
          } else {
            // If long stack support is not enabled, we can't guarantee the stack format
            // but we can verify the basic error properties
            expect(err.message).toBe("test error");
          }
          throw err; // re-throw to test stack propagation
        });

      return promise.then(
        () => {
          // Should not reach here
          throw new Error("Promise should have rejected");
        },
        (err) => {
          // Verify the error made it through
          expect(err.message).toBe("test error");
          // In debug mode, long stack support should be enabled
          expect(QWithDebug.longStackSupport).toBe(true);
        }
      );
    } finally {
      // Restore original environment
      process.env = originalEnv;
    }
  });
});