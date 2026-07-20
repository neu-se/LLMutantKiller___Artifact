// <Jest test file containing exactly one test case>
import { describe, it, expect } from "@jest/globals";

describe("Q longStackSupport initialization", () => {
  it("should not throw when process is temporarily replaced with a non-object before module load", () => {
    // The mutation changes `typeof process === "object" && process && process.env && process.env.Q_DEBUG`
    // to `true && process.env && process.env.Q_DEBUG`
    // If process were not an object, the original would safely skip, but the mutation would throw.
    // We test this by temporarily replacing process with a non-object value.
    const originalProcess = global.process;
    
    try {
      // Replace process with a non-object to expose the mutation
      (global as any).process = null;
      
      // Clear the module cache so q.js re-evaluates
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
      
      // The original code: typeof process === "object" && process && process.env && process.env.Q_DEBUG
      // With process = null: typeof null === "object" is true, but null is falsy, so it short-circuits safely
      // The mutation: true && process.env && process.env.Q_DEBUG
      // With process = null: true && null.env => TypeError!
      
      let threwError = false;
      try {
        require("../../../../../../../../../../../subject_repositories/q/q.js");
      } catch (e) {
        threwError = true;
      }
      
      // Original code should NOT throw; mutated code WILL throw
      expect(threwError).toBe(false);
    } finally {
      global.process = originalProcess;
      // Restore module cache
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    }
  });
});