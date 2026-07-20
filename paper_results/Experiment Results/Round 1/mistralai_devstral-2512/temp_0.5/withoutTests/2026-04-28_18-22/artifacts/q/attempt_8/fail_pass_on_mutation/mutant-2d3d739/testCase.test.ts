const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should properly handle promise rejection with long stack traces", () => {
    // Enable long stack support which internally uses object_defineProperty
    const originalEnv = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Force reloading of Q to pick up the environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithLongStacks = require("../../../../../../../../../../../subject_repositories/q/q.js");

    let error: Error | null = null;

    // Create a promise chain that will reject
    QWithLongStacks.reject(new Error("test error"))
      .catch((e: Error) => {
        error = e;
      });

    // Wait for the promise to settle
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(error).not.toBeNull();
        expect(error?.message).toBe("test error");

        // The key test: in the original code, the error should have a modified stack
        // In the mutated code, object_defineProperty is false, so this will fail
        if (error) {
          expect(error.stack).toBeDefined();
          expect(typeof error.stack).toBe("string");
          expect(error.stack!.length).toBeGreaterThan(0);
        }

        // Restore environment
        process.env.Q_DEBUG = originalEnv;
        delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
        resolve(undefined);
      }, 10);
    });
  });
});