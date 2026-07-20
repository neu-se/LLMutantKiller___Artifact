import { describe, it, expect } from "@jest/globals";

describe("Q module loading with process.env safety", () => {
  it("should not throw when process.env is undefined during module load", () => {
    // Save original process.env
    const originalEnv = process.env;
    
    // Remove the module from cache so it gets re-evaluated
    const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    
    try {
      // Set process.env to undefined to expose the mutation
      // The original code checks: typeof process === "object" && process && process.env && process.env.Q_DEBUG
      // The mutated code checks: true && process.env.Q_DEBUG
      // With process.env = undefined, the mutated code throws TypeError, original safely short-circuits
      Object.defineProperty(process, "env", {
        value: undefined,
        configurable: true,
        writable: true,
      });
      
      // Remove cached module to force re-evaluation
      delete require.cache[modulePath];
      
      // This should not throw with the original code (process.env check guards it)
      // But WILL throw with the mutated code (tries to access undefined.Q_DEBUG)
      expect(() => {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      }).not.toThrow();
    } finally {
      // Restore process.env
      Object.defineProperty(process, "env", {
        value: originalEnv,
        configurable: true,
        writable: true,
      });
      
      // Restore the cached module
      delete require.cache[modulePath];
    }
  });
});