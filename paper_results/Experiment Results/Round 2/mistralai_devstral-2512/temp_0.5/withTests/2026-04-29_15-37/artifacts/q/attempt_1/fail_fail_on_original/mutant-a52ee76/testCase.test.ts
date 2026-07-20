// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-a52ee76/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    // Set Q_DEBUG environment variable before importing Q
    process.env.Q_DEBUG = "1";
    // Force re-import to pick up the environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    // Create a promise chain to test long stack traces
    const promise = Q().then(() => {
      return Q.Promise((resolve) => {
        setTimeout(() => {
          throw new Error("Test error");
        }, 0);
      });
    });

    return promise.catch((error) => {
      // Check if long stack support was enabled
      expect(Q.longStackSupport).toBe(true);
      // Verify the error has a stack trace
      expect(error.stack).toBeDefined();
    });
  });
});