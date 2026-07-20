describe("Q module loading safety checks", () => {
  it("should not throw when process.env is undefined during module initialization", () => {
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const originalEnv = process.env;

    try {
      // Remove process.env to expose the missing guard in the mutated code.
      // Original: typeof process === "object" && process && process.env && process.env.Q_DEBUG
      //   -> safely short-circuits when process.env is falsy
      // Mutated: true && process.env.Q_DEBUG
      //   -> throws TypeError: Cannot read properties of undefined (reading 'Q_DEBUG')
      Object.defineProperty(process, "env", {
        value: undefined,
        configurable: true,
        writable: true,
      });

      // Force re-evaluation of the module
      delete require.cache[modulePath];

      expect(() => {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      }).not.toThrow();
    } finally {
      Object.defineProperty(process, "env", {
        value: originalEnv,
        configurable: true,
        writable: true,
      });
      delete require.cache[modulePath];
    }
  });
});