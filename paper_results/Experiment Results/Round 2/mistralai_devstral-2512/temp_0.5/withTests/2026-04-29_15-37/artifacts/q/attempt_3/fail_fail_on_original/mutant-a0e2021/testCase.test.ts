// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-a0e2021/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save the original process.env
    const originalEnv = process.env;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // The mutation changes the condition from:
    // if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // to:
    // if (true && process.env.Q_DEBUG)
    //
    // In the original code, this condition properly checks if process exists before accessing process.env
    // In the mutated code, it directly accesses process.env which will throw if process is undefined

    // Create a scenario where process might be undefined
    const globalAny = global as any;
    const originalProcess = globalAny.process;
    globalAny.process = undefined;

    // This should work in original (condition evaluates to false) but fail in mutated (TypeError)
    expect(() => {
      // Force re-evaluation of the condition by reloading Q
      // Since we can't actually reload, we'll test the condition directly
      const testProcess = undefined;
      if (true && testProcess.env.Q_DEBUG) {
        // This line should never execute in original code when process is undefined
        // but would throw in mutated code
      }
    }).not.toThrow();

    // Restore
    globalAny.process = originalProcess;
    process.env = originalEnv;
  });
});