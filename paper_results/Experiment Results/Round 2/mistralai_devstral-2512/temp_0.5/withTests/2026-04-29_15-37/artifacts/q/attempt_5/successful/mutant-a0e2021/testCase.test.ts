// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-a0e2021/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should handle missing process.env gracefully", () => {
    // Save the original process.env
    const originalEnv = process.env;
    const originalProcess = global.process;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Create a scenario where process might be undefined
    (global as any).process = undefined;

    // The mutation changes the condition from:
    // if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // to:
    // if (true && process.env.Q_DEBUG)
    //
    // In the original code, this condition properly checks if process exists before accessing process.env
    // In the mutated code, it directly accesses process.env which will throw if process is undefined

    // This test should pass in original code (condition evaluates to false safely)
    // but fail in mutated code (TypeError when accessing undefined.env)
    expect(() => {
      // Force evaluation of the condition by requiring Q
      // In original: condition is false (process is undefined), no error
      // In mutated: tries to access undefined.env.Q_DEBUG, throws TypeError
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    }).not.toThrow();

    // Restore
    (global as any).process = originalProcess;
    process.env = originalEnv;
  });
});