// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_4/pending_category/mutant-a0e2021/testCase.test.ts
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

    // Test that Q.longStackSupport is properly set when Q_DEBUG is present
    // This will pass in original code but fail in mutated code when process is undefined
    expect(qModule.Q.longStackSupport).toBe(true);

    // Restore
    process.env = originalEnv;
  });
});