// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_5/pending_category/mutant-a52ee76/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Clear the module from cache to ensure fresh load
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

    // Set Q_DEBUG before requiring Q
    process.env.Q_DEBUG = "1";
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // The original code should set Q.longStackSupport to true when Q_DEBUG is set
    // The mutated code has an empty if block, so it won't set this
    expect(Q.longStackSupport).toBe(true);
  });
});