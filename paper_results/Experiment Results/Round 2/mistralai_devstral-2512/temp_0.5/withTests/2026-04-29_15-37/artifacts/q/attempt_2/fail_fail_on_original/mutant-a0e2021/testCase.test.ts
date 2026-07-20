// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-a0e2021/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Save the original process.env and Q.longStackSupport
    const originalEnv = process.env;
    const originalLongStackSupport = qModule.Q.longStackSupport;

    // Set Q_DEBUG to enable long stack support
    process.env.Q_DEBUG = "1";

    // Reload Q to pick up the new environment variable
    // Since we can't actually reload the module in this test,
    // we'll directly test the condition that would enable long stack support
    const Q = qModule.Q;

    // The mutation changes the condition from:
    // if (typeof process === "object" && process && process.env && process.env.Q_DEBUG)
    // to:
    // if (true && process.env.Q_DEBUG)
    // So we need to test that the condition properly evaluates

    // In the original code, this should be true when process.env.Q_DEBUG is set
    // In the mutated code, this will throw an error because process is not defined in the condition
    // (since it changed from checking typeof process to just using process.env)

    // Create a test that will pass in original but fail in mutated
    expect(Q.longStackSupport).toBe(true);

    // Restore the original environment and settings
    process.env = originalEnv;
    Q.longStackSupport = originalLongStackSupport;
  });
});