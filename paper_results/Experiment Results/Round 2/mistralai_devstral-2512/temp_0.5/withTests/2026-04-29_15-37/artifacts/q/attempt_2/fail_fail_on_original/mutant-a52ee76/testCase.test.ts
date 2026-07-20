// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-a52ee76/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Store original value
    const originalLongStackSupport = Q.longStackSupport;

    // Set Q_DEBUG environment variable
    process.env.Q_DEBUG = "1";

    // Force re-import to pick up the environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Verify long stack support was enabled
    expect(Q.longStackSupport).toBe(true);

    // Restore original value
    Q.longStackSupport = originalLongStackSupport;
  });
});