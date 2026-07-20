// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-cf37cbd/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly handle promises with long stack traces containing multi-digit column numbers", () => {
    // Create a promise chain that will generate stack traces
    // The mutation affects stack trace parsing for lines with multi-digit column numbers
    const promise = Q.resolve()
      .then(() => {
        // This will create a stack frame with multi-digit column numbers
        throw new Error("Test error with multi-digit columns");
      })
      .catch((error) => {
        // The error should be properly handled
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe("Test error with multi-digit columns");
        // If the mutation is present, stack trace parsing might fail
        // for lines with multi-digit column numbers
        return "recovered";
      });

    return promise.then((result) => {
      expect(result).toBe("recovered");
    });
  });
});